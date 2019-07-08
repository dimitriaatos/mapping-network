const { app, BrowserWindow, ipcMain } = require('electron'),
path = require('path'),
url = require('url')

let mainWindow
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

const createMainWindow = () => {
  const window = new BrowserWindow({
    width: 1000,
    height: 1000,
    title: 'Mapping',
    webPreferences: {
      nodeIntegration: true,
    },
  })

  window.loadURL(url.format({
    pathname: path.join(__dirname, './../../index.html'),
    protocol: 'file',
    slashes: true,
  }))

  window.on('closed', () => {
    mainWindow = null
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
      toolbar: false,
      webPreferences: {
        nodeIntegration: true,
      },
    })
    mappingWindow.loadURL(url.format({
      pathname: path.join(__dirname, './../../ontop.html'),
      protocol: 'file',
      slashes: true,
    }))
  }

  ipcMain.on('show-ontop', () => {
    makeMappingWindow()
  })
  ipcMain.on('ontop-clicked', event => {
    console.log('main')
    window.webContents.send('ontop-clicked-los')
  })

  return window
}


app.on('ready', () => {
  mainWindow = createMainWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    mainWindow = createMainWindow()
  }
})