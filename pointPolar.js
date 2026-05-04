import Point2D from "./point2d.js";

/**
* This class represents a point in the polar coordinate system
*/
export default class PointPolar {
    _r;
    _teta;

    get r() {
        return this._r;
    }
    set r(value) {
        this._r = value;
    }

    get teta() {
        return this._teta;
    }
    set teta(value) {
        this._teta = value;
    }

    /**
     * Converts a rectangular coordinate to a polar coordinate
     * @param {Point2D} point2d Point in the rectangular coordinate system
     */
    convertFromPoint2D(point2d) {
        if (point2d.x == 0 && point2d.y == 0)
            this._teta = 0;
        else
            this._teta = Math.atan2(point2d.x,point2d.y);
        this._r = Math.sqrt(point2d.y * point2d.y + point2d.x * point2d.x);
    }
}