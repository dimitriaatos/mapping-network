import React from 'react'
import Switch from '@material-ui/core/Switch'
import Tooltip from '@material-ui/core/Tooltip'
import { useDispatch, useSelector } from 'react-redux'
import actions from './../actions'

const MapMode = () => {
  const mapmode = useSelector(state => state.mapmode.global),
    dispatch = useDispatch(),
    changeMapMode = ({target: {checked}}) => dispatch(actions.mapmode.global(checked))
  return (
    <Tooltip title="Mapping">
      <Switch checked={mapmode} onChange={changeMapMode} />
    </Tooltip>
  )
}

export default MapMode