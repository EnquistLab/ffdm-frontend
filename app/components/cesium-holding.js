import Ember from 'ember';
/* global Cesium */
export default Ember.Component.extend({

  didInsertElement: function() {
    var CESIUM_BASE_URL = '.';
    var cesiumController = this.get('controller'); 
    var proxy = cesiumController.get('proxy');
    var rcp = cesiumController.get('rcp');
    var species = cesiumController.get('species');
       
    var imageryLayers = cesiumController.get('imageryLayers');
    var imageryViewModels = cesiumController.get('imageryViewModels');
    
    Cesium.BingMapsApi.defaultKey = 'AslSxct_WT1tBMfBnXE7Haqq3rosfoymosE84z64f5FO7RMjEez3fFWw5HU0WLJ-'; 
    terrainViewModels = [];


    var viewer = new Cesium.Viewer('cesiumContainer', {
      
         
      animation: false, 
      
      imageryProviderViewModels: imageryViewModels,
      timeline: false,
      sceneModePicker: false,
      

    });
    viewer.clock.onTick.addEventListener(function(clock) {
      var camera = viewer.camera;
    });
    var scene = viewer.scene;
    var globe = scene.globe;
    cesiumController.set('viewer', viewer);
    //set the imagery layers for controller
    imageryLayers = globe.imageryLayers; 
    cesiumController.set('imageryLayers', imageryLayers);
    console.log(cesiumController.get('viewer')); 

/*
    Create an event handler for onclick events
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function(cursor) {
      console.log(cursor.position);
      var pickedObject = scene.pick(cursor.position);
      console.log(pickedObject);
      if (Cesium.defined(pickedObject)) {
        var id = Cesium.defaultValue(pickedObject.id, pickedObject.primitive.id);
        if (id instanceof Cesium.Entity) {
          console.log(id.name);
        }
      } else {
        console.log("No entity here");
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
 */

     
    this.initCB();
  },

  initCB: function() {
    console.log('initCB has been called by CesiumView');
    var cesiumController = this.get('controller');
    cesiumController.setupLayers();
    var viewer = cesiumController.get('viewer');
    var camera = viewer.camera;
    
    //cesiumController.loadPoints();
    camera.flyTo({ 
        destination: Cesium.Cartesian3.fromDegrees(-111.100, 36.998, 5000000.0)
    });
    console.log(camera.positionCartographic);
  }

});
