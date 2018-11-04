const ipcRenderer = require('electron').ipcRenderer
document.querySelector('button').addEventListener('click', (event) => {
  ipcRenderer.send('ontop-clicked')
});
