import React, { useEffect } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
// import AddCircleIcon from '@material-ui/icons/AddCircle'
import MenuItem from '@material-ui/core/MenuItem'
import { midiParse, fromID, midiFormat, toID } from '../helpers/midi'
import TextField from '@material-ui/core/TextField'
import SettingsInputSvideoIcon from '@material-ui/icons/SettingsInputSvideo'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import SettingsInputSvideoIconFilled from './SettingsInputSvideoIconFilled'

import { useDispatch, useSelector } from 'react-redux'
import actions from '../actions'

import Speed from './Speed'

const ContextMenu = props => {
  // Data: id, speedState, normalize, max
  const id = useSelector(state => state.mapping[props.type][props.index].id),
  speedState = useSelector(state => state.mapping[props.type][props.index].speed.state),
  normalize = useSelector(state => state.mapping[props.type][props.index].speed.normalize),
  smooth = useSelector(state => state.mapping[props.type][props.index].speed.smooth),
  max = useSelector(state => state.mapping[props.type][props.index].speed.max),
  localMap = useSelector(state => state.mapmode.local)

  // Dispatch
  const dispatch = useDispatch()

  // Calculated data
  const midiData = midiParse(fromID(id)),
  isControl = props.type === 'controls'

  // Actions
  const change = dataType => ({target: {value}}) => {
    dispatch(actions.mapping[props.type].edit({
      index: props.index,
      id: toID(midiFormat({
        ...midiData,
        [dataType]: value,
      }))
    }))
  },
  speed = dataType => value => {
    const state = dataType === 'state' ? {normalize: value} : {}
    dispatch(actions.mapping[props.type].edit({
      index: props.index,
      speed: {
        [dataType]: value,
        ...state,
      }
    }))
  },
  toggleLocalMap = () => {
    dispatch(actions.mapmode.local(props.index))
  }

  // State changes triggered by menu opening
  useEffect(() => {
    // open and close normalization mode with the menu
    // if speed is enabled but not normalized yet
    speedState && props.open &&
    speed('normalize')(max === 0 ? true : normalize === true && false)

    // close local mapmode with the menu if it is open
    !props.open && localMap === props.index && toggleLocalMap()
  }, [props.open])
  
  return (
    <List style={{width: 360}}>
    <ListItem>
      <ListItemText primary={
        <>
          <TextField
            style={{width: 140}}
            label="MIDI"
            value={midiData.type}
            select
            onChange={change('type')}
          >
            {
              [0, 2, 5, 1, 3, 4].map((type, index) => {
                const {name} = midiParse(midiFormat({type, midiChannel: midiData.channel, value: 0, index: midiData.index}))
                return (
                  <MenuItem value={type} key={index}>
                    {name}
                  </MenuItem>
                )
            })
            }
          </TextField>
          <TextField
            style={{width: 70}}
            type="number"
            label="Number"
            value={midiData.index}
            onChange={change('index')}
            InputProps={{ inputProps: { min: 0, max: 127 } }}
          />
          <TextField
            style={{width: 70}}
            type="number"
            label="Channel"
            value={midiData.channel}
            onChange={change('midiChannel')}
            InputProps={{ inputProps: { min: 1, max: 16 } }}
          />
        </>
        } />
        {
          isControl && (
            <ListItemSecondaryAction>
            <IconButton
              onClick={toggleLocalMap}
            >
              {
                localMap === props.index ?
                <SettingsInputSvideoIconFilled/> :
                <SettingsInputSvideoIcon />
              }
            </IconButton>
          </ListItemSecondaryAction>
          )
        }
    </ListItem>
    { isControl && <Speed {...{isControl, speedState, speed, smooth, normalize}}/>}
    {/* <ListItem>
      <ListItemText primary={
        <IconButton>
          <DeleteIcon />
        </IconButton>
      } />
    </ListItem> */}
  </List>
  )
}

export default ContextMenu