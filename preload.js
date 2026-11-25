const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('overlayAPI',{
  minimize:()=>ipcRenderer.send('window:minimize'), maximize:()=>ipcRenderer.send('window:maximize'), close:()=>ipcRenderer.send('window:close'),
  alwaysOnTop:v=>ipcRenderer.send('window:top',v), clickThrough:v=>ipcRenderer.send('window:clickthrough',v), opacity:v=>ipcRenderer.send('window:opacity',v),
  notify:data=>ipcRenderer.send('notification',data), onClickThrough:fn=>ipcRenderer.on('shortcut:clickthrough',fn)
});
