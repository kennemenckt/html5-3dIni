export default class Face3D {
    _vertexIndexes;
    _vertexes;

    set vertexIndexes(value) {
        this._vertexIndexes = value;
    }
    get vertexIndexes() {
        return this.vertexIndexes;
    }

    set vertexes(value) {
        this._vertexes = value;
    }
    get vertexes() {
        return this._vertexes;
    }
}