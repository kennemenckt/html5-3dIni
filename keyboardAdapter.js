export default class KeyboardAdapter {
    listenersMap;
    pressedKeys;

    constructor() {
        this.listenersMap = new Map();
        this.pressedKeys = new Set();
        
        document.addEventListener('keydown', (event) => {
            this.pressedKeys.add(event.code);
        });

        document.addEventListener('keyup', (event) => {
            this.pressedKeys.delete(event.code);
        })
    }

    keyPressedHandler(keyCode) {
        var listeners = this.listenersMap.get(keyCode);
        if (listeners != undefined) {
            for (const listener of listeners) {
                listener();
            }
        }
    }

    keyPressedDetector() {
        for(const keyCode of this.pressedKeys) {
            var listeners = this.listenersMap.get(keyCode);
            if (listeners != undefined) {
                for (const listener of listeners) {
                    listener();
                }
            }
        }
    }

    addKeyPressedListener(keyCode, listenerFunction) {
        var listeners = this.listenersMap.get(keyCode);
        if (listeners == undefined) {
            listeners = new Array();
        }
        listeners.push(listenerFunction);
        this.listenersMap.set(keyCode, listeners);
    }
}