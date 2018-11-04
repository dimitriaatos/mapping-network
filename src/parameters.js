import state from './state.js'
import {Counter} from './helpers/classes.js'
import {fromID} from './helpers/midi.js'
import mapping from './mapping.js'
const ipcRenderer = require('electron').ipcRenderer

const counter = new Counter(22528, mapping.parameters)
const potentialParameters = []

ipcRenderer.on('ontop-clicked-los', () => {
  const message = counter.next()
  // controlIn(message)
  potentialParameters.push(message)
  state.getState().io.selected.output.send([...fromID(message), 0])
})

export {potentialParameters}
