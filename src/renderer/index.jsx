import React from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router-static'

import App from './components/App'
import OnTop from './components/OnTop'

import { Provider } from 'react-redux'
import store from './store'

import startMIDI from './initMIDI'
import { io, map } from './test'

startMIDI().then(() => {
  // test init
  io()
  map()
})

// import { ipcRenderer } from 'electron'
// import actions from './actions'
// ipcRenderer.on('mapmode', (event, mode) => store.dispatch(actions.mapmode(mode)))

const routes = {
  default: App,
  ontop: OnTop,
}

ReactDOM.render(
  <Provider store={store}>
    <Router routes={routes} />
  </Provider>,
  document.getElementById('app')
)