import { autoUpdater } from 'electron-updater';
import { ipcMain, ipcRenderer, shell } from 'electron';

/**
 * -1 检查更新失败 0 正在检查更新 1 检测到新版本，准备下载 2 未检测到新版本 3 下载中 4 下载暂停 5 下载暂停恢复 6 下载完成 7 下载失败 8 取消下载
 * */
class Update {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
    this.message = {
      error: '检查更新出错',
      checking: '正在检查更新……',
      updateAva: '检测到新版本，前往下载',
      updateNotAva: '现在使用的就是最新版本，不用更新',
    };
    autoUpdater.setFeedURL(`${process.env.VUE_APP_SERVER_URL}/`); // 更新地址与package.json中的build.publish.url相对应

    /**
     * 根据自身需求选择下方方法
     */
    this.error();
    this.start();
    this.allow();
    this.unallowed();
    // this.listen();
    // this.download();
    Update.load();
  }

  Message(data) {
    this.mainWindow.webContents.send('updateMessage', data);
  }

  error() { // 当更新发生错误的时候触发。
    autoUpdater.on('error', (err) => {
      this.Message(this.message.error);
    });
  }

  start() { // 当开始检查更新的时候触发
    autoUpdater.on('checking-for-update', (event, arg) => {
      this.Message(this.message.checking);
      shell.openExternal(process.env.VUE_APP_SERVER_URL);
    });
  }

  allow() { // 发现可更新数据时
    autoUpdater.on('update-available', (event, arg) => {
      this.Message(this.message.updateAva);
    });
  }

  unallowed() { // 没有可更新数据时
    autoUpdater.on('update-not-available', (event, arg) => {
      this.Message(this.message.updateNotAva);
    });
  }

  // listen() { // 下载监听
  //   autoUpdater.on('download-progress', (progressObj) => {
  //     this.mainWindow.webContents.send('downloadProgress', progressObj);
  //   });
  // }

  // download() { // 下载完成
  //   autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateUrl,
  //     quitAndUpdate) => {
  //     // this.Message(6);
  //     // setTimeout((m) => {
  //     //   autoUpdater.quitAndInstall();
  //     // }, 1000);
  //     this.Message('下载完成');
  //     this.Message('开始安装');
  //     // autoUpdater.quitAndInstall();

  //     ipcMain.on('isUpdateNow', (e, arg) => {
  //       // console.log(arguments);
  //       console.log('开始更新');
  //       // some code here to handle event
  //       autoUpdater.quitAndInstall();
  //     });

  //     this.mainWindow.webContents.send('isUpdateNow');
  //   });
  // }

  static load() { // 触发器
    ipcMain.on('checkForUpdate', () => {
      // this.Message('检查更新');
      // 执行自动更新检查
      autoUpdater.checkForUpdates();
    });
  }


  // removelisteners() {

  // }
}
export default Update;
