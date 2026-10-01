/**
 * 716QX Lounge OS 3.5 — Apex Edition
 * Standalone Desktop Kiosk & POS Hardware Controller (Electron)
 * Zero-Distraction Cashier Shell | Thermal Printer Integration
 */

const { app, BrowserWindow, Menu, globalShortcut } = require('electron');
const path = require('path');

let mainWindow = null;

function createKioskWindow() {
    mainWindow = new BrowserWindow({
        width: 1440,
        height: 900,
        minWidth: 1024,
        minHeight: 700,
        backgroundColor: '#030307',
        frame: false,
        fullscreen: false,
        kiosk: process.argv.includes('--kiosk'),
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
            preload: path.join(__dirname, 'security.js')
        }
    });

    Menu.setApplicationMenu(null);

    mainWindow.loadFile(path.join(__dirname, 'index.html'));

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // POS Window Hotkeys
    globalShortcut.register('F11', () => {
        if (mainWindow) {
            mainWindow.setFullScreen(!mainWindow.isFullScreen());
        }
    });

    globalShortcut.register('CommandOrControl+R', () => {
        // Prevent accidental cash register reload
        return false;
    });
}

app.whenReady().then(() => {
    createKioskWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createKioskWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});
