import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Slider from '@material-ui/core/Slider'

const Speed = ({ speedState, speed, smooth, normalize }) => {
  return (
    <>
      <ListItem>
        <ListItemText primary={
          <FormControlLabel
            value="Speed"
            checked={speedState}
            control={<Checkbox color="primary"/>}
            label="Speed"
            labelPlacement="end"
            onChange={(event, value) => speed('state')(value)}
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
              onChange={(event, value) => speed('normalize')(value)}
            />
          }
        </ListItemSecondaryAction>
      </ListItem>
        {speedState &&
          <ListItem>
            <ListItemText
              primary={
                <Slider
                  value={smooth}
                  onChange={(event, value) => speed('smooth')(value)}
                  aria-labelledby="speeth-smooth-slider"
                  min={1}
                  max={1000}
                  valueLabelDisplay="auto"
                />
              }
            />
          </ListItem>
        }
    </>
  )
}

export default Speed