import { deepMerge } from './helpers/functions'
import {combineReducers, createStore} from 'redux'
import appStore from './appStore'

const mappingRed = (state, action) => {
  state = state || {
    weights: [],
    values: [],
    controls: [],
    parameters: [],
    columns: 0,
  }
  const {item, axis, controls, parameters, weights, values, columns} = action

  switch (action.type) {
    case 'MAPPING::ADD':
    case 'MAPPING::DELETE':
      return {
        ...state,
        weights,
        values,
        columns,
        [axis]: action[action.axis]
      }
    case 'MAPPING::EDIT':
      deepMerge(state[axis][item.index], item)
      return {...state, [axis]: [...state[axis]]}

    case 'INPUT':
      return {...state, controls: [...controls], parameters: [...parameters], values: action.values}
      
    case 'MAPPING':
      return {...state, weights: [...weights], values: values, controls: [...controls]}
    default:
      return state
  }
}

const reducer = combineReducers({...appStore, mapping: mappingRed})

const store = createStore(reducer)

// store.subscribe(() => {
//   const state = store.getState()
//   console.dir(state.mapping)
// })

export default store
