import noCover from '../assets/no-cover.jpg';

const electron = window.require('@electron/remote');
const { join } = window.require('path');
const fs = window.require('fs');

function fileLoader(filter, defPath = 'downloads') {
  const defaultFilter = {
    name: 'Lasso JSON Package',
    extensions: ['json'],
  },
  pkgpath = electron.dialog.showOpenDialogSync({
    title: 'Package loader',
    properties: ['openFile'],
    filters: [filter || defaultFilter],
    defaultPath: electron.app.getPath(defPath),
  }),
  folder = electron.app.getPath('documents');
  return {
    path: pkgpath ? pkgpath[0] : '',
    folder: join(folder, 'Lasso Downloads'),
  };
};

function manageFolder() {
  let docs = electron.app.getPath('documents'),
  dlpath = join(docs, 'Lasso Downloads/Covers');
  fs.mkdirSync(dlpath, { recursive: true }, _ => {});
  return join(dlpath, '../');
};

function messageBox(config) {
  electron.dialog.showMessageBox({
    message: 'Lasso - Downloader',
    ...config,
  });
};

const compare = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

const notFoundCover = ({ target }) => {
  target.src = noCover;
};

const getLocalURL = cover => {
  try {    
    let buffer = fs.readFileSync(cover),
    file = new File([buffer], cover);
    return URL.createObjectURL(file);
  } catch (_) { return cover };
};

export { fileLoader, manageFolder, messageBox, compare, notFoundCover, getLocalURL };
