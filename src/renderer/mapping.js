import store from './store'
import Mapping from './helpers/mappingClass'
import { fromID } from './helpers/midi'
import actions from './actions'

const mapping = new Mapping()

mapping.output = (parameter, value) => {
  parameter.midi.type === 0 && (value = Math.ceil(value))
  const state = store.getState()
  if (state.mapping.parameters[parameter.index].value !== value) {
    store.dispatch(actions.mapping.parameters.edit({index: parameter.index, value}))
    state.io.selected.outputs.send([...fromID(parameter.id), Math.round(value * 127)])
  }
}

window.mapping = mapping
window.values = mapping.weights.values

export default mapping