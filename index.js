'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var mainWindow = null;

app.on('ready', function() {
    mainWindow = new BrowserWindow({
        width: 340,
        height: 160,
        resizable: false,
        /* redundant instructions because resizable wasn't working */
        minWidth: 340,
        minHeight: 160,
        maxWidth: 340,
        maxHeight: 160,
        icon: __dirname + '/public/assets/icons/clock-128x128.png'
    });
    mainWindow.loadURL('file://' + __dirname + '/public/index.html');

    //mainWindow.webContents.openDevTools();

});
