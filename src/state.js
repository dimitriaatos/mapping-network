import {createStore, combineReducers} from './../node_modules/redux/es/redux.mjs'
import Matrix from './helpers/matrix.js'

const io = (state, action) => {
  state = state ? state : {
    selected: {
      input: {},
      output: {}
    },
    available: {
      inputs: {},
      outputs: {}
    },
    feedback: {}
  }
  switch (action.type) {
    case 'IO::SELECT_INPUT':
      return Object.assign(state, {
        selected: Object.assign(state.selected, {input: action.input})
      })
      break
    case 'IO::SELECT_OUTPUT':
      return Object.assign(state, {
        selected: Object.assign(state.selected, {output: action.output}),
        feedback: state.available.inputs.find((input) => input.name == action.output.name || input.id == action.output.id)
      })
      break
    case 'IO::AVAILABLE':
    return Object.assign(state, {
      available: Object.assign(state.available, action.io)
    })
    default:
      return state
  }
}

const mapmode = (state = false, action) => {
  if (action.type == 'MAP_MODE') {
    return action.mode
  } else {
    return state
  }
}

const mapping = (state = {}, action) => {
  if (action.type == 'MAPPING') {
    return action.mapping
  } else {
    return state
  }
}

const reducer = combineReducers({io, mapmode, mapping})

let state = createStore(reducer)
window.state = state

state.subscribe(() => {
  const c = state.getState()
  console.dir(c);
})

export default state
