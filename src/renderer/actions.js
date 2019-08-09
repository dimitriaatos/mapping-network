import store from './store'
import mapping from './mapping'
import { fromID, toID, makeTitle } from './helpers/midi'
import { newPotentialParameters } from './parameters'
import { Speed } from './helpers/classes';
// import { ipcRenderer } from 'electron'

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

const save = () => ({
  type: 'MAPPING',
  weights: mapping.get('weights')
}),
mapmode = mode => {
  const state = store.getState()
  if (state.mapmode !== mode) {
    // ipcRenderer.send('toOntop', mode)
    if (!mode) {
      let fromFeedback = []

      // when feedback is resieved (parameter is mapped) push it to the fromFeedback array
      state.io.feedback.onmidimessage = midiMessage => {
        fromFeedback.push({id: toID(midiMessage.data)})
      }
      const potentialParameters = [...mapping.parameters, ...newPotentialParameters]
      // sending the MIDI messages of all potentially mapped parameters
      potentialParameters.forEach(({id}) => {
        state.io.selected.outputs.send([...fromID(id), 0])
      })

      // waiting for the DAW to respond through the feedbpack port
      setTimeout(() => {
        potentialParameters.forEach(parameter => {

          if (fromFeedback.some(({id}) => id === parameter.id)) {
            if (!mapping.parameters.some(({id}) => id === parameter.id)) {
              mapping.parameters.add(parameter)
            }
          } else {
            mapping.parameters.delete(parameter)
          }
        })
        state.io.feedback.onmidimessage = undefined
        store.dispatch(save())
      }, 500)
    }
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
      const {short, long} = makeTitle(item)
      item.name = short
      item.description = long
      mapping[axis].add(item)
      return {
        type: 'MAPPING::ADD',
        mapping,
      }
    },
    delete: value => {
      mapping[axis].delete(value)
      return {
        type: 'MAPPING::DELETE',
        mapping,
      }
    },
    edit: data => {
      !data.speed ?
      (mapping[axis][data.index] = {...mapping[axis][data.index], ...data}) :
      (mapping[axis][data.index].speed = new Speed({...mapping[axis][data.index].speed, ...data.speed}))
      return {
        type: 'MAPPING:ADD',
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