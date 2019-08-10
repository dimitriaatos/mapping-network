import {combineReducers, createStore} from 'redux'
import Mapping, { Matrices } from './helpers/mappingClass'

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
  state = state || new Mapping()
  switch (action.type) {
    case 'MAPPING::ADD':
    case 'MAPPING::DELETE':
      state.weights = new Matrices(action.weights)
      state[action.axis] = action[action.axis]
      return new Mapping(state)
    case 'MAPPING::RENAME':
      return action.mapping
    case 'MAPPING':
      return new Mapping({ ...state, weights: new Matrices(action.weights) })
    default:
      return state
  }
}

const reducer = combineReducers({io, mapmode, mapping})

const store = createStore(reducer)

store.subscribe(() => {
  const state = store.getState();
  console.dir(state.mapping)
})

export default store
