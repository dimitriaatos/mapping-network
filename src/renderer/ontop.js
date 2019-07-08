// const ipcRenderer = require('electron').ipcRenderer
import {ipcRenderer} from 'electron'
document.querySelector('button').addEventListener('click', (event) => {
  ipcRenderer.send('ontop-clicked')
});
