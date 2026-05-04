export default class Viewport {
    _minx;
    _miny;
    _maxx;
    _maxy;

    /**
     * This class represents a viewport in the canvas
     * @param {double} minx 
     * @param {double} miny 
     * @param {double} maxx 
     * @param {double} maxy 
     */
    constructor(minx, miny, maxx, maxy) {
        this._minx = minx;
        this._miny = miny;
        this._maxx = maxx;
        this._maxy = maxy;
    }

    get minx() {
        return this._minx;
    }
    set minx(value) {
        this._minx = value;
    }

    get miny() {
        return this._miny;
    }
    set miny(value) {
        this._miny = value;
    }

    get maxx() {
        return this._maxx;
    }
    set maxx(value) {
        this._maxx = value;
    }

    get maxy() {
        return this._maxy;
    }
    set maxy(value) {
        this._maxy = value;
    }
}