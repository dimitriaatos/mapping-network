import { app, BrowserWindow } from 'electron'
import path from 'path'
import { format as formatUrl } from 'url'
import { createMenu, openFile } from './menu'
import * as pack from '../../package.json'

let mainWindow
let launchedFromFile

if (module.hot) {
  module.hot.accept();
}

const developmentMode = process.env.NODE_ENV !== 'production'

const loadContents = (window, route) => {
  if (developmentMode) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}${route ? '?route=' + route : ''}`)
  } else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true,
    }))
  }
}


const createMainWindow = () => {
  const window = new BrowserWindow({
    width: 1000,
    height: 1000,
    title: pack.productName,
    webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: false,
    },
  })

	loadContents(window)
	
	window.webContents.openDevTools()

  window.on('closed', () => {
    mainWindow = null
  })

  return window
}

app.on('ready', () => {
  mainWindow = createMainWindow()
  // mainWindow.toggleDevTools()
	mainWindow.webContents.on('did-finish-load', () => {
		createMenu(mainWindow)
	})

  // if electron was launched from a file, open the file
  launchedFromFile && openFile(mainWindow)([launchedFromFile])
})

app.on('open-file', (event, filePath) => {
  event.preventDefault()

  // store filePath if launched from file (not ready yet)
  app.isReady() ?
    openFile(mainWindow)([filePath]) :
    (launchedFromFile = filePath)
})

app.on('window-all-closed', () => {
  process.platform !== 'darwin' && app.quit()
})

app.on('activate', () => {
  (mainWindow === null) && (mainWindow = createMainWindow())
})