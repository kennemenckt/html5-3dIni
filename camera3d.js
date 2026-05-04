import Point3D from "./point3d.js";
import Point2D from "./point2d.js";
import GraphAdapter from "./graphAdapter.js";

export default class Camera3D {
    _position;
    _visionAngle;
    _orientationAngle;
    _tiltAngle;
    _viewport;
    _movementSpeed;
    _graphAdapter;
    _rad;

    /**
     * This object represents a camera inside the 3D world
     * 
     * @param {Point3D} position Position of the camera inside the 3D world
     * @param {double} visionAngle The vision angle capabalities of the camera
     * @param {double} orientationAngle The orientation angle of the camera (rotation over x,z plane)
     * @param {double} tiltAngle The tilt angle of the camera (roation over x,y plane)
     * @param {Viewport} viewport The viewport of the camera within the canvas
     * @param {GraphAdapter} graphAdapter The graphics adapter to perform drawing operations
     */
    constructor(position, visionAngle, orientationAngle, tiltAngle, viewport, movementSpeed, graphAdapter) {
        this._rad = 180 / Math.PI;
        this._position = position;
        this._visionAngle = visionAngle / this._rad;
        this._orientationAngle = orientationAngle / this._rad;
        this._tiltAngle = tiltAngle / this._rad;
        this._viewport = viewport;
        this._movementSpeed = movementSpeed;
        this._graphAdapter = graphAdapter;
    }

    get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
    }

    get visionAngle() {
        return this._visionAngle;
    }
    set visionAngle(value) {
        this._visionAngle = value;
    }

    get orientationAngle() {
        return this._orientationAngle;
    }
    set orientationAngle(value) {
        this._orientationAngle = value;
    }

    get tiltAngle() {
        return this._tiltAngle;
    }
    set tiltAngle(value) {
        this._tiltAngle = value;
    }

    get viewport() {
        return this._viewport;
    }
    set viewport(value) {
        this._viewport = value;
    }

    get movementSpeed() {
        return this._movementSpeed;
    }
    set movementSpeed(value) {
        this._movementSpeed = value;
    }

    get graphAdapter() {
        return this._graphAdapter;
    }
    set graphAdapter(value) {
        this._graphAdapter = value;
    }

    /**
     * Transform a point in the 3D space to its projection in the 2D space
     * @param {Point3D} aux 3D Point to be transformed
     * @returns 2D point projection of the the 3D point
     */
    _3Dto2D(point3D)
    {
        var aux = new Point3D(point3D.x, point3D.y, point3D.z);
        var point2D = new Point2D(this._viewport.maxx / 2, this._viewport.maxy / 2);
        
        // Calculate the distance from the camera to the object
        aux.translate(this._position);

        // Perform camera rotations
        aux.rotateXZ(this._orientationAngle * -1);
        aux.rotateYZ(this._tiltAngle * -1)

        // Calculate TETA angle
        var teta;
        if (aux.x == 0 && aux.z == 0)
            teta = 0;
        else
            teta = Math.atan2(aux.x, aux.z);
        
        // Adjust angle to -179,180
        if (teta <= (-270) / this._rad)
            teta += 360 / this._rad;
        if (teta >= 270 / this._rad)
            teta -= 360 / this._rad;

        // Calculate PHI angle
        var phi;
        if(aux.y ==0 && aux.z == 0)
            phi = 0;
        else
            phi = Math.atan2(aux.y, aux.z);
        
        // Adjust angle to -179,180
        if(phi <= (-270) / this._rad)
            phi += 360 / this._rad;
        if(phi >= 270 / this._rad)
            phi -= 360 / this._rad;

        // Determine if the point is inside the camera vision angle
        if(teta <= -90 / this._rad || teta >= 90 / this._rad)
        {
            point2D.x = -1;
            point2D.y = -1;
            return point2D;
        }
        if(phi <= -90 / this._rad || phi >= 90 / this._rad)
        {
            point2D.x = -1;
            point2D.y =-1;
            return point2D;
        }
            
        // Calculate X and Y in terms of TETA and PHI
        var x = ((this._viewport.maxx - this._viewport.minx) / 2) * (teta / this._visionAngle);
        var y = ((this._viewport.maxy - this._viewport.miny) / 2) * (phi / this._visionAngle);
            
        // Translate the origin to the center of the screen
        point2D.x = this._viewport.minx + (this._viewport.maxx - this._viewport.minx) / 2 + x;
        point2D.y = this._viewport.miny + (this._viewport.maxy - this._viewport.miny) / 2 - y;
        return point2D;
    }

    /**
     * Draws the 2D representation of a 3D point observed by the camera
     * 
     * @param {Point3D} point3D Coordinates of the point to be drawn 
     * @param {*} color Color or style to draw the point (depends on the GraphAdapter class) 
     */
    draw3DPoint(point3D, pointStyle)
    {
        var point2D = this._3Dto2D(point3D);
        this._graphAdapter.drawPoint(point2D.x, point2D.y, pointStyle);
    }

    draw3DLine(p3d1, p3d2, lineStyle)
    {
        this.bresenham3D(p3d1, p3d2, lineStyle); 
    }

    /**
     * Draws a 3D line following Bresenham's algorithm
     * 
     */
    bresenham3D(p3d1, p3d2, lineStyle) {
        var dx = Math.abs(p3d2.x - p3d1.x);
        var dy = Math.abs(p3d2.y - p3d1.y);
        var dz = Math.abs(p3d2.z - p3d1.z);
        var xs;
        var ys;
        var zs;
        var previous = new Point3D();
        previous.copy(p3d1);
        var runner = new Point3D();
        runner.copy(p3d1);

        if (p3d2.x > p3d1.x) {
            xs = 1;
        } else {
            xs = -1;
        }
        if (p3d2.y > p3d1.y) {
            ys = 1;
        } else {
            ys = -1;
        }
        if (p3d2.z > p3d1.z) {
            zs = 1;
        } else {
            zs = -1;
        }

        // Driving axis is X-axis"
        if (dx >= dy && dx >= dz) {
            let p1 = 2 * dy - dx;
            let p2 = 2 * dz - dx;
            while (runner.x != p3d2.x) {
                runner.x += xs;
                if (p1 >= 0) {
                    runner.y += ys;
                    p1 -= 2 * dx;
                }
                if (p2 >= 0) {
                    runner.z += zs;
                    p2 -= 2 * dx;
                }
                p1 += 2 * dy;
                p2 += 2 * dz;
                
                this.draw2DLine(previous, runner, lineStyle);
                previous.copy(runner);
            }

            // Driving axis is Y-axis"
        } else if (dy >= dx && dy >= dz) {
            let p1 = 2 * dx - dy;
            let p2 = 2 * dz - dy;
            while (runner.y != p3d2.y) {
                runner.y += ys;
                if (p1 >= 0) {
                    runner.x += xs;
                    p1 -= 2 * dy;
                }
                if (p2 >= 0) {
                    runner.z += zs;
                    p2 -= 2 * dy;
                }
                p1 += 2 * dx;
                p2 += 2 * dz;
                
                this.draw2DLine(previous, runner, lineStyle);
                previous.copy(runner);
            }

            // Driving axis is Z-axis"
        } else {
            let p1 = 2 * dy - dz;
            let p2 = 2 * dx - dz;
            while (runner.z != p3d2.z) {
                runner.z += zs;
                if (p1 >= 0) {
                    runner.y += ys;
                    p1 -= 2 * dz;
                }
                if (p2 >= 0) {
                    runner.x += xs;
                    p2 -= 2 * dz;
                }
                p1 += 2 * dy;
                p2 += 2 * dx;
                this.draw2DLine(previous, runner, lineStyle);
                previous.copy(runner);
            }
        }
    }

    draw2DLine(p3D_1, p3D_2, lineStyle) {
        var p2D_1 = this._3Dto2D(p3D_1);
        var p2D_2 = this._3Dto2D(p3D_2);
        if ((p2D_1.x == -1 && p2D_1.y == -1) || (p2D_2.x == -1 && p2D_2.y == -1))
            return;
        this._graphAdapter.drawLine(p2D_1.x, p2D_1.y, p2D_2.x, p2D_2.y, lineStyle);
    }

    /**
     * Draws a dotted floor at ground level at a fixed position
     */
    drawDottedFloor() {
        var floorSize = 200;
        var floorSection = floorSize / 2;
        for (var z = floorSection * -1; z <= floorSection; z+=2)
        {
            for (var x = floorSection * -1; x <= floorSection; x+=2)
            {
                var p3d = new Point3D(x, 0, z);
                this.draw3DPoint(p3d, "#000000");
            }
        }
    }

    /**
     * Draws a dotted floor at ground level around the camera
     */
    drawDottedFloatingFloor() {
        var floorSize = 500;
        var floorSection = floorSize / 2;
        for (var z = this._position.z - floorSection; z <= this._position.z + floorSection; z+=2)
        {
            for (var x = this._position.x - floorSection; x <= this._position.x + floorSection; x+=2)
            {
                var p3d = new Point3D(Math.fround(x), 0, Math.fround(z));
                this.draw3DPoint(p3d, "#000000");
            }
        }
    }

    /**
     * Draws a grid floor at ground level at a fixed position
     */
    drawGridFloor() {
        var floorSize = 200;
        var floorSection = floorSize / 2;
        for (var z = floorSection * -1; z <= floorSection; z+=5)
        {
            var p3d1 = new Point3D(-floorSection, 0, z);
            var p3d2 = new Point3D(floorSection, 0, z);
            this.draw3DLine(p3d1, p3d2, "#000000");
        }
        for (var x = floorSection * -1; x <= floorSection; x+=5)
        {
            var p3d1 = new Point3D(x, 0, -floorSection) ;
            var p3d2 = new Point3D(x, 0, floorSection);
            this.draw3DLine(p3d1, p3d2, "#000000");
        }
    }

    /**
     * Draws a grid floor at ground level around the camera
     */
    drawGridFloatingFloor() {
        var floorSize = 200;
        var floorSection = floorSize / 2;
        var gridSize = 5;
        var zAbsolute = Math.trunc(this._position._z / gridSize) * gridSize;
        var xAbsolute = Math.trunc(this._position._x / gridSize) * gridSize;
        for (var z = zAbsolute - floorSection; z <= zAbsolute + floorSection; z += gridSize)
        {
            var p3d1 = new Point3D(xAbsolute - floorSection, 0, z);
            var p3d2 = new Point3D(xAbsolute + floorSection, 0, z);
            this.draw3DLine(p3d1, p3d2, "#000000");
        }
        for (var x = xAbsolute - floorSection; x <= xAbsolute + floorSection; x += gridSize)
        {
            var p3d1 = new Point3D(x, 0, zAbsolute - floorSection) ;
            var p3d2 = new Point3D(x, 0, zAbsolute + floorSection);
            this.draw3DLine(p3d1, p3d2, "#000000");
        }
    }

    /**
     * Clears the viewport of the camera in the canvas to prepare it for redrawing
     */
    clearViewport() {
        this._graphAdapter.clearArea(this._viewport.minx, this._viewport.miny, this._viewport.maxx, this._viewport.maxy)
    }

    rotateLeft() {
        this.rotate(-1 * this._movementSpeed);
    }

    rotateRight() {
        this.rotate(this._movementSpeed);
    }

    rotate(angle)
    {
        // if (this._tiltAngle < -90 / this._rad || this._tiltAngle > 90 / this._rad)
        //     this._orientationAngle -= this._movementSpeed / this._rad;
        // else
        //     this._orientationAngle += this.movementSpeed / this._rad;
        
        this._orientationAngle += (angle / this._rad);
        
        if (this._orientationAngle < (-179) / this._rad)
            this._orientationAngle += (360 / this._rad);
        else if (this._orientationAngle > 179 / this._rad)
            this._orientationAngle -= (360 / this._rad);
    }

    tiltDown() {
        this.tilt(this._movementSpeed);
    }

    tiltUp() {
        this.tilt(-1 * this._movementSpeed);
    }
    
    tilt(angle)
    {
        this._tiltAngle += (angle / this._rad);
        if (this._tiltAngle < (-179) / this._rad)
            this._tiltAngle += 360 / this._rad;
        else if (this._tiltAngle > 179 / this._rad)
            this._tiltAngle -= 360 / this._rad;
    }

    /**
     * Move the camera forward only horizontally (xz plane)
     */
    slideForwards() {
        this._position.x += this._movementSpeed * Math.sin(this._orientationAngle);
	    this._position.z += this._movementSpeed * Math.cos(this._orientationAngle);
    }

    /**
     * Move the camera backward only horizontally (xz plane)
     */
    slideBackwards() {
        this._position.x -= this._movementSpeed * Math.sin(this._orientationAngle);
	    this._position.z -= this._movementSpeed * Math.cos(this._orientationAngle);
    }

    slideSides(speed) {
        this._position.x += speed * Math.sin(this._orientationAngle + 90 / this._rad);
	    this._position.z += speed * Math.cos(this._orientationAngle + 90 / this._rad);
    }

    /**
     * Slide the camera to the right only horizontally (xz plane)
     */
    slideRight() {
        this.slideSides(this._movementSpeed);
    }

    /**
     * Slide the camera to the left only horizontally (xz plane)
     */
    slideLeft() {
        this.slideSides(-1 * this._movementSpeed)
    }

    slideUp() {
        this._position._y += this._movementSpeed;
    }

    slideDown() {
        this._position._y -= this._movementSpeed;
    }

    increaseVision() {
        this._visionAngle+= (5/this._rad);
    }

    decreaseVision() {
        this._visionAngle-= (5/this._rad);
    }
}