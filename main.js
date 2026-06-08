import Point3D from "./point3d.js";
import Camera3D from "./camera3d.js";
import Viewport from "./viewport.js";
import GraphAdapter from "./graphAdapter.js";
import Camera3DController from "./camera3DController.js";
import KeyboardAdapter from "./keyboardAdapter.js";
import CameraInfoRefresher from "./cameraInfoRefresher.js";
import Object3D from "./Object3D.js";

function main() {

  var refreshRatio = 1000 / 50;
  var graphAdapter = new GraphAdapter("myCanvas");
  var camera = new Camera3D(new Point3D(-0, 1.80, 0), 30, 0, 0, new Viewport(0, 0, graphAdapter.maxX, graphAdapter.maxY), 1, graphAdapter);
  var keyboardAdapter = new KeyboardAdapter();
  var cameraController = new Camera3DController(camera, keyboardAdapter);
  var cameraInfoRefresher = new CameraInfoRefresher(document.getElementById("camInfo"));
  cameraController.addRefreshListener(cameraInfoRefresher);
  cameraController.refreshCamera();
  var objects = [];
  readfile(objects, cameraController);
  var fpsRange = document.getElementById("fps");
  var fpsLabel = document.getElementById("fpsLabel");
  fpsRange.value = 50;
  fpsLabel.textContent = `FPS: ${fpsRange.value}`;
  
  var fpsInterval = window.setInterval(() => {
    keyboardAdapter.keyPressedDetector();
    cameraController.refreshCamera();
  }, refreshRatio);
  
  fpsRange.addEventListener("change", () => {
    fpsLabel.textContent = `FPS: ${fpsRange.value}`;

    refreshRatio = 1000/fpsRange.value;
    clearInterval(fpsInterval);

    fpsInterval = window.setInterval(() => {
      keyboardAdapter.keyPressedDetector();
      cameraController.refreshCamera();
    }, refreshRatio);
  });
}

function readfile(objects, cameraController) {
  const fileInput = document.getElementById('fileInput');

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]; // Get the first selected file

    if (file) {
      var obj = new Object3D();
      obj.loadFromFile(file);
      cameraController.addRefreshListener(obj);
      cameraController.refreshCamera();
    }
  });
}

main();