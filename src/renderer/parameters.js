import store from './store'
import {Counter} from './helpers/classes'
import {fromID} from './helpers/midi'
import mapping from './mapping'
import {ipcRenderer} from 'electron'

const counter = {
  parameters: new Counter(22528, mapping.parameters.map(item => item.id)),
  controls: new Counter(22528, mapping.controls.map(item => item.id))
}

ipcRenderer.on('fromOntop', () => {
  const message = counter.parameters.exclude(mapping.parameters).next()
  store.getState().io.selected.outputs.send([...fromID(message), 0])
})

const newId = type => counter[type].exclude(mapping[type].map(item => item.id)).next()

export { newId }
