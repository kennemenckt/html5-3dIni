import Camera3D from "./camera3d.js";
import KeyboardAdapter from "./keyboardAdapter.js";

/**
 * This class provides a mechanism to control a camera
 * using the keyboard predefined mappings
 */
export default class Camera3DController {
    _camera3D;
    _refreshingCamera;
    /**
     * Set of listeners that will be executed when
     * the refreshCamera method is executed
     */
    _refreshListeners = new Set();

    /**
     * This objects configures the required keyboard event listeners to controll the camera
     * @param {Camera3D} camera3D 
     * @param {KeyboardAdapter} keyboardAdapter 
     */
    constructor(camera3D, keyboardAdapter) {
        this._camera3D = camera3D;
        this._refreshingCamera = false;

        this.bindKeyboardListeners(keyboardAdapter);
    }

    /**
     * Binds key listeners to actions to perform the camera movements
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
    }

    doSlideBackwards() {
        this._camera3D.slideBackwards();
    }

    doSlideRight() {
        this._camera3D.slideRight();
    }

    doSlideLeft() {
        this._camera3D.slideLeft();
    }

    doRotateRight() {
        this._camera3D.rotateRight(1);
    }

    doRotateLeft() {
        this._camera3D.rotateLeft(-1);
    }

    doSlideUp() {
        this._camera3D.slideUp();
    }

    doSlideDown() {
        this._camera3D.slideDown();
    }

    doTiltUp() {
        this._camera3D.tiltUp();
    }

    doTiltDown() {
        this._camera3D.tiltDown();
    }
    
    doIncreaseVision() {
        this._camera3D.increaseVision();
    }

    doDecreaseVision() {
        this._camera3D.decreaseVision();
    }

    refreshCamera() {
        if (this._refreshingCamera) {
            return;
        }
        this._refreshingCamera = true;
        
        this._camera3D.clearViewport();
        this._camera3D.drawGridFloatingFloor();
        console.log(this._camera3D);
        for(const refreshListener of this._refreshListeners) {
            refreshListener.refreshOnCamera(this._camera3D);
        }

        this._refreshingCamera = false;
    }

    addRefreshListener(refreshListener) {
        this._refreshListeners.add(refreshListener);
    }
}