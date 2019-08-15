import React from 'react'
import Row from './Row'
import HeaderCell from './HeaderCell'
import { useDispatch, useSelector } from 'react-redux'
import actions from './../actions'
import { table, cellSize, cellSizeNum } from './sty'

import IO from './IO'
import AddButton from './AddButton'

const Table = () => {
  const weights = useSelector(state => state.mapping.weights),
    columns = useSelector(state => state.mapping.columns),
    // [state, setState] = useState(mapping.weights),
    dispatch = useDispatch(),
    controls = useSelector(state => state.mapping.controls),
    parameters = useSelector(state => state.mapping.parameters),
    rowChange = (r, c, value) => {
      dispatch(actions.mapping.edit(r, c, value))
    },
    // changeStop = () => dispatch(actions.mapping.edit(state)),
    add = type => dispatch(actions.mapping[type].add())
    // useEffect(() => setState(mapping.weights), [mapping.weights])
  return (
    <div style={{paddingRight: cellSizeNum * 2 + 'px'}} >
      <table style={{margin: 'auto', backgroundColor: 'white'}}>
        <thead>
          <tr style={{width: cellSize, minHeight: cellSize}} >
            <th></th>
            <th></th>
            <th colSpan={columns} >
              <IO type="inputs" />
            </th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            {controls.map((name, c) => (
              <th key={c}>
                <div style={table.column} >
                  <HeaderCell
                    type="controls"
                    index={c}
                    data={name}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
              weights.map((row, r) => {
              return (
                <Row
                  key={r}
                  index={r}
                  length={weights.length}
                  value={row}
                  data={parameters[r]}
                  onChange={rowChange}
                  // onChangeStop={changeStop}
                />
              )
            })
          }
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td colSpan={columns} >
              <div style={{width: '100%', display: 'flex', justifyContent: 'center'}} >
                <AddButton type="parameters" onClick={add} />
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default Table