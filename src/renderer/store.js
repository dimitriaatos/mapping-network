import { deepMerge, oneLevelDownSpread } from './helpers/functions'
import {combineReducers, createStore} from 'redux'
import appStore from './appStore'

const initMapping = {
  weights: [],
  values: [],
  controls: [],
  parameters: [],
  columns: 0,
  open: '',
}

const mappingRed = (state, action) => {
  state = state || oneLevelDownSpread(initMapping)
  const {item, axis, controls, parameters, weights, values, columns} = action

  switch (action.type) {
    case 'MAPPING::ADD':
    case 'MAPPING::DELETE':
      return {
        ...state,
        weights,
        values,
        columns,
        [axis]: [...action[action.axis]]
      }

    case 'MAPPING::EDIT':
      deepMerge(state[axis][item.index], item)
      return {...state, [axis]: [...state[axis]]}

    case 'INPUT':
      return {...state, controls: [...controls], parameters: [...parameters], values: action.values}

    case 'OUTPUT':
      state.parameters[item.index] = item
      return {...state, parameters: [...state.parameters]}
          
    case 'MAPPING':
      return {...state, weights: [...weights], values: values, controls: [...controls]}
    
    case 'OPEN':
        action.data.open = action.filePath || ''
      return oneLevelDownSpread(action.data)
    
    default:
      return state
  }
}

const reducer = combineReducers({...appStore, mapping: mappingRed})

const store = createStore(reducer)

store.subscribe(() => {
  const state = store.getState()
  console.dir(state)
})

export default store
export { initMapping }
