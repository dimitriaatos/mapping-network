import React, { useState, useEffect } from 'react'
import Row from './Row'
import HeaderCell from './HeaderCell'
import { useDispatch, useSelector } from 'react-redux'
import actions from './../actions'
import { table, cellSize, cellSizeNum } from './sty'
import { Matrices } from './../helpers/mappingClass'

import IO from './IO'
import AddButton from './AddButton'

const Table = () => {
  const weights = useSelector(state => state.mapping.weights),
    [state, setState] = useState(weights),
    dispatch = useDispatch(),
    names = useSelector(state => state.mapping.controls),
    rowChange = (row, r) => {
      setState(state => {
        state[r] = row
        return new Matrices(state)
      })
    },
    changeStop = () => dispatch(actions.mapping.save(state)),
    add = type => dispatch(actions.mapping[type].add())
    useEffect(() => setState(weights), [weights])
  return (
    <div style={{paddingRight: cellSizeNum * 2 + 'px'}} >
      <table style={{margin: 'auto', backgroundColor: 'white'}}>
        <thead>
          <tr style={{width: cellSize, minHeight: cellSize}} >
            <th></th>
            <th></th>
            <th colSpan={state._columns} >
              <IO type="inputs" />
            </th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            {names.map((name, c) => (
              <th key={c}>
                <div style={table.column} >
                  <HeaderCell
                    type="control"
                    index={c}
                  />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            state.map((row, r) => (
              <Row
                key={r}
                index={r}
                length={state.length}
                value={row}
                onChange={rowChange}
                onChangeStop={changeStop}
              />
            ))
          }
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td></td>
            <td colSpan={state._columns} >
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