import store from './store'
import {Counter} from './helpers/classes'
import {fromID} from './helpers/midi'
import mapping from './mapping'
import {ipcRenderer} from 'electron'

const counter = new Counter(22528, mapping.parameters)
const newPotentialParameters = []

ipcRenderer.on('fromOntop', () => {
  const message = counter.next()
  newPotentialParameters.push({id: message})
  store.getState().io.selected.outputs.send([...fromID(message), 0])
})

export {newPotentialParameters}
