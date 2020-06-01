'use strict'

const electron = require('electron')

const { app, Menu } = electron

const wins = require('./windows')
const exportDB = require('./export-db')
const importDB = require('./import-db')
const removeDB = require('./remove-db')
const changeReportsFolder = require('./change-reports-folder')

module.exports = ({
  pathToUserData,
  pathToUserDocuments
}) => {
  const menuTemplate = [
    {
      label: 'Application',
      submenu: [
        { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click: () => app.quit() },
        { type: 'separator' },
        {
          label: 'Open dev tools',
          accelerator: 'CmdOrCtrl+D',
          click: () => {
            if (!wins.mainWindow) {
              return
            }

            wins.mainWindow.webContents.openDevTools()
          }
        },
        {
          label: 'Refresh page',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            if (!wins.mainWindow) {
              return
            }

            wins.mainWindow.reload()
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
        { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
        { type: 'separator' },
        { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
        { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
        { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
        { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' }
      ]
    },
    {
      label: 'Tools',
      submenu: [
        {
          label: 'Export DB',
          accelerator: 'CmdOrCtrl+E',
          click: exportDB({ pathToUserData, pathToUserDocuments })
        },
        {
          label: 'Import DB',
          accelerator: 'CmdOrCtrl+I',
          click: importDB({ pathToUserData, pathToUserDocuments })
        },
        {
          label: 'Remove DB',
          accelerator: 'CmdOrCtrl+R',
          click: removeDB({ pathToUserData })
        },
        {
          label: 'Change reports folder',
          accelerator: 'CmdOrCtrl+F',
          click: changeReportsFolder({ pathToUserDocuments })
        }
      ]
    }
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))
}
