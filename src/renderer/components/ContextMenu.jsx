import React, { useState, useEffect } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import MenuItem from '@material-ui/core/MenuItem'
import { midiParse, fromID, midiFormat, toID } from '../helpers/midi'
import TextField from '@material-ui/core/TextField'
import SettingsInputSvideoIcon from '@material-ui/icons/SettingsInputSvideo'
// import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import SettingsInputSvideoIconFilled from './SettingsInputSvideoIconFilled'

import { useDispatch, useSelector } from 'react-redux'
import actions from '../actions'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

const ContextMenu = props => {
  const id = useSelector(state => state.mapping[props.type][props.index].id),
  speedState = useSelector(state => state.mapping[props.type][props.index].speed.state),
  normalize = useSelector(state => state.mapping[props.type][props.index].speed.normalize),
  max = useSelector(state => state.mapping[props.type][props.index].speed.max),
  dispatch = useDispatch(),
  midiData = midiParse(fromID(id)),
  isControl = props.type === 'controls',
  change = dataType => ({target: {value}}) => {
    dispatch(actions.mapping[props.type].edit({index: props.index, id: toID(midiFormat({...midiData, [dataType]: value}))}))
  },
  handleSpeed = (event, value) => dispatch(actions.mapping[props.type].edit({index: props.index, speed: {state: value, normalize: value}})),
  handleNormalize = (event, value) => dispatch(actions.mapping[props.type].edit({index: props.index, speed: {normalize: value}})),
  [remap, setRemap] = useState(false)
  
  useEffect(() => {
    props.open === true ?
    max === 0 && handleNormalize(null, true) :
    normalize === true && handleNormalize(null, false)
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
              onClick={() => {setRemap(state => !state)}}
            >
              {
              remap ?
              <SettingsInputSvideoIconFilled/> :
              <SettingsInputSvideoIcon />
              }
            </IconButton>
          </ListItemSecondaryAction>
          )
        }
    </ListItem>
    {
      isControl && (
        <ListItem>
          {/* <ListItemIcon>

          </ListItemIcon> */}
          <ListItemText primary={
            <FormControlLabel
              value="Speed"
              checked={speedState}
              control={<Checkbox color="primary"/>}
              label="Speed"
              labelPlacement="end"
              onChange={handleSpeed}
            />
          } />
          <ListItemSecondaryAction>
            {
              speedState && 
                <FormControlLabel
                  value="Normalize"
                  control={<Switch color="primary"/>}
                  label="Normalize"
                  labelPlacement="end"
                  checked={normalize}
                  onChange={handleNormalize}
                />
            }
            <IconButton>
              <AddCircleIcon/>
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      )
    }
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