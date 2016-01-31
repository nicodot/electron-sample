'use strict';

var app = require('app');
var BrowserWindow = require('browser-window');

var mainWindow = null;

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');
  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  var Menu = require('menu');
  var Tray = require('tray');
  var nativeImage = require('native-image');

  var trayIcon = new Tray(nativeImage.createFromPath(__dirname + '/icon.png'));

  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'show', click: function () {
        mainWindow.show(); }
    },
    {
      label: 'hide', click: function () {
        mainWindow.hide();
      }
    }
  ]);
  trayIcon.setContextMenu(contextMenu);

  trayIcon.setToolTip(app.getName());

  trayIcon.on('clicked', function () {
    mainWindow.focus();
  });

});
