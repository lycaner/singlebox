const { app, BrowserWindow } = require('electron');
const path = require('path');

const { REACT_PATH } = require('../constants/paths');
const { getPreference } = require('../libs/preferences');

const mainWindow = require('./main');

let win;

const get = () => win;

const create = () => {
  const attachToMenubar = getPreference('attachToMenubar');

  win = new BrowserWindow({
    width: 400,
    height: 590,
    resizable: false,
    maximizable: false,
    minimizable: false,
    fullscreenable: false,
    autoHideMenuBar: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: app.isPackaged, // webSecurity = false in dev to use file:// with dev server
      preload: path.join(__dirname, '..', 'preload', 'spellcheck-languages.js'),
    },
    parent: attachToMenubar ? null : mainWindow.get(),
  });
  win.setMenuBarVisibility(false);

  win.loadURL(REACT_PATH);

  win.on('closed', () => {
    win = null;
  });
};

const show = () => {
  if (win == null) {
    create();
  } else {
    win.show();
  }
};

module.exports = {
  get,
  create,
  show,
};
