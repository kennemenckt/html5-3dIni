export default class Line {
    point1;
    point2;
    strokeStyle;
    constructor(strokeStyle) {
        this.strokeStyle = strokeStyle;
    }

    setPoint1(point1) {
        this.point1 = point1;
    }

    setPoint2(point2) {
        this.point2 = point2;
    }

    draw(canvasCtx) {
        canvasCtx.beginPath();
        canvasCtx.moveTo(this.point1.x, this.point1.y);
        canvasCtx.lineTo(this.point2.x, this.point2.y);
        canvasCtx.strokeStyle = this.strokeStyle;
        canvasCtx.stroke();
    }
}