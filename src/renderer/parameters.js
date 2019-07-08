import state from './state'
import {Counter} from './helpers/classes'
import {fromID} from './helpers/midi'
import mapping from './mapping'
import {ipcRenderer} from 'electron'

const counter = new Counter(22528, mapping.parameters)
const potentialParameters = []

ipcRenderer.on('ontop-clicked-los', () => {
  const message = counter.next()
  // controlIn(message)
  potentialParameters.push(message)
  state.getState().io.selected.output.send([...fromID(message), 0])
})

export {potentialParameters}
