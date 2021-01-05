import { ipcRenderer } from 'electron'
// import remote from '@electron/remote'
import store from './store'
import actions from './actions'
import { initMapping } from './store'
import { map } from './init'

ipcRenderer.on('open', (event, {data, filePath}) => {
  store.dispatch(actions.open({data: JSON.parse(data), filePath}))
})

ipcRenderer.on('saveReq', (event, filePath) => {
	filePath = filePath || store.getState().mapping.open
	console.log(`filepath = ${filePath ? 'saveRes' : 'saveAs'}`)
  ipcRenderer.send( filePath ? 'saveRes' : 'saveAs', {
    data: JSON.stringify(store.getState().mapping),
		filePath,
	})
})

ipcRenderer.on('print', (event, data) => {
  console.log("lostre")
})

ipcRenderer.on('new', () => {
  store.dispatch(actions.open({data: initMapping}))
  map(1)
})

ipcRenderer.on('edit', (event, mode) => {
  store.dispatch(actions.mapmode.global(mode))
})  