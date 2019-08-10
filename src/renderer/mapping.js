import store from './store'
import Mapping from './helpers/mappingClass'
import { fromID } from './helpers/midi'

const mapping = new Mapping()

mapping.output = (parameter, value) => {
  const a = [...fromID(parameter.id), Math.round(value * 127)]
  store.getState().io.selected.outputs.send([a[0], a[1], a[2]])
}

export default mapping