import {
  app,
  protocol,
  BrowserWindow,
  ipcMain,
  dialog,
  globalShortcut,
  Menu,
  MenuItem,
} from 'electron';
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';
import Update from './services/models/autoUpdater';

const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true });
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#303030',
    darkTheme: true,
    // title: 'H5可视化构建工具',
    // transparent: true,
    titleBarStyle: 'hidden',
    // useContentSize: true,
  });

  if (isDevelopment) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    // if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadFile('index.html');
    // win.webContents.openDevTools();
    new Update(win); // eslint-disable-line
  }

  win.on('closed', () => {
    win = null;
  });
  // win.isFullScreen();
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    await installVueDevtools();
  }
  // createWindow();

  // globalShortcut.register('CommandOrControl+Shift+L', () => {
  //   const focusWin = BrowserWindow.getFocusedWindow();
  //   focusWin && focusWin.webContents.openDevTools();
  // });

  const template = [
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        // { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' },
      ],
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        // { type: 'separator' },
        {
          label: 'Toggle Developer Tools',
          accelerator: (() => {
            if (process.platform === 'darwin') {
              return 'Alt+Command+I';
            }
            return 'Ctrl+Shift+I';
          })(),
          click: (item, focusedWindow) => {
            if (focusedWindow) {
              focusedWindow.toggleDevTools();
            }
          },
        },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        // { type: 'separator' },
        { role: 'togglefullscreen' },
      ],
    },
    {
      role: 'window',
      submenu: [{ role: 'minimize' }, { role: 'close' }],
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click() {
            // require('electron').shell.openExternal('https://electronjs.org');
          },
        },
      ],
    },
  ];

  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: 'about' },
        // { type: 'separator' },
        { role: 'services' },
        // { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        // { type: 'separator' },
        { role: 'quit' },
      ],
    });
    // Window menu
    template[3].submenu = [
      { role: 'close' },
      { role: 'minimize' },
      { role: 'zoom' },
      // { type: 'separator' },
      { role: 'front' },
    ];
  }

  const menu = Menu.buildFromTemplate(template);

  // new Menu().append(
  //   new MenuItem({
  //     label: '开发工具',
  //     accelerator: 'CmdOrCtrl+P',
  //     click: () => {
  //       const focusWin = BrowserWindow.getFocusedWindow();
  //       focusWin && focusWin.webContents.openDevTools();
  //     },
  //   }),
  // );

  Menu.setApplicationMenu(menu);
  createWindow();
});
app.on('will-quit', () => {
  // 清空所有快捷键
  globalShortcut.unregisterAll();
});
ipcMain.on('open-directory-dialog', (event) => {
  dialog.showOpenDialog(
    {
      properties: ['openDirectory'],
    },
    (files) => {
      if (files) {
        event.sender.send('selected-directory', files);
      }
    },
  );
});

ipcMain.on('open-image-dialog', (event) => {
  dialog.showOpenDialog(
    {
      title: '选择图片',
      filters: [{ name: '图片', extensions: ['jpg', 'jpge', 'png'] }],
      properties: ['openFile'],
    },
    (files) => {
      if (files) {
        event.sender.send('selected-image', files[0]);
      }
    },
  );
});

ipcMain.on('load:project', () => {
  dialog.showOpenDialog(
    {
      filters: [{ name: '页面配置', extensions: ['json'] }],
      properties: ['openFile'],
    },
    (paths) => {
      win.webContents.send('load:project', paths);
    },
  );
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}
