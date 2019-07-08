import state from './state'
import Mapping from './helpers/mappingClass'
import {fromID} from './helpers/midi'

window.mapping = new Mapping()

mapping.output = (id, value) => {
  state.getState().io.selected.output.send([...fromID(id), value * 127])
}

export default mapping
