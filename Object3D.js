export default class Object3D {
    _allVertexes;
    _faces;

    get allVertexes() {
        return this._allVertexes;
    }
    set allVertexes(value) {
        this._allVertexes = value;
    }

    get faces() {
        return this._faces
    }
    set faces(value) {
        this._faces = value
    }
}