const path = require('path');
const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require("electron-updater");
const log = require('electron-log');
log.transports.file.level = "debug"
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

const isDev = process.env.NODE_ENV === "development"
const isMac = process.platform === 'darwin';

function createMainWindow () {  // 브라우저 창을 생성
    let mainWindow = new BrowserWindow({
        width: isDev ? 1400 : 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Open devtools if in dev env
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    //브라우저창이 읽어 올 파일 위치
    mainWindow.loadFile(path.join(__dirname, './index.html'))
}

app.whenReady().then(()=>{
    createMainWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (!isMac) {
        app.quit()
    }
})

/* Updater ======================================================*/

autoUpdater.on('checking-for-update', () => {
    log.info('업데이트 확인 중...');
});
autoUpdater.on('update-available', (info) => {
    log.info('업데이트가 가능합니다.');
});
autoUpdater.on('update-not-available', (info) => {
    log.info('현재 최신버전입니다.');
});
autoUpdater.on('error', (err) => {
    log.info('에러가 발생하였습니다. 에러내용 : ' + err);
});
autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "다운로드 속도: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - 현재 ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    log.info(log_message);
})
autoUpdater.on('update-downloaded', (info) => {
    log.info('업데이트가 완료되었습니다.');
});
app.on('ready', function()  {
    autoUpdater.checkForUpdatesAndNotify();
});