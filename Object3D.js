import Face3D from "./Face3D.js";
import Point3D from "./point3d.js";
import Camera3D from "./camera3d.js";

export default class Object3D {
    _allVertexes;
    _faces;

    get allVertexes() {
        return this._allVertexes;
    }
    set allVertexes(value) {
        this._allVertexes = value;
    }

    get faces() {
        return this._faces
    }
    set faces(value) {
        this._faces = value
    }

    refreshOnCamera(camera3D) {
        this._faces.forEach(face => {
            var vertex1, vertex2;
            for (let idx = 0; idx < face.vertexes.length - 1; idx++) {
                vertex1 = face.vertexes[idx];
                vertex2 = face.vertexes[idx + 1];
                camera3D.draw3DLine(vertex1, vertex2, "#FF0000");
            }
            camera3D.draw3DLine(vertex2, face.vertexes[0], "#FF0000");
        });
    }

    loadFromFile(file) {
        if (file) {
            this._allVertexes = [];
            this._faces = [];

            const reader = new FileReader();
    
            // Define how to handle different file reading methods (choose one or more):
    
            // 1. Read as text:
            reader.onload = (e) => {
                const fileContent = e.target.result;
                var vertexMatches = [...fileContent.matchAll("[vV]\\w*\\s(\\-*\\d+\\.*\\d*)\\s(\\-*\\d+\\.*\\d*)\\s(\\-*\\d+\\.*\\d*)")];
                for(const vertexMatch of vertexMatches) {
                    var x = parseInt(vertexMatch[1]);
                    var y = parseInt(vertexMatch[2]);
                    var z = parseInt(vertexMatch[3])
                    var p3d = new Point3D(x, y, z);
                    this._allVertexes.push(p3d);
                }
                
                var faceMatches = [...fileContent.matchAll("[fF]\\w*(\\s(\\d+))+")];
                for (const faceMatch of faceMatches) {
                    var face = new Face3D();
                    var faceVertexes = faceMatch[0].split(/\s+/);
                    for (let idx = 1; idx < faceVertexes.length; idx++) {
                        var vertexIndex = parseInt(faceVertexes[idx]);
                        face.addVertex(vertexIndex, this._allVertexes[vertexIndex - 1]);
                    }
                    this._faces.push(face);
                }
                console.log(this);
            };

            reader.readAsText(file);
        
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
    }
}		