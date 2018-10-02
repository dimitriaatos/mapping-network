"use strict";

//MGraphics initialaization
mgraphics.init();
mgraphics.relative_coords = 0;
mgraphics.autofill = 0;

/* GLOBAL VARIABLES*/

//object size
var dis_width = box.rect[2] - box.rect[0];
var dis_height = box.rect[3] - box.rect[1];

//slider
var slider_width = 20;
var text_width = 13;
var module_width = slider_width + text_width;
var sliderColor = [0.1, 0.5, 0.5, 1];

var receive_distance = 30;

var hovColor = [0.346048, 0.962593, 0.976871, 0.4091];

var isover = -1; //clicked slider index
var mapmode = 0; //mapmode on/off
var lastCC = -1; //last recieved controlles message index
var ginterface = 1;

var shortParam = new shortIndex();
var shortCC = new shortIndex();

var objlist = new Array(); // all mappable objects in the patch
var paramObjList = new Array(); //mapped parameter objects

//matrices
var weightingsMatrix = new Matrix();
var valuesMatrix = new Matrix();

//quick acces
var currentcolumn = new Array();
var namelist = new Array();

var receiveName = "mapnetcommunication";

//fill() method for Array
Array.prototype.fill = function (e) {
  for (i = 0; i < this.length; i++) {
    this[i] = e;
  }
};

/*CONSTRUCTORS*/

//matrix
function Matrix() {
  this.matrix = new Array();
  this.rownum = 0;
  this.getcolumn = function (index) {
    return this.matrix[index];
  };
  this.getrow = function (index) {
    var row = new Array();
    for (i = 0; i < this.matrix.length; i++) {
      row.push(this.matrix[i][index]);
    }
    return row;
  };
  this.setcolumn = function (index, array) {
    if (array.length != this.matrix[0].length) {
      post("setcolumn receiving an array with wrong size\n");
    } else {
      this.matrix[index] = array;
    }
  };
  this.setrow = function (index, array) {
    if (array.length != this.matrix.length) {
      post("setrow receiving an array with wrong size\n");
    } else {
      for (i = 0; i < this.matrix.length; i++) {
        this.matrix[i][index] = array[i];
      }
    }
  };
  this.addcolumn = function (index) {
    var len = this.rownum;
    var newcolumn = Array(len);
    newcolumn.fill(0);
    this.matrix.splice(index, 0, newcolumn);
  };
  this.addrow = function (index) {
    this.rownum += 1;
    if (this.matrix != null) {
      var len = this.matrix.length;
      for (i = 0; i < len; i++) {
        this.matrix[i].splice(index, 0, 0);
      }
    }
  };
  this.deletecolumn = function (index) {
    this.matrix.splice(index, 1);
  };
  this.deleterow = function (index) {
    this.rownum -= 1;
    for (i = 0; i < this.matrix.length; i++) {
      this.matrix[i].splice(index, 1);
    }
  };
}

//short index
function shortIndex() {
  this.inArray = new Array();

  this.add = function (index) {
    this.inArray.push(index);
    this.inArray.sort(function (a, b) {
      return a - b;
    });
    return this.getShort(index);
  };

  this.delete = function (index) {
    var dIndex = this.getShort(index);
    this.inArray.splice(dIndex, 1);
    return dIndex;
  };

  this.getShort = function (index) {
    return this.inArray.indexOf(index);
  };

  this.getLong = function (index) {
    return this.inArray[index];
  };
  this.length = this.inArray.length;
}

/*FUNCTIONS*/

//initalize variables and get available objects
var nofobj;

function scan() {
  nofobj = 0; //initialize object index
  objlist = []; //clear object list
  function search(obj) {
    if (obj.varname != "" && obj.understands("rawfloat") && obj.patcher.box != this.patcher.box) {
      objlist[nofobj] = obj;
      nofobj++;
    }
  }
  this.patcher.applydeep(search); //fill objlist with objects
}

//controller in message (CC, Value)
var changeCC;
var prevCC = -1;

function msg_int(cc, value) {

  lastCC = cc;

  //detect cc change
  changeCC = cc != prevCC;
  prevCC = cc;
  var sCC;
  if (changeCC) {
    sCC = shortCC.getShort(cc);
    currentcolumn = weightingsMatrix.getcolumn(sCC);
    if (ginterface) {
      mgraphics.redraw();
    }
    //if mapping is on and a new CC comes in, check if it is an new or en existing
    if (mapmode) {
      //if new
      if (sCC < 0) {
        var newsCC = shortCC.add(cc);
        weightingsMatrix.addcolumn(newsCC);
        valuesMatrix.addcolumn(newsCC);
        currentcolumn = weightingsMatrix.getcolumn(newsCC);
        mgraphics.redraw();
      }
    }
  }
  //play mode
  if (!mapmode && sCC > -1) {
    prevCC = -1; //make prevCC = -1 (none) to make sure changeCC is going to be 1 on mapmode
    var scalecolumn = new Array();
    if (weightingsMatrix.matrix[sCC] != null) {
      //scale weights of one CC
      for (i = 0; i < currentcolumn.length; i++) {
        scalecolumn.push(currentcolumn[i] * value);
      }
      //set it on the corresponding position on the valuesMatrix
      valuesMatrix.setcolumn(sCC, scalecolumn);
      var CCnum = shortCC.inArray.length;
      for (i = 0; i < currentcolumn.length; i++) {
        if (currentcolumn[i] != 0.) {
          var p = 0;
          var w = 0;
          for (j = 0; j < CCnum; j++) {
            p += valuesMatrix.matrix[j][i];
            w += weightingsMatrix.matrix[j][i];
          }
          paramObjList[i].message("rawfloat", p / w);
        }
      }
    }
  }
}

function ui(on) {
  ginterface = on;
}

function param(on, index) {
  if (on) {
    var sindex = shortParam.add(index);
    paramObjList.splice(sindex, 0, objlist[index]);
    namelist.splice(sindex, 0, objlist[index].varname);
    weightingsMatrix.addrow(sindex);
    valuesMatrix.addrow(sindex);
  } else {
    var sindex = shortParam.delete(index);
    paramObjList.splice(sindex, 1);
    namelist.splice(sindex, 1);
    weightingsMatrix.deleterow(sindex);
    valuesMatrix.deleterow(sindex);
  }
  //msg_int(lastCC);
  setsize();
  mgraphics.redraw();
}

function setsize() {
  box.size(paramObjList.length * module_width, box.rect[3] - box.rect[1]);
}

function paint() {
  if (true) {
    var startpoint;
    mgraphics.set_line_width(3);
    // drawsliders
    if (currentcolumn.length > 0) {
      for (i = 0; i < currentcolumn.length; i++) {
        mgraphics.set_source_rgba(sliderColor[0], sliderColor[1], sliderColor[2], sliderColor[3]);
        //sliders
        mgraphics.rectangle_rounded(module_width * i + text_width, (1 - currentcolumn[i]) * dis_height, slider_width, dis_height, 0, 0, 0, 0);
        //text
        startpoint = module_width * i + 3;
        mgraphics.fill();
        mgraphics.set_source_rgba(0., 0., 0., 0.5);
        mgraphics.identity_matrix;
        mgraphics.move_to(startpoint, dis_height / 10.);
        mgraphics.rotate(1.570796);
        mgraphics.show_text(namelist[i]);
        mgraphics.identity_matrix();
      }
    }
  }
}

var mapping_objects = new Array();

function mapping(on) {
  mapmode = on;
  if (on) {
    prevCC = -1;
    //receive
    var receive = this.patcher.newdefault(this.box.rect[0], this.box.rect[1] - receive_distance, "receive", receiveName);
    mapping_objects.push(receive);
    this.patcher.connect(receive, 0, this.box, 0);

    //map buttons and sends
    for (i = 0; i < objlist.length; i++) {
      var r = objlist[i].rect;
      var x, y, w, h;
      x = r[0];
      y = r[1];
      w = r[2] - r[0];
      h = r[3] - r[1];

      //objects (ubtn, on, off, snd)
      //ubutton
      var ubtn = objlist[i].patcher.newdefault(x, y, "ubutton", "@patching_rect", x, y, w, h, "@presentation_rect", x, y, w, h, "@orderfront", 1, "@toggle", 1, "@presentation", 1, "@ignoreclick", 0);
      if (shortParam.getShort(i) > -1) {
        ubtn.message("set", 1);
      }

      //messages
      var on = objlist[i].patcher.newdefault(x + 20, y + 50, "message");
      var off = objlist[i].patcher.newdefault(x, y + 50, "message");
      on.message("set", "param", 1, i);
      off.message("set", "param", 0, i);
      //send
      var snd = objlist[i].patcher.newdefault(x, y + 100, "send", receiveName);
      //collect all objects in an Array
      mapping_objects.push(ubtn, on, off, snd);
      //connections
      objlist[i].patcher.connect(ubtn, 1, on, 0);
      objlist[i].patcher.connect(ubtn, 0, off, 0);
      objlist[i].patcher.connect(on, 0, snd, 0);
      objlist[i].patcher.connect(off, 0, snd, 0);
    }
  } else {
    //delete mapping objects
    for (i = 0; i < mapping_objects.length; i++) {
      mapping_objects[i].patcher.remove(mapping_objects[i]);
    }
    prevCC = -1;
    /*/delete empty columns
    for(i=0;i<weightingsMatrix.matrix.length;i++){
        var c = 0;
        var cAr = weightingsMatrix.getcolumn(i);
        for(j=0;j<cAr.length;j++){c += cAr[j];}
        if(c==0){
            weightingsMatrix.deletecolumn(i);
            valuesMatrix.deletecolumn(i);
        }
    }*/
    mapping_objects = [];
  }
}

function isoverslider(x) {
  for (i = 0; i < currentcolumn.length; i++) {
    if (x >= module_width * i && x < module_width * (i + 1)) {
      return i;
    } else {
      isover = -1;
    }
  }
}

function onclick(x, y) {
  isover = isoverslider(x);
  ondrag(x, y, 1);
}

function ondrag(x, y, button) {
  if (button) {
    if (isover > -1) {
      if (y < 0) {
        y = 0;
      }
      if (y > dis_height) {
        y = dis_height;
      }
      currentcolumn[isover] = 1 - y / dis_height;
      mgraphics.redraw();
    }
  } else {
    weightingsMatrix.setcolumn(shortCC.getShort(lastCC), currentcolumn);
  }
}

var last_isover = -1;
var hov;

function onidle(x, y) {
  if (currentcolumn.length > 0) {
    isover = isoverslider(x);
    var change = last_isover != isover;
    var object = objlist[shortParam.getLong(isover)];
    if (isover > -1 && last_isover != isover) {
      try {
        hov.patcher.remove(hov);
      } catch (err) {}
      var r = object.rect;
      var x, y, w, h;
      x = r[0];
      y = r[1];
      w = r[2] - r[0];
      h = r[3] - r[1];
      hov = object.patcher.newdefault(x, y, "panel", "@patching_rect", x, y, w, h, "@presentation_rect", x, y, w, h, "@bgfillcolor_type", "color", "@bgfillcolor_color", hovColor[0], hovColor[1], hovColor[2], hovColor[3], "@orderfront", 1, "@presentation", 1);
    }
    last_isover = isover;
  }
}

function onidleout() {
  last_isover = -1;
  try {
    hov.patcher.remove(hov);
  } catch (err) {}
}

function onresize() {
  box.size(module_width * currentcolumn.length, box.rect[3] - box.rect[1]);
  dis_width = box.rect[2] - box.rect[0];
  dis_height = box.rect[3] - box.rect[1];
  mgraphics.redraw();
}