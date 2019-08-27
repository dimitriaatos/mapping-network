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
  }
  switch (action.type) {
    case 'IO::SELECT_INPUTS':
      return {...state, selected: {...state.selected, inputs: action.inputs}}
    case 'IO::SELECT_OUTPUTS':
      return {
        ...state,
        selected: {...state.selected, outputs: action.outputs},
      }
    case 'IO::AVAILABLE':
      return {...state, available: action.io}
    default:
      return state
  }
}

const mapmode = (state = {global: false, local: -1}, action) => {
  if (action.type === 'MAP_MODE') {
    action.mode.local === state.local && (action.mode.local = -1)
    return {...state, ...action.mode}
  } else {
    return state
  }
}

const appStore = {io, mapmode}

export default appStore