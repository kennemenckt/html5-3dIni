import Camera3D from "./camera3d.js";

export default class CameraInfoRefresher {
    _camInfoValueHolder;

    constructor(camInfoValueHolder) {
        this._camInfoValueHolder = camInfoValueHolder;
    }

    refreshOnCamera(camera3D) {
        var position = `Position(${camera3D.position.x.toFixed(2)}, ${camera3D.position.y.toFixed(2)}, ${camera3D.position.z.toFixed(2)})`;
        var angles = `Vision(${camera3D.visionAngle.toFixed(2)}) Orientation(${camera3D.orientationAngle.toFixed(2)}) Tilt(${camera3D.tiltAngle.toFixed(2)})`
        
        this._camInfoValueHolder.value = `${position} ${angles}`;
    }
}