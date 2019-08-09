import {combineReducers, createStore} from 'redux'

const io = (state, action) => {
  state = state || {
    selected: {
      inputs: {},
      outputs: {},
    },
    available: {
      inputs: [],
      outputs: [],
    },
    // feedback contains MIDI outputs that correspond to the selected midi inputs
    // these are usefull for sending feedback to the MIDI controler
    feedback: {},
  }
  switch (action.type) {
    case 'IO::SELECT_INPUTS':
      return {...state, selected: {...state.selected, inputs: action.inputs}}
    case 'IO::SELECT_OUTPUTS':
      return {
        ...state,
        selected: {...state.selected, outputs: action.outputs},
        feedback: state.available.inputs.find(inputs => inputs.name == action.outputs.name || inputs.id == action.outputs.id),        
      }
    case 'IO::AVAILABLE':
      return {...state, available: action.io}
    default:
      return state
  }
},
mapmode = (state = false, action) => {
  if (action.type === 'MAP_MODE') {
    return action.mode
  } else {
    return state
  }
},
mapping = (state, action) => {
  state = state || {
    controls: [],
    parameters: [],
    weights: [],
  }

  switch (action.type) {
    case 'MAPPING::ADD':
      return action.mapping
    case 'MAPPING::DELETE':
      return action.mapping
    case 'MAPPING::RENAME':
      return action.mapping
    case 'MAPPING':
      return { ...state, weights: action.weights }
    default:
      return state
  }
}

const reducer = combineReducers({io, mapmode, mapping})

const store = createStore(reducer)

store.subscribe(() => {
  console.dir(store.getState())
})

export default store
