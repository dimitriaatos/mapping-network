// import defaultMenu from 'electron-default-menu'
import electron, { dialog, ipcMain, app, shell } from 'electron'
import fs from 'fs'

const { Menu } = electron
import openAboutWindow from 'about-window'
import path from 'path'
import * as pack from './../../package.json'
import ccLisence from './lisence.html'

export const createMenu = window => {

	const mappingFileType = { name: 'Mapping', extensions: ['map'], }

	const saveAs = (data) => {
		dialog.showSaveDialog(
			window,
			{
				createDirectory: true,
				filters: [ mappingFileType ],
			},
			filePath => {
				window.webContents.send('print', 'los')
				data ?
				saveRes(undefined, {data, filePath}) :
				window.webContents.send('saveReq', filePath)
			}
		)
	}

	const save = () => {
		// window.webContents.send('saveReq')
		window.webContents.send('print', 'los')
	}

	const saveRes = (event, {data, filePath}) => {
		fs.writeFile(filePath, data, err => {if (err) throw err})
	}

	ipcMain.on('saveRes', saveRes)

	ipcMain.on('saveAs', (event, {data}) => {
		saveAs(data)
	})


	export const openFile = files => {
		files && fs.readFile(files[0], 'utf-8', (err, data) => {
			err ?
				alert("An error ocurred reading the file :" + err.message) :
				window.webContents.send('open', {
					data,
					filePath: files[0]
				})
		})
	}

	const isMac = process.platform === 'darwin'

	const template = [
		isMac ? {
			label: app.getName(),
			role: 'appMenu',
			submenu: [
				{
					label: `About ${pack.productName}`,
					role: 'about',
					click: () => openAboutWindow(
						{
							product_name: pack.productName,
							icon_path: path.join(__dirname, './../../resources/png/512x512.png'),
							description: pack.description,
							copyright: `<div style="text-align:center;width:100%;">${ccLisence}</div>`,
							package_json_dir: path.join(__dirname, './../../'),
							use_inner_html: true,
						}
					),
				},
				// { role: 'about' },
				{ type: 'separator' },
				{ role: 'services' },
				{ type: 'separator' },
				{ role: 'hide' },
				{ role: 'hideothers' },
				{ role: 'unhide' },
				{ type: 'separator' },
				{ role: 'quit' },
			],
		} : {},
		{
			label: 'File',
			role: 'fileMenu',
			submenu: [
				{
					label: 'New',
					accelerator: 'CmdOrCtrl+N',
					click: () => {
						window.webContents.send('new')
					},
				},
				{ type: 'separator' },
				{
					label: 'Open',
					accelerator: 'CmdOrCtrl+O',
					click: () => {
						dialog.showOpenDialog(
							window, {
								properties: ['openFile'],
								filters: [mappingFileType],
							},
							openFile
						)
					}
				},
				{ type: 'separator' },
				{
					label: 'Save',
					accelerator: 'CmdOrCtrl+S',
					click: save
				},
				{
					label: 'Save As',
					accelerator: 'CmdOrCtrl+Shift+S',
					click: saveAs
				},
				{ type: 'separator' },
				isMac ? { role: 'close' } : { role: 'quit' },
			]
		},
		{
			label: 'View',
			submenu: [
				{
					label: 'Edit',
					type: 'checkbox',
					accelerator: 'CmdOrCtrl+E',
					click: ({checked}) => {
						window.webContents.send('edit', checked)
					}
				},
				{ type: 'separator' },
				{ role: 'reload' },
				{ role: 'forcereload' },
				{ role: 'toggledevtools' },
				{ type: 'separator' },
				{ role: 'resetzoom' },
				{ role: 'zoomin' },
				{ role: 'zoomout' },
				{ type: 'separator' },
				{ role: 'togglefullscreen' }
			]
		},
		{
			label: 'Window',
			submenu: [
				{ role: 'minimize' },
				{ role: 'zoom' },
				...(isMac ? [
					{ type: 'separator' },
					{ role: 'front' },
					{ type: 'separator' },
					{ role: 'window' }
				] : [{ role: 'close' }])
			]
		},
		{
			role: 'help',
			submenu: [
				{
					label: 'Learn More',
					click: async () => {
						await shell.openExternal('http://dimitriaatosellinas.atwebpages.com/home/mapping-network')
					}
				},
				{
					label: 'License',
					click: async () => {
						await shell.openExternal('https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode')
					}
				},
				{
					label: 'View Source',
					click: async () => {
						await shell.openExternal('http://github.com/dimitriaatos/mapping-network')
					}
				}
			]
		}
	]
	Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}