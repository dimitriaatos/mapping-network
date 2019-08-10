import store from './store'
import mapping from './mapping'
import { makeTitle } from './helpers/midi'
import { Speed } from './helpers/classes'
// import Mapping from './helpers/mappingClass';
// import { ipcRenderer } from 'electron'
import { newId } from './parameters'
import { otherType } from './helpers/functions';

const findIO = query => {
  const state = store.getState(),
  [key, value] = Object.entries(query)[0]
  return typeof value === 'string' ?
  state.io.available[key].find(io => io.name == value) :
  typeof value === 'number' ?
  state.io.available[key].find(io => io.id == value.toString()) :
  typeof value === 'object' && ('index' in value) ?
  state.io.available[key][value.index] :
  console.error(`Wrong type of query was given to findIO`)
}

const save = weights => ({
  type: 'MAPPING',
  weights: weights || mapping.weights
}),
mapmode = mode => {
  const state = store.getState()
  if (state.mapmode !== mode) {
    // ipcRenderer.send('toOntop', mode)
    return ({
    type: 'MAP_MODE',
    mode,
    })
  } else return {type: 'none'}
},
inputs = inputs => {
  inputs = findIO({inputs})
  /**
   * Side effect:
   * remove callback from previously seceted midi input
   * and create one for the newly selected one
   */
  store.getState().io.selected.inputs.onmidimessage = undefined
  inputs.onmidimessage = midiMessage => {
    document.dispatchEvent(new CustomEvent('midiIn', {detail: midiMessage.data}))
  }
  return {
    type: 'IO::SELECT_INPUTS',
    inputs,
  }
},
outputs = outputs => ({
  type: 'IO::SELECT_OUTPUTS',
  outputs: findIO({outputs}),
}),
available = io => ({
  type: 'IO::AVAILABLE',
  io,
}),
editMapping = ['parameters', 'controls'].reduce((accum, axis) => {
  accum[axis] = {
    add: item => {
      item = item || {id: newId(axis)}

      axis === 'parameters' &&
      mapping.weights.length === 0 &&
      mapping.weights._columns === 0 &&
      store.dispatch(actions.mapping[otherType(axis)].add())

      item.description = makeTitle(item).long
      const {weights, axisData} = mapping[axis].add(item)
      return {
        type: 'MAPPING::ADD',
        weights,
        [axis]: axisData,
        axis,
      }
    },
    delete: item => {
      const {weights, axisData} = mapping[axis].delete(item)
      return {
        type: 'MAPPING::DELETE',
        weights,
        [axis]: axisData,
        axis,
      }
    },
    edit: data => {
      !data.speed ?
      (mapping[axis][data.index] = {...mapping[axis][data.index], ...data}) :
      (mapping[axis][data.index].speed = new Speed({...mapping[axis][data.index].speed, ...data.speed}))
      return {
        type: 'MAPPING:EDIT',
        mapping,
      }
    }
  }
  return accum
}, {}),
rename = ({axis, index, value}) => {
  mapping[axis][index].name = value
  return {
    type: 'MAPPING::RENAME',
    mapping,
  }
},
actions = {
  mapmode,
  io: {
    available,
    select: {
      inputs,
      outputs,
    }
  },
  mapping: {
    save,
    rename,
    ...editMapping,
  }
}

export default actions