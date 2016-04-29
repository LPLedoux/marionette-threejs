var LineDrawable = m3js.LineDrawable = Backbone.Model.extend({

  defaults: {
    type: 'lineDrawable',
    matrix: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  },

  _mesh: undefined,
  _material: undefined,
  _geometry: undefined,

  initLineDrawable: function() {
    var _this = this;

    var _loaded = function() {
      if (_this.collection !== undefined) {
        _this.collection.trigger('lineDrawable:loaded', _this);
      }
      _this.trigger('lineDrawable:loaded', _this);

      _this.on('change:matrix', function() {
        _this.updateMesh();
      });
      _this.updateMesh();
    };

    if (THREE.hasOwnProperty(this.get('lineType'))) {
      this._geometry = this.get('geometry');
      this._material = this.get('material');

      this._mesh = new THREE.Line(this._geometry, this._material, THREE[this.get('lineType')]);
      _loaded();
    }
    else {
      console.warn('LineDrawable: no compatible line type');
    }
  },

  updateMesh: function() {
    this._mesh.matrix.set.apply(this._mesh.matrix, this.get('matrix'));
    this._mesh.matrix.decompose(this._mesh.position, this._mesh.quaternion, this._mesh.scale);
  },

  getGeometry: function() {
    return this._geometry;
  },

  getMaterial: function() {
    return this._material;
  },

  getMesh: function() {
    return this._mesh;
  },

  initialize: function(options) {
    this.initLineDrawable();
  }
});
