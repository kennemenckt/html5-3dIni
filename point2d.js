export default class Point2D {
    _x;
    _y;

    /**
     * This class represents a point in the 2D rectangular coordinate system
     * @param {double} x X position
     * @param {double} y Y position
     */
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }

    /**
     * Converts a polar coordinate into a rectangular coordinate
     * @param {PointPolar} pointPolar Point in the polar coordinate system
     */
    convertFromPointPolar(pointPolar) {
        this._x=pointPolar.r * Math.sin(pointPolar.teta);
	    this._y=pointPolar.r * Math.cos(pointPolar.teta);
    }
}