import { app, BrowserWindow } from "electron";

let window;

app.on("ready", () => {
  window = new BrowserWindow({
    darkTheme: true,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  window.loadFile("../../public/index.html");
});
