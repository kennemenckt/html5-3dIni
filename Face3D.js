export default class Face3D {
    _vertexIndexes;
    _vertexes;

    set vertexIndexes(value) {
        this._vertexIndexes = value;
    }
    get vertexIndexes() {
        return this._vertexIndexes;
    }

    set vertexes(value) {
        this._vertexes = value;
    }
    get vertexes() {
        return this._vertexes;
    }

    addVertex(vertexIndex, vertex) {
        if(!this._vertexIndexes) {
            this.vertexIndexes = [];
        }
        if(!this._vertexes) {
            this._vertexes = [];
        }
        this._vertexes.push(vertex);
        this._vertexIndexes.push(vertexIndex);
    }
}