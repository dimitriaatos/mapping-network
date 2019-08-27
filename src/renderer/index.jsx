import React from 'react'
import ReactDOM from 'react-dom'
// import { Router } from 'react-router-static'

import App from './components/App'

import { Provider } from 'react-redux'
import store from './store'

import startMIDI from './initMIDI'
import { io, map } from './init'

startMIDI().then(() => {
  io()
  map(1)
})

// const routes = {
//   default: App,
// }

ReactDOM.render(
  <Provider store={store}>
    <App/>
    {/* <Router routes={routes} /> */}
  </Provider>,
  document.getElementById('app')
)