const { app, BrowserWindow, Menu } = require('electron')


let win

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('src/display/index.html')



    win.on('closed', () => {
        win = null
    })


    var menu = Menu.buildFromTemplate([{
        label: 'Menu',
        submenu: [
            {
                label: 'Create Doc',
                onclick() {
                    //EDIT TO CREATE DOC
                }

            },
            {
                label: 'Browse Doc',
                click() {
                    //  EDIT TO BROWSE DOCS
                }
            },
            {
                label: 'Exit',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'Settings',
        submenu: [
            {
                label: 'Connection Settings'
            },
            {
                label: 'About'
            },
        ]
    }

    ])
    Menu.setApplicationMenu(menu);


}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
