import Point2D from "./point2d.js";
import PointPolar from "./pointPolar.js"

export default class Point3D {
    _x;
    _y;
    _z;
    /**
     * This class represents a 3D point in the rectangular coordinate system
     * @param {double} x X position
     * @param {double} y Y position
     * @param {double} z Z position
     */
    constructor(x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;
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

    get z() {
        return this._z;
    }
    set z(value) {
        this._z = value;
    }

    rotateXZ(rotation) {
        var point2d = new Point2D(this._x, this._z);
        var polar = new PointPolar();
        polar.convertFromPoint2D(point2d);
        polar.teta += rotation;
        point2d.convertFromPointPolar(polar);
        this._x = point2d.x;
        this._z = point2d.y;
    }

    rotateYZ(rotation)
    {
        var point2d = new Point2D(this._z, this._y);
        var polar = new PointPolar();
        polar.convertFromPoint2D(point2d);
        polar.teta += rotation;
        point2d.convertFromPointPolar(polar);
        this._z = point2d.x;
        this._y = point2d.y;
    }

    translate(anotherPoint) {
        this._x -= anotherPoint.x;
        this._y -= anotherPoint.y;
        this._z -= anotherPoint.z;
    }

    copy(p3d) {
        this._x = p3d.x;
        this._y = p3d.y;
        this._z = p3d.z;
    }
}