import Point3D from "./point3d.js";
import Camera3D from "./camera3d.js";
import Viewport from "./viewport.js";
import GraphAdapter from "./graphAdapter.js";
import Camera3DController from "./camera3DController.js";
import KeyboardAdapter from "./keyboardAdapter.js";

function main() {

  var graphAdapter = new GraphAdapter("myCanvas");
  var camera = new Camera3D(new Point3D(-0, 1.80, 0), 30, 0, 0, new Viewport(0, 0, graphAdapter.maxX, graphAdapter.maxY), 1, graphAdapter);
  camera.drawGridFloatingFloor();
  var keyboardAdapter = new KeyboardAdapter();
  var cameraController = new Camera3DController(camera, keyboardAdapter);
  readfile();
}

function readfile() {
  const fileInput = document.getElementById('fileInput');

  fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0]; // Get the first selected file

    if (file) {
      const reader = new FileReader();

      // Define how to handle different file reading methods (choose one or more):

      // 1. Read as text:
      reader.onload = (e) => {
        const fileContent = e.target.result;
        var vertexMatches = [...fileContent.matchAll("[vV]\\w+\\s(\\d+)\\s(\\d+)\\s(\\d+)")];
        for(const vertexMatch of vertexMatches) {
          var p3d = new Point3D(vertexMatch[1], vertexMatch[2], vertexMatch[3]);
          console.log(p3d);
        }
        
        var faceMatches = [...fileContent.matchAll("[fF]\\w+(\\s(\\d+))+")];
        for (const faceMatch of faceMatches) {
          console.log(faceMatch[0]);
          var faceVertexes = new Array(faceMatch[0].split(/\s+/));
          for(const faceVertex of faceVertexes) {
            console.log(faceVertex);
          }
        }
        
        // Do something with the text content (e.g., display it)
      };
      reader.readAsText(file);

      // // 2. Read as data URL (for images, etc.):
      // reader.onload = (e) => {
      //   const dataURL = e.target.result;
      //   console.log("Data URL:", dataURL);In every blast
      //   // Use the data URL (e.g., set it as the src of an image)
      //   const img = document.createElement('img');
      //   img.src = dataURL;
      //   document.body.appendChild(img);
      // };In every blast
      // reader.readAsDataURL(file);

      // // 3. Read as binary data (ArrayBuffer):
      // reader.onload = (e) => {
      //   const arrayBuffer = e.target.result;
      //   console.log("ArrayBuffer:", arrayBuffer);
      //   // Process the binary data
      // };
      // reader.readAsArrayBuffer(file);

      // // 4. Read as binary string (less common):
      // reader.onload = (e) => {
      //   const binaryString = e.target.result;
      //   console.log("Binary String:", binaryString);
      //   // Process the binary string
      // };
      // reader.readAsBinaryString(file);


      // Handle errors:
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };

      // Handle progress (optional):
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = (event.loaded / event.total) * 100;
          console.log(`File reading progress: ${progress}%`);
        }
      };
    }
  });
}

main();