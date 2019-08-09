import store from './store'
import actions from './actions'
import { toID } from './helpers/midi'

const io = () => {
  store.dispatch(actions.io.select.inputs({index: 0}))
  store.dispatch(actions.io.select.outputs({index: 1}))
}

const map = () => {
  const dim = [2, 2]
  
  for (let i = 0; i < dim[0]; i++) {
    store.dispatch(actions.mapping.controls.add({id: toID([176, i])}))
  }
  for (let i = 0; i < dim[1]; i++) {
    store.dispatch(actions.mapping.parameters.add({id: toID([176, i])}))
  }
  store.dispatch(actions.mapping.save())
}

// const weights () => {
  
// }

const send = () => {
  store.getState().io.selected.outputs.send(new Uint8Array([176, 1, 50]))
}

export {io, map, send}