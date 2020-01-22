import electron from 'electron'
import store from './store'
import actions from './actions'
import { initMapping } from './store'
import { map } from './init'

const {ipcRenderer} = electron

ipcRenderer.on('open', (event, {data, filePath}) => {
  store.dispatch(actions.open({data: JSON.parse(data), filePath}))
})

ipcRenderer.on('saveReq', (event, filePath) => {
  filePath = filePath || store.getState().mapping.open
  ipcRenderer.send('saveRes', {
    filePath,
    data: JSON.stringify(store.getState().mapping),
    window: electron.remote.getCurrentWindow(),
  })
})

ipcRenderer.on('new', () => {
  store.dispatch(actions.open({data: initMapping}))
  map(1)
})

ipcRenderer.on('edit', (event, mode) => {
  store.dispatch(actions.mapmode.global(mode))
})  