import Camera3D from "./camera3d.js";
import KeyboardAdapter from "./keyboardAdapter.js";

export default class Camera3DController {
    _camera3D;

    /**
     * This objects configures the required keyboard event listeners to controll the camera
     * @param {Camera3D} camera3D 
     * @param {KeyboardAdapter} keyboardAdapter 
     */
    constructor(camera3D, keyboardAdapter) {
        this._camera3D = camera3D;

        this.bindKeyboardListeners(keyboardAdapter);
    }

    /**
     * Binds key listeners to actions
     * 
     * @param {KeyboardAdapter} keyboardAdapter 
     */
    bindKeyboardListeners(keyboardAdapter) {
        keyboardAdapter.addKeyPressedListener("ArrowUp", () => this.doSlideForwards());
        keyboardAdapter.addKeyPressedListener("ArrowDown", () => this.doSlideBackwards());
        keyboardAdapter.addKeyPressedListener("ArrowLeft", () => this.doSlideLeft());
        keyboardAdapter.addKeyPressedListener("ArrowRight", () => this.doSlideRight());
        
        keyboardAdapter.addKeyPressedListener("KeyD", () => this.doRotateRight());
        keyboardAdapter.addKeyPressedListener("KeyA", () => this.doRotateLeft());
        
        keyboardAdapter.addKeyPressedListener("KeyW", () => this.doTiltUp());
        keyboardAdapter.addKeyPressedListener("KeyS", () => this.doTiltDown());

        keyboardAdapter.addKeyPressedListener("KeyR", () => this.doSlideUp());
        keyboardAdapter.addKeyPressedListener("KeyF", () => this.doSlideDown());

        keyboardAdapter.addKeyPressedListener("NumpadMultiply", () => this.doIncreaseVision());
        keyboardAdapter.addKeyPressedListener("NumpadDivide", () => this.doDecreaseVision());
    }

    doSlideForwards() {
        this._camera3D.slideForwards();
        this.refreshCamera();
    }

    doSlideBackwards() {
        this._camera3D.slideBackwards();
        this.refreshCamera();
    }

    doSlideRight() {
        this._camera3D.slideRight();
        this.refreshCamera();
    }

    doSlideLeft() {
        this._camera3D.slideLeft();
        this.refreshCamera();
    }

    doRotateRight() {
        this._camera3D.rotateRight(1);
        this.refreshCamera();
    }

    doRotateLeft() {
        this._camera3D.rotateLeft(-1);
        this.refreshCamera();
    }

    doSlideUp() {
        this._camera3D.slideUp();
        this.refreshCamera();
    }

    doSlideDown() {
        this._camera3D.slideDown();
        this.refreshCamera();
    }

    doTiltUp() {
        this._camera3D.tiltUp();
        this.refreshCamera();
    }

    doTiltDown() {
        this._camera3D.tiltDown();
        this.refreshCamera();
    }
    
    doIncreaseVision() {
        this._camera3D.increaseVision();
        this.refreshCamera();
    }

    doDecreaseVision() {
        this._camera3D.decreaseVision();
        this.refreshCamera();
    }

    refreshCamera() {
        this._camera3D.clearViewport();
        this._camera3D.drawGridFloatingFloor();
        console.log(this._camera3D);
    }
}