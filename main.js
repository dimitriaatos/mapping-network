const {
  app,
  BrowserWindow,
  protocol,
  ipcMain
} = require('electron')

const base = app.getAppPath()
const scheme = 'app'
protocol.registerStandardSchemes([scheme], { secure: true })
require('./electron/create-protocol')(scheme, base)

let win
let mappingWindow

// {
//   transparent: true,
//   minimizable: false,
//   frame: false,
//   toolbar: false,
//   alwaysOnTop: true,
//   toolbar: false,
//   frame: false
// }


app.on('ready', function createWindow() {
  win = new BrowserWindow({
      width: 1000,
      height: 1000,
      title: 'Mapping'
    })

  win.loadURL('app://./index.html')
  win.on('closed', () => {
    win = null
  })

  const makeMappingWindow = () => {
    mappingWindow = new BrowserWindow({
      width: 200,
      height: 200,
      x: 10,
      y: 10,
      frame: false,
      minimizable: false,
      alwaysOnTop: true,
      toolbar: false
    })
    mappingWindow.loadURL('app://./ontop.html')
  }

  ipcMain.on('show-ontop', () => {
    makeMappingWindow()
  })
  ipcMain.on('ontop-clicked', (event) => {
    win.webContents.send('ontop-clicked-los')
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
