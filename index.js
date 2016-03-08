'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('ready', function() {
  mainWindow = new BrowserWindow({
    width: 300,
    height: 200
  })

  mainWindow.loadURL('file://' + __dirname + '/public/index.html');

  //mainWindow.webContents.openDevTools();

})
