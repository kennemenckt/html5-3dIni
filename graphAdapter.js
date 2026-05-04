export default class GraphAdapter {
    _canvasContext;
    _maxX;
    _maxY;

    get maxX() {
        return this._maxX;
    }
    get maxY() {
        return this._maxY;
    }

    constructor(canvasId, fullWindow) {
        const canvas = document.getElementById(canvasId);
        if (fullWindow == true) {
            canvas.width  = window.innerWidth * 0.98;
            canvas.height = window.innerHeight * 0.95;
        }
        this._maxX = canvas.width;
        this._maxY = canvas.height
        this._canvasContext = canvas.getContext("2d");
    }

    drawPoint(x, y, pointStyle) {
        this._canvasContext.fillStyle = pointStyle;
        this._canvasContext.fillRect(x, y, 1, 1);
    }
    drawLine(x1, y1, x2, y2, lineStyle) {
        this._canvasContext.beginPath();
        this._canvasContext.moveTo(x1, y1);
        this._canvasContext.lineTo(x2, y2);
        this._canvasContext.strokeStyle = lineStyle;
        this._canvasContext.stroke()
    }
    drawSolidRectangle(x1, y1, width, height, fillStyle) {
        this._canvasContext.fillStyle = fillStyle;
        this._canvasContext.fillRect(x1, y1, width, height);
    }
    getImageData(x1, y1, x2, y2) {
        return this._canvasContext.getImageData(x1, y1, x2, y2);
    }
    putImageData(imageData, x, y) {
        this._canvasContext.putImageData(imageData, x, y);
    }
    clearCanvas() {
        this._canvasContext.clearRect(0, 0, this._maxX, this._maxY);
    }
    clearArea(x1, y1, x2, y2) {
        this._canvasContext.clearRect(x1, y1, x2, y2);
    }
}