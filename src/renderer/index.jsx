import React from 'react'
import ReactDOM from 'react-dom'
import './menuActions'
import './windowFunctions'

import App from './components/App'

import { Provider } from 'react-redux'
import store from './store'

import startMIDI from './initMIDI'
import { io, map } from './init'

if (module.hot) {
  module.hot.accept();
}

startMIDI().then(() => {
  io()
  map(1)
})

// const routes = {
//   default: App,
// }

ReactDOM.render(
  <Provider store={store}>
    <App />
    {/* <Router routes={routes} /> */}
  </Provider>,
  document.getElementById('app')
)