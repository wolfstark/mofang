module.exports = {
  // pages: {
  //   index: 'src/main.ts',
  //   MobilePreview: 'src/mobilePreview.js',
  // },
  configureWebpack: {
    // Configuration applied to all builds
    node: {
      fs: 'empty',
      module: 'empty',
    },
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        // build: {
        appId: 'com.mofang.app',
        productName: 'MoFang',
        publish: [
          {
            provider: 'generic',
            url: `${process.env.VUE_APP_SERVER_URL}/`,
          },
        ],
        mac: {
          target: 'dmg',
          artifactName: '${productName}.${ext}', //eslint-disable-line
          darkModeSupport: true,
        },
        win: {
          artifactName: '${productName}.${ext}', //eslint-disable-line
          target: [
            {
              target: 'nsis', // 我们要的目标安装包
            },
          ],
        },
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: '魔方', // 图标名称
        },
        // },
      },
    },
  },
};
