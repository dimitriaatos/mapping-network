import React, { useState, useEffect } from 'react'
import Row from './Row'
import HeaderCell from './HeaderCell'
import { useDispatch, useSelector } from 'react-redux'
import actions from './../actions'
import { table, cellSize, cellSizeNum } from './sty'

import IO from './IO'

const Table = props => {
  const [state, setState] = useState(props.value || [[]]),
    dispatch = useDispatch(),
    names = useSelector(state => state.mapping.controls),
    rowChange = (row, r) => {
      setState(state => {state[r] = row; return [...state]})
    },
    changeStop = () => {
      dispatch(actions.mapping.save())
    }

  useEffect(() => {
    setState(props.value)
  }, [props.value])
  return (
    <div style={{paddingRight: cellSizeNum * 2 + 'px'}} >
      <table style={{margin: 'auto', backgroundColor: 'white'}}>
        <thead>
          <tr style={{width: cellSize, minHeight: cellSize}} >
            <th></th><th></th>
            <th colSpan={state.length} >
            <IO type="inputs" />
          </th></tr>
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
                value={row}
                onChange={rowChange}
                onChangeStop={changeStop}
              />
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Table