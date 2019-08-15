import store from './store'

const mapmode = mode => {
  const state = store.getState()
  if (state.mapmode !== mode) {
    return ({
    type: 'MAP_MODE',
    mode,
    })
  } else return {type: 'none'}
}

const findIO = query => {
  const state = store.getState(),
  [key, value] = Object.entries(query)[0]
  return typeof value === 'string' ?
  state.io.available[key].find(io => io.name == value) :
  typeof value === 'number' ?
  state.io.available[key].find(io => io.id == value.toString()) :
  typeof value === 'object' && ('index' in value) ?
  state.io.available[key][value.index] :
  console.error(`Wrong type of query was given to findIO`)
}

const inputs = inputs => {
  inputs = findIO({inputs})
  /**
   * Side effect:
   * remove callback from previously seceted midi input
   * and create one for the newly selected one
   */
  store.getState().io.selected.inputs.onmidimessage = undefined
  inputs.onmidimessage = midiMessage => {
    document.dispatchEvent(new CustomEvent('midiIn', {detail: midiMessage.data}))
  }
  return {
    type: 'IO::SELECT_INPUTS',
    inputs,
  }
}

const outputs = outputs => ({
  type: 'IO::SELECT_OUTPUTS',
  outputs: findIO({outputs}),
})

const available = io => ({
  type: 'IO::AVAILABLE',
  io,
})

const app = {
  mapmode,
  io: {
    select: {
      inputs,
      outputs,
    },
    available,
  }
}

export default app