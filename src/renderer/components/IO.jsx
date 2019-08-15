import React, { useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import actions from './../actions'

import Button from '@material-ui/core/Button'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Modal from '@material-ui/core/Modal'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import RefreshIcon from '@material-ui/icons/Refresh'
import Toolbar from '@material-ui/core/Toolbar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import { refreshMIDI } from './../initMIDI'

import WarningIcon from '@material-ui/icons/Warning'

import { otherIO } from './../helpers/functions'

const IO = props => {
  const dispatch = useDispatch(),
    available = useSelector(state => state.io.available, shallowEqual),
    selected = useSelector(state => state.io.selected, shallowEqual),
    selectIO = (value, type) => {
      dispatch(actions.io.select[type](value))
    },
    [open, setOpen] = useState(false),
    handleClose = () => setOpen(false),
    [tab, setTab] = useState('inputs'),
    changeTab = (event, tab) => setTab(tab),
    handleOpen = type => {
      setOpen(true)
      setTab(type)
    }

  return (
    <>
      <Button onClick={() => handleOpen(props.type)} >{props.type}</Button>
      <Modal open={open} onClose={handleClose} style={{alignItems:'center', justifyContent:'center'}} >
        <Card style={{width: '500px', margin: 'auto'}}>
          <CardContent>
            <AppBar position="static">
              <Toolbar>
                <Tabs
                  value={tab}
                  onChange={changeTab}
                  variant="fullWidth"
                  style={{width: '100%'}}
                >
                  <Tab value="inputs" label="inputs" />
                  <Tab value="outputs" label="outputs" />
                </Tabs>
                <IconButton
                  onClick={refreshMIDI}
                  aria-label="refresh-midi"
                >
                  <RefreshIcon fontSize="small" />
                </IconButton>
              </Toolbar>
            </AppBar>
            {
              ['inputs', 'outputs'].map((type, index) => (
              <List aria-label={type} hidden={tab !== type} key={index}>
                {available[type].map((io, index) => (
                  <ListItem
                    key={index}
                    button
                    selected={selected !== undefined ? selected[type].name === io.name : index === 0}
                    onClick={() => selectIO(io.name, type)}
                  >
                    <ListItemText primary={io.name}>
  
                    </ListItemText>
                    {
                      io.name === selected[otherIO(type)].name && (
                        <>
                          <ListItemSecondaryAction >
                            <WarningIcon/>
                          </ListItemSecondaryAction>
                        </>
                      )
                    }
                  </ListItem>
                ))}
              </List>
              ))
            }
          </CardContent>
        </Card>
      </Modal>
    </>
  )
}

export default IO