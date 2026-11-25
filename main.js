const { app, BrowserWindow, ipcMain, globalShortcut, Notification } = require('electron');
const path = require('path');
let win;
function createWindow(){
  win=new BrowserWindow({width:1440,height:900,minWidth:900,minHeight:620,frame:false,transparent:true,backgroundColor:'#00000000',alwaysOnTop:true,show:false,webPreferences:{preload:path.join(__dirname,'preload.js'),contextIsolation:true,nodeIntegration:false,sandbox:true}});
  win.loadFile('index.html'); win.once('ready-to-show',()=>win.show());
  win.on('closed',()=>{win=null;});
}
app.whenReady().then(()=>{createWindow();globalShortcut.register('Control+Shift+X',()=>{if(win)win.webContents.send('shortcut:clickthrough');});});
app.on('will-quit',()=>globalShortcut.unregisterAll());
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit();});
ipcMain.on('window:minimize',()=>win?.minimize());
ipcMain.on('window:maximize',()=>win&&(win.isMaximized()?win.unmaximize():win.maximize()));
ipcMain.on('window:close',()=>win?.close());
ipcMain.on('window:top',(e,value)=>win?.setAlwaysOnTop(!!value,'screen-saver'));
ipcMain.on('window:clickthrough',(e,value)=>win?.setIgnoreMouseEvents(!!value,{forward:true}));
ipcMain.on('window:opacity',(e,value)=>win?.setOpacity(Math.min(1,Math.max(.35,Number(value)||1))));
ipcMain.on('notification',(e,{title,body})=>{if(Notification.isSupported())new Notification({title,body}).show();});
