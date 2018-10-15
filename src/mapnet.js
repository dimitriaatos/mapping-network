import Matrix from './matrix.js'
import shortIndex from './short-index.js'
import './array-methods-polyfill.js'

/* GLOBAL VARIABLES*/

let settings = {
  slider: {
    sliderWidth: 20,
    textWidth: 13,
    color: [0.1, 0.5, 0.5, 1],
  },
  receive_distance: 30,
  hovColor: [0.346048, 0.962593, 0.976871, 0.4091],
  receiveName: 'mapnetcommunication'
}

let state = {
  width: box.rect[2] - box.rect[0],
  height: box.rect[3] - box.rect[1],
  mapping_objects: [],
  currentcolumn: [],
  isover: -1, //clicked settings.slider index
  mapmode: false, //mapmode on/off
  lastCC: -1, //last recieved controlles message index
  ginterface: true,
  shortParam: new shortIndex(),
  shortCC: new shortIndex(),
  mappableObj: new Array(), // all mappable objects in the patch
  paramObjList: new Array(), //mapped parameter objects
  weightingsMatrix: new Matrix(),
  valuesMatrix: new Matrix(),
  namelist: new Array(),
  changeCC: new Boolean(),
  prevCC: -1
}

/* INIT*/
mgraphics.init()
mgraphics.relative_coords = 0
mgraphics.autofill = 0
//init settings.slider
settings.slider.width = settings.slider.sliderWidth + settings.slider.textWidth


//get mappable objects
scan = function() {
  //clear mappableObj list
  state.mappableObj = new Array()
  const objCondition = obj => obj.varname != '' && obj.understands('rawfloat') && obj.patcher.box != this.patcher.box
  this.patcher.applydeep(obj => {if (objCondition(obj)) state.mappableObj.push(obj)})
}

//controller in message (CC, Value)
msg_int = (cc, value) => {

  state.lastCC = cc

  //detect cc change
  state.changeCC = cc != state.prevCC
  state.prevCC = cc
  let sCC
  if (state.changeCC) {
    sCC = state.shortCC.getShort(cc)
    if (sCC > -1) state.currentcolumn = state.weightingsMatrix.getColumn(sCC)
    if (state.ginterface && sCC > -1) {
      mgraphics.redraw()
    }
    //if mapping is on and a new CC comes in, check if it is an new or en existing
    if (state.mapmode) {
      //if new
      if (sCC < 0) {
        let newsCC = state.shortCC.add(cc)
        state.weightingsMatrix.insertColumn(newsCC)
        state.valuesMatrix.insertColumn(newsCC)
        state.currentcolumn = state.weightingsMatrix.getColumn(newsCC)
        mgraphics.redraw()
      }
    }
  }
  //play mode
  if (!state.mapmode && sCC > -1) {
    state.prevCC = -1 //make state.prevCC = -1 (none) to make sure state.changeCC is going to be 1 on mapmode
    let scalecolumn = new Array()
    if (state.weightingsMatrix.matrix[sCC] != null) {
      //scale weights of one CC
      state.currentcolumn.forEach(column => {
        scalecolumn.push(column * value)
      })
      //set it on the corresponding position on the valuesMatrix
      state.valuesMatrix.setColumn(sCC, scalecolumn)
      state.currentcolumn.forEach((column, i) => {
        if (column != 0.) {
          let p = 0
          let w = 0
          state.shortCC.inArray.forEach((ar, j) => {
            p += state.valuesMatrix.matrix[j][i]
            w += state.weightingsMatrix.matrix[j][i]
          })
          state.paramObjList[i].message('rawfloat', p / w)
        }
      })
    }
  }
}

ui = on => state.ginterface = on != 0 ? false : true

param = function(on, index) {
  if (on) {
    let sindex = state.shortParam.add(index)
    state.paramObjList.splice(sindex, 0, state.mappableObj[index])
    state.namelist.splice(sindex, 0, state.mappableObj[index].varname)
    state.weightingsMatrix.insertRow(sindex)
    state.valuesMatrix.insertRow(sindex)
  } else {
    let sindex = state.shortParam.delete(index)
    state.paramObjList.splice(sindex, 1)
    state.namelist.splice(sindex, 1)
    state.weightingsMatrix.deleteRow(sindex)
    state.valuesMatrix.deleteRow(sindex)
  }
  //msg_int(lastCC)
  setsize()
  mgraphics.redraw()
}

function setsize() {
  box.size(state.paramObjList.length * settings.slider.width, box.rect[3] - box.rect[1])
}

paint = function paint() {
  if (state.ginterface) {
    let startpoint
    mgraphics.set_line_width(3)
    // drawsliders
    if (state.currentcolumn.length > 0) {
      state.currentcolumn.forEach((column, i) => {
        mgraphics.set_source_rgba(...settings.slider.color)
        //sliders
        mgraphics.rectangle_rounded(settings.slider.width * i + settings.slider.textWidth, (1 - column) * state.height, settings.slider.sliderWidth, state.height, 0, 0, 0, 0)
        //text
        startpoint = settings.slider.width * i + 3
        mgraphics.fill()
        mgraphics.set_source_rgba(0., 0., 0., 0.5)
        mgraphics.identity_matrix
        mgraphics.move_to(startpoint, state.height / 10.)
        mgraphics.rotate(1.570796)
        mgraphics.show_text(state.namelist[i])
        mgraphics.identity_matrix()
      })
    }
  }
}

mapping = function mapping(st) {
  state.mapmode = st != 0
  if (state.mapmode) {
    state.prevCC = -1
    //receive
    let receive = this.patcher.newdefault(this.box.rect[0], this.box.rect[1] - settings.receive_distance, 'receive', settings.receiveName)
    state.mapping_objects.push(receive)
    this.patcher.connect(receive, 0, this.box, 0)

    //map buttons and sends
    state.mappableObj.forEach((obj, i) => {

      let r = obj.rect
      let x, y, w, h
      x = r[0]
      y = r[1]
      w = r[2] - r[0]
      h = r[3] - r[1]

      //objects (ubtn, on, off, snd)
      //ubutton
      let ubtn = obj.patcher.newdefault(x, y, 'ubutton',
        '@patching_rect', x, y, w, h,
        '@presentation_rect', x, y, w, h,
        '@orderfront', 1,
        '@toggle', 1,
        '@presentation', 1,
        '@ignoreclick', 0)
      if (state.shortParam.getShort(i) > -1) {
        ubtn.message('set', 1)
      }

      //messages
      let on = obj.patcher.newdefault(x + 20, y + 50, 'message')
      let off = obj.patcher.newdefault(x, y + 50, 'message')
      on.message('set', 'param', 1, i)
      off.message('set', 'param', 0, i)
      //send
      let snd = obj.patcher.newdefault(x, y + 100, 'send', settings.receiveName)
      //collect all objects in an Array
      state.mapping_objects.push(ubtn, on, off, snd)
      //connections
      obj.patcher.connect(ubtn, 1, on, 0)
      obj.patcher.connect(ubtn, 0, off, 0)
      obj.patcher.connect(on, 0, snd, 0)
      obj.patcher.connect(off, 0, snd, 0)

    })
  } else {
    //delete mapping objects
    state.mapping_objects.forEach(mapping => {
      mapping.patcher.remove(mapping)
    })
    state.prevCC = -1
    /*/delete empty columns
    for(i=0i<state.weightingsMatrix.matrix.lengthi++){
        let c = 0
        let cAr = state.weightingsMatrix.getColumn(i)
        for(j=0j<cAr.lengthj++){c += cAr[j]}
        if(c==0){
            state.weightingsMatrix.deleteColumn(i)
            state.valuesMatrix.deletecolumn(i)
        }
    }*/
    state.mapping_objects = []
  }
}

function isoverslider(x) {
  return state.currentcolumn.findIndex((column, i) => {
    return x >= settings.slider.width * i && x < settings.slider.width * (i + 1)
  })
}

onclick = function onclick(x, y) {
  state.isover = isoverslider(x)
  ondrag(x, y, 1)
}

ondrag = function ondrag(x, y, button) {
  if (button) {
    if (state.isover > -1) {
      if (y < 0) {
        y = 0
      }
      if (y > state.height) {
        y = state.height
      }
      state.currentcolumn[state.isover] = 1 - y / state.height
      mgraphics.redraw()
    }
  } else {
    state.weightingsMatrix.setColumn(state.shortCC.getShort(state.lastCC), state.currentcolumn)
  }
}

let last_isover = -1
let hov

onidle = function onidle(x, y) {
  if (state.currentcolumn.length > 0) {
    state.isover = isoverslider(x)
    let change = last_isover != state.isover
    let object = state.mappableObj[state.shortParam.getLong(state.isover)]
    if (state.isover > -1 && last_isover != state.isover) {
      try {
        hov.patcher.remove(hov)
      } catch (err) {}
      let r = object.rect
      let x, y, w, h
      x = r[0]
      y = r[1]
      w = r[2] - r[0]
      h = r[3] - r[1]
      const hovColor = settings.hovColor
      hov = object.patcher.newdefault(x, y, 'panel',
        '@patching_rect', x, y, w, h,
        '@presentation_rect', x, y, w, h,
        '@bgfillcolor_type', 'color',
        '@bgfillcolor_color', hovColor[0], hovColor[1], hovColor[2], hovColor[3],
        '@orderfront', 1,
        '@presentation', 1)
    }
    last_isover = state.isover
  }
}

onidleout = function onidleout() {
  last_isover = -1
  try {
    hov.patcher.remove(hov)
  } catch (err) {}
}

onresize = function onresize() {
  box.size(settings.slider.width * state.currentcolumn.length, box.rect[3] - box.rect[1])
  state.width = box.rect[2] - box.rect[0]
  state.height = box.rect[3] - box.rect[1]
  mgraphics.redraw()
}
