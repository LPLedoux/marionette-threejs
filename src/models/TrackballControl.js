var TrackballControl = m3js.TrackballControl = Backbone.Model.extend({

  _control: undefined,

  initializeControl: function() {

    var _this = this;

    this._control = new THREE.TrackballControls(this.renderer.camera);
    this._control.damping = 0.1;
  },

  getControl: function() {
    return this._control;
  },

  disable: function() {
    this._control.enabled = false;
  },

  enable: function() {
    this._control.enabled = true;
  },

  isEnabled: function() {
    return this._control.enabled;
  },

  dispatchDOMEvent: function(e) {
    var eventMap = {
      'contextmenu': 'onContextMenu',
      'mousedown': 'onMouseDown',
      'mousewheel': 'onMouseWheel',
      'DOMMouseScroll': 'onMouseWheel',

      'touchstart': 'touchstart',
      'touchend': 'touchend',
      'touchmove': 'touchmove',

      'keydown': 'onKeyDown',
      'keyup': 'onKeyUp'

      // orbit controls dynamically attach and remove these as part of dragging
      // 'mousemove': 'onMouseMove',
      // 'mouseup': 'onMouseUp'
    };

    if (eventMap[e.type] && _.isFunction(this._control[eventMap[e.type]])) {
      this._control[eventMap[e.type]].call(this._control, e);
    }
  },

  renderer: undefined,

  initialize: function(options) {
    this.renderer = options.renderer;
    this.initializeControl();
  }
});
