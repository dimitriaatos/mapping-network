import store from './store'
import actions from './actions'
import { toID } from './helpers/midi'

const io = (inp = 0, outp = 1) => {
  store.dispatch(actions.io.select.inputs({index: inp}))
  store.dispatch(actions.io.select.outputs({index: outp}))
}

const map = (times = 1) => {
  ['controls', 'parameters'].map(axis => {
    [...Array(times)].map((_, index) => store.dispatch(actions.mapping[axis].add({id: toID([176, index])})))
  })
}

export {io, map}