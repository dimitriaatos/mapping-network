import state from './state.js'
import Mapping from './helpers/mappingClass.js'
import {fromID} from './helpers/midi.js'

window.mapping = new Mapping()

mapping.output = (id, value) => {
  state.getState().io.selected.output.send([...fromID(id), value * 127])
}

export default mapping
