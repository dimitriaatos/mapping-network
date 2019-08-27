const { dialog } = require('electron').remote

dialog.showOpenDialog({properties: ['openFile'], callback: console.log})