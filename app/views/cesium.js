import Ember from 'ember';
/* global Cesium */
export default Ember.View.extend({

  didInsertElement: function() {

    /* modal on page load
    $(function() {
      $("#instructions").modal();
    });*/

    var webgl = this.webglDetect();
    if (webgl) {
      console.log("WebGL supported");
    } else {
      console.log("WebGL disabled or not supported");
      $("#instructions").modal();
    }

    var CESIUM_BASE_URL = '.';
    var cesiumController = this.get('controller'); 
    var proxy = cesiumController.get('proxy');
    var rcp = cesiumController.get('rcp');
    var species = cesiumController.get('species');
       
    var imageryLayers = cesiumController.get('imageryLayers');
    //var imageryViewModels = cesiumController.get('imageryViewModels');
    Cesium.BingMapsApi.defaultKey = 'AslSxct_WT1tBMfBnXE7Haqq3rosfoymosE84z64f5FO7RMjEez3fFWw5HU0WLJ-'; 

    //Define the default imagery and terrain models
    var imageryViewModels = cesiumController.createDefaultImageryViewModels(); 
    var terrainViewModels = cesiumController.createDefaultTerrainViewModels();
    
    //-- Set cesium view extend with rectangle
    //-- Can be substituted with view.camera.setView() for allowing zoom level (elevation)
    // testing testing -- uncomment the following three lines for default view
    //            comment out if testing outerra markers
    //var extent =  new Cesium.Rectangle.fromDegrees(-125.0, 20.0, -80.0, 55); 
    //Cesium.Camera.DEFAULT_VIEW_RECTANGLE = extent;
    //Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;

    //var west = 122.0;
    //var south = 33.0;
    //var east = 130.0;
    //var north = 47.0;
    //var rectangle = Cesium.Rectangle.fromDegrees(west, south, east, north);
    //Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;
    //Cesium.Camera.DEFAULT_VIEW_RECTANGLE = rectangle;

    var viewer = new Cesium.Viewer('cesiumContainer', {
      
      animation: false, 
      baseLayerPicker: true,
      imageryProviderViewModels: imageryViewModels,
      terrainProviderViewModels: terrainViewModels,
      navigationInstructionsInitiallyVisible: true,
      timeline: false
    });
    viewer.clock.onTick.addEventListener(function(clock) {
    var camera = viewer.camera;
    });
    var scene = viewer.scene;
    var globe = scene.globe;
    cesiumController.set('viewer', viewer);
    
    //-- Set center of cesium view, with height
    //-- Replaced DEFAULT_VEW_RECTANGLE with below- allows for elevation zoom
    // testing testing -- default view

    //viewer.camera.setView( {
    //  position: Cesium.Cartesian3.fromDegrees(-110, 40, 2800000.0)
    //});

    //var center = Cesium.Cartesian3.fromDegrees(-110,40);
    var heading = Cesium.Math.toRadians(0);
    var pitch = Cesium.Math.toRadians(-75.0);
    var range = 2800000.0;
    
    // testing testing -- this adds tilt to the globe,
    //                    outerra markers glitch when at a certain tilt
    //viewer.camera.lookAt(center, new Cesium.HeadingPitchRange(heading, pitch, range));
    
    var center = Cesium.Cartesian3.fromDegrees(-110.0, 40.0);
    var cameraPos = new Cesium.Cartesian3(0.0, -1790.0, 2800000.0);
    viewer.camera.lookAt(center, cameraPos);
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

    // testing testing -- scene2d change
    //cesiumController.set('sceneMode', scene.mode);

    viewer.homeButton.viewModel.tooltip = 'Reset zoom';
    console.log(viewer.homeButton.viewModel.command);
    //set the imagery layers for controller
    imageryLayers = globe.imageryLayers; 
    cesiumController.set('imageryLayers', imageryLayers);


viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function(commandInfo){
//Zoom to custom extent
var west = Cesium.Math.toRadians(-21.0);
var south = Cesium.Math.toRadians(36.0);
var east = Cesium.Math.toRadians(35.0);
var north = Cesium.Math.toRadians(68.0);

    var center = Cesium.Cartesian3.fromDegrees(-110.0, 40.0);
    var cameraPos = new Cesium.Cartesian3(0.0, -1790.0, 2800000.0);
    var loc = viewer.camera.lookAt(center, cameraPos);
    viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);

        var extent = new Cesium.Extent(west, south, east, north);

        var flight = Cesium.CameraFlightPath.createAnimationExtent(scene, {
            destination : loc 
        });
        scene.getAnimations().add(flight);


//Tell the home button not to do anything.
commandInfo.cancel = true;
});


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

    cesiumController.loadPoints();   // enable cesium markers
    /*camera.flyTo({ 
        destination: Cesium.Cartesian3.fromDegrees(-111.100, 36.998, 5000000.0)
    });*/
    console.log(camera.positionCartographic);
  },

  webglDetect: function(return_context) {
      
    if (!!window.WebGLRenderingContext) {
      var canvas = document.createElement("canvas"),
          names = ["webgl", "experimental-webgl", "moz-webgl", "webkit-3d"],
          context = false;

      for (var i=0;i<4;i++) {
        try {
          context = canvas.getContext(names[i]);
          if (context && typeof context.getParameter == "function") {
            // WebGL is enabled
            if (return_context) {
              // return WebGL object if the the function's argument is present
              return {name:names[i], gl:context};
            }
            // else return just true
            return true;
          }
        } catch(e) {}
      }

      // WebGL is supported, but disabled
      return false;
    }

    return false;

   }


});
