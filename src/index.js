const path = require('path');
const fs = require('fs');
const gm = require('gm');
const { ipcMain } = require('electron')

// SELECTABLE FUNCTIONS
async function runRotate(image, degrees) {
    console.log(`Node.js: attempting Rotate of ${degrees}`);
    let filename = path.basename(image); // img.png
    const og = filename;
    if (filename.search('(live)') == -1) filename = '(live)_' + filename;
    const filepath = path.dirname(image); // the/path/tp/image/
    const new_filepath = path.resolve(filename);
    console.log(`old_filepath: ${image}`);
    console.log(`filename: ${filename}`);
    // console.log(`new_filename: ${new_filename}`);
    console.log(`new_filepath: ${new_filepath}`);
    // gm(image).rotate("#545651", degrees).write(new_filepath, function (err) {
    // console.log(`./${og} -distort SRT ${degrees} ./${filename}`)
    gm().command(`convert ./${og} -distort SRT ${degrees} ./${filename}`).write(new_filepath, function (err) {
        if (err) return handle(err);
        console.log('Created an image from a Buffer!');
    });

    return new_filepath;
}

function runScale() {
    console.log('in scale');
}


// EXPOSE FUNCTIONS TO FRONTEND
// ipcMain.on('runRotate', runRotate);
ipcMain.handle('runRotate', async (event, args) => {
    const result = await runRotate(args[0], args[1]);
    return result;
});




// console.log(path.resolve(__dirname + '/imgs/maxresdefault.jpg'));
// gm(path.resolve(__dirname + '/imgs/maxresdefault.jpg'))
// .identify(function (err, data) {
//   if (!err) console.log(data)
//   else console.log(err)
// });

// const Magick = require('./wasm-imagemagick')
// console.log(Magick)
var IS_LOCAL = true; // for Electron deployment

// export function testPrint() {
//   console.log('printed from index.js')
// }

try {
    console.log(gm(path.resolve(__dirname + '/imgs/maxresdefault.jpg'))
        .rotate("90"));
    console.log("rotated 90 degrees in index.js")
} catch (err) {
    console.log(err);
}

// Output all available image properties
// try {

//   // Constants
//   const path = '/Users/Bodey/vscode-gonzey/electron/sandbox/src/';
//   const name = 'justinbieber.jpg'
//   const img = path + name; // Hard-coded local value for debugging


//   // 1) Take in an image and extract all information possible from it (including EXIF)
//   gm(img)
//     .identify(function (err, data) { // Get image information
//       if (!err) {
//         console.log(data)
//       }
//     });


//   // 2) Resize and image to a specific height or width (keeps aspect ratio) and remove all EXIF data
//   var width = 240;
//   var height = 240;
//   gm(img)
//     .resize(width, height) // Resize Image (add '!' as 3rd to force aspect ratio)
//     .noProfile() // Remove EXIF profile data
//     .write(path + `resized_example${width}x${height}.jpg`, function (err) {
//       if (!err) console.log('Image resized and saved');
//     });


//   // 3) add edge
//   var edge = 3;
//   gm(img)
//     .edge(edge)
//     .write(path + name + `${edge} edge.jpg`, function (err) {
//       if (!err) console.log('photo edged');
//     })


//   // 4) creates new image
//   gm(200, 400, "#ddff99f3")
//     .drawText(10, 50, "from scratch")
//     .write(path + "brandNewImg.jpg", function (err) {
//       // ...
//     });

// } catch (err) {
//   console.log(err);
// }


if (IS_LOCAL) var { app, BrowserWindow } = require('electron');


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (IS_LOCAL) if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}


if (IS_LOCAL) var createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });


    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, 'index.html'));
// mainWindow.webContents.send('gm', gm);
    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
if (IS_LOCAL) app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
if (IS_LOCAL) app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

if (IS_LOCAL) app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
