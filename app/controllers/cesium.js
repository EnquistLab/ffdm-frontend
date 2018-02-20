import Ember from 'ember';

export default Ember.Controller.extend({
  //proxy: '/cgi-bin/proxy.cgi?url=http://scooby.iplantcollaborative.org/maxent/', //allows access to records without opening cors
  proxy: 'http://localhost:1337/maxent/',
  //proxy: 'http://scooby.iplantcollaborative.org/maxent/',
  species: '', // object holding the record from the plant table
  speciesName: 'Populus_tremuloides',
  year: '2011',
  rcp: 'rcp26',
  imageryLayers: '',
  imageryViewModels: [], // this will house the base layers
  myTimer: '', // timer for animations
  viewer: '',
  isAnimated: 0, // boolean to signal animations
  years: [1,2,3,4,5,6,7,8], 
  activeDate: 1, // counter to track the current year/layer
  outerras: Ember.inject.controller(),
  //plantModels: Ember.computed('plants', function() { return plants.get('model'); }),
  // --- testing scene2d change     
  // sceneMode: null,

/* --- testing scene2d change 
  sceneModeChanged: function() {

    console.log("Scene2dFlyTo called.");
    console.log("SceneMode = ");
    console.dir(this.get('sceneMode'));
    if (this.get('sceneMode') === 2) {
      console.log("Switched to SCENE2D");
            var position = new Cartesian3.fromDegrees(-110, 40, 3500000.0);
            scene.camera.flyTo({
                destination : position,
                duration : duration,
                endTransform : Matrix4.IDENTITY
            });
    };
  }.observes('sceneMode'),
*/

  plantsSelected: function() {
    console.log('plant selection changed ' + this.get('species').get('name'));
    this.animateMaps(0);
    $('#rcp-group').css('visibility', 'visible');
    this.set('speciesName', this.get('species').get('sci_name'));
    this.remindSubmit();
  }.observes('species'),	//potentially change observer to explicit action on component

    
  rcpSelected: function() {
    console.log('rcp selection has changed! ' + this.get('rcp'));
    $('#year-group').css('visibility', 'visible');
    if (this.get('rcp') === 'rcp85') {
      $('#rcp85-label').addClass('active-label');
      $('#rcp26-label').removeClass('active-label');
    } else {
      $('#rcp85-label').removeClass('active-label');
      $('#rcp26-label').addClass('active-label');
    }
    this.remindSubmit();
    
  }.observes('rcp'),

  animateChanged: function() {
    var animate = this.get('isAnimated');
    console.log('Animate Changed called');
    if (animate) {
      this.animateMaps(1);
      $('#playPause').removeClass('fa-play');
      $('#playPause').addClass('fa-pause');
    } else {
      $('#playPause').removeClass('fa-pause');
      $('#playPause').addClass('fa-play');
      this.animateMaps(0);
    }
  }.observes('isAnimated'),
  
  yearChanged: function() {
    var active = this.get('activeDate');
    var newYear = "20" + active + "1";
    this.set('year', newYear);
    console.log('Year has changed to '+ this.get('year'));
  }.observes('activeDate'),


  yearSelected: function() {
    console.log('year selection changed! ' + this.get('selectedYear'));
    $('#submit-group').css('visibility', 'visible');
    $('#slider-control').css('visibility', 'visible');
    
  }.observes('selectedYear'), 

  createImageryProvider: function(url) {
    var wms = new Cesium.createTileMapServiceImageryProvider({
      url: url,
      maximumLevel: 7,
      gamma: 2,
      flipXY: true,
      parameters: {
        transparent: 'true',
        format: 'image/png'
      },
    });
    return wms;
  },
  
  setLayerAlpha: function(year) {
    if (year === this.get('activeDate')) {
      return 1;
    } else {
      return 0;
    }
  },

  addLayerOption: function(name, imageryProvider, alpha, show) {
    var layers = this.get('imageryLayers');
    var globe = this.get('viewer').scene.globe;
    console.log(globe.imageryLayers);
    console.log(name + ' is ready: '+ imageryProvider.ready);
    console.log(typeof layers);
    var layer = layers.addImageryProvider(imageryProvider);
    layer.name = name;
    layer.alpha = alpha;
    layer.show = show;
  },

  setupLayers: function() {
    //Add all the decade layers for the given species and rcp
    //This will need to be refactored to allow it to be species specific
    var proxy = this.get('proxy');
    var rcp = this.get('rcp');
    var years = this.get('years');
    
    // --- testing scene2d change
    //$("#scene-changer").click(function() {
    //  console.log("SCENE CHANGER CLICKED!!!!");
    //});
   
    var speciesName = this.get('speciesName');
    //console.log(speciesName);
    //Iterate through the years for each layer
    var readyCounter = 0;
    for (var i = 0; i < years.length; i++) {
      var newUrl = proxy + rcp + '/20' + years[i] + '1/' + speciesName; //Use once on the server
      var imageryProvider = this.createImageryProvider(newUrl);
      var alpha = this.setLayerAlpha(years[i]);
      var name = speciesName + '-20' + years[i] + '1';
      
      this.addLayerOption(name, imageryProvider, alpha, 1);
     
    }
  },

  addBillboard: function(x,y, title, url) {
    console.log("Adding Billboard...");
    var viewer = this.get('viewer');
    //Create the marker for the map
    var marker = viewer.entities.add({
      name: title,
      //marker position, need to account for elevation
      position: Cesium.Cartesian3.fromDegrees(x, y, 3000),
      billboard: {
        image: 'assets/images/outerra-pin.png',
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.0e3, 1.0, 1.5e6, 0.0),
      },
      //description: '<img href='+description +'></img>',
        description: '<div class=addBillboardDescription>' + url + '</div>',
      //currently not being recognized
      viewFrom: Cesium.Cartesian3.fromDegrees(x,y,10000)
        
    });
  },
  loadPoints: function() {

   //This function will load the data for outerra points.
   //Getting the models from the outerras controller results in a PromiseArray
    var outerraModel = this.get('outerras').get('model');
   //We can enumerate it this way
    outerraModel.then(function(model) 
	{ outerraModel.forEach(function(item)
		{ 
			var lat = item.get('y');
        		var lon = item.get('x');
        		console.log('lat: '+lat+', lon: '+lon);
        		var title = item.get('title');
        		var description = item.get('url');
        		//Add the marker to the map
        		//self.addBillboard(lon, lat, title, description);
		}); 
	});
    
    //Capture scope for timeout function
    /*var self = this;
    setTimeout(function() {
      var content = outerraModel.get('content');
      //console.log(content);
	
	//For some reason there are three levels of 'content' to get to actual data
      if (content.isLoaded) {
      var points = content.get('content');
      //console.log(points);      

	//Iterate through the returned records
      for (var x =0, len = points.length; x < len; x++) {
	//console.log(points[x]);
        
      	}
      }

    }, 1000);*/
  },
 
  
  removeLayers: function() {
    //Clear old layers before adding new ones
    this.set('isAnimated', 0);
    console.log('Remove layers called');
    var layerLength = this.get('imageryLayers').length;
    console.log(layerLength);
    for (var i = layerLength; i > 0; i--){
      console.log('Removing layer ' + i+ ' out of '+this.get('years').length+ " layers");
      var layer = this.get('imageryLayers').get(i)
      //console.log("Layer is "+ layer);
      
      this.get('imageryLayers').remove(layer);
      //console.log(this.get('imageryLayers'));
    }
  },
//If direction is 1, it will move forward in time, else it goes backward in time
  changeYear: function(direction) {
   
    var active = this.get('activeDate');
    var oldLayer = this.get('imageryLayers').get(active);
    if (direction === 1){ 
      if (active < this.get('years').length) {
        console.log('Moving forward in time');
        active = active + 1;
      } else {
        console.log('Moving to start');
        active = 1;
      }
    } else {
      if (active > 1) {
        console.log('Moving backward in time');
        active = active - 1;
      } else {
        console.log('Moving to end');
        active = this.get('years').length;
      }
    }
    this.set('activeDate', active);
    var newLayer = this.get('imageryLayers').get(active);
    oldLayer.alpha = 0;
    newLayer.alpha = 1;
  },
    
 

  animateMaps: function(start) {
    if (start) {
      var self = this;
      this.set('myTimer', null);
      console.log('Animating maps...');
      this.set('myTimer', setInterval(function() {
        self.changeYear(1);
        console.log("Animated");
      }, 500));
    } else {
      console.log('Stopping animation');
      clearInterval(this.get('myTimer'));
    }
  },


  changeSpecies: function() {
    this.set('speciesName', this.get('species').get('sci_name'));
    console.log('The new species is '+ this.get('species').get('sci_name'));
  },
    pulseObject: function(varname) {
      $(String(varname)).removeClass('pulse');
      setTimeout(
          function() {
            console.log('Pulsing ' + varname);
            $(String(varname)).addClass('pulse');}, 1);
    },
  
    remindSubmit: function() {
      if (this.get('selectedYear') !== null) {
        this.pulseObject('#submit-desc');
      }
    },

  createDefaultImageryViewModels() {
    var imageryViewModels = [];


    imageryViewModels.push(new Cesium.ProviderViewModel({
            name: 'Bing Maps Aerial with Labels',
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingAerialLabels.png'),
            tooltip: 'Bing Maps aerial imagery with label overlays \nhttp://www.bing.com/maps',
            creationFunction: function() {
              return new Cesium.BingMapsImageryProvider({
                url: '//dev.virtualearth.net/',
                mapStyle: Cesium.BingMapsStyle.AERIAL_WITH_LABELS,
                errorEvent: function(e) {
                  console.log("There was an error loading the tile: "+ e);
                },

              });
            }
    }));
    
    imageryViewModels.push(new Cesium.ProviderViewModel({
            name: 'Bing Maps Aerial',
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingAerial.png'),
            tooltip: 'Bing Maps aerial imagery \nhttp://www.bing.com/maps',
            creationFunction: function() {
              return new Cesium.BingMapsImageryProvider({
                url: '//dev.virtualearth.net/',
                mapStyle: Cesium.BingMapsStyle.AERIAL,
                errorEvent: function(e) {
                  console.log("There was an error loading the tile: "+ e);
                },

              });
            }
    }));
    
    imageryViewModels.push(new Cesium.ProviderViewModel({
            name: 'Bing Maps Roads',
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/bingRoads.png'),
            tooltip: 'Bing Maps standard road maps\nhttp://www.bing.com/maps',
            creationFunction: function() {
              return new Cesium.BingMapsImageryProvider({
                url: '//dev.virtualearth.net/',
                mapStyle: Cesium.BingMapsStyle.ROAD,
                errorEvent: function(e) {
                  console.log("There was an error loading the tile: "+ e);
                },

              });
            }
    }));
    imageryViewModels.push(new Cesium.ProviderViewModel({
                name : 'ESRI National Geographic',
                iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriNationalGeographic.png'),
                tooltip : '\
    This web map contains the National Geographic World Map service. This map service is designed to be used as a general reference map \
    for informational and educational purposes as well as a basemap by GIS professionals and other users for creating web maps and web \
   mapping applications.\nhttp://www.esri.com',
                creationFunction : function() {
                return new Cesium.ArcGisMapServerImageryProvider({
                  url : '//services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/'
                  });
                }
          }));
    imageryViewModels.push(new Cesium.ProviderViewModel({
            name: 'ESRI World Imagery',
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriWorldImagery.png'),
            tooltip: '\
      World Imagery provides one meter or better satellite and aerial imagery in many parts of the world and lower resolution \
      satellite imagery worldwide.  The map includes NASA Blue Marble: Next Generation 500m resolution imagery at small scales \
      (above 1:1,000,000), i-cubed 15m eSAT imagery at medium-to-large scales (down to 1:70,000) for the world, and USGS 15m Landsat \
      imagery for Antarctica. The map features 0.3m resolution imagery in the continental United States and 0.6m resolution imagery in \
      parts of Western Europe from DigitalGlobe. In other parts of the world, 1 meter resolution imagery is available from GeoEye IKONOS, \
      i-cubed Nationwide Prime, Getmapping, AeroGRID, IGN Spain, and IGP Portugal.  Additionally, imagery at different resolutions has been \
      contributed by the GIS User Community.\nhttp://www.esri.com',
            creationFunction: function() {
              return new Cesium.ArcGisMapServerImageryProvider({
                url: '//services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/Mapserver',
                errorEvent: function(e) {
                  console.log("There was an error loading the tile: "+ e);
                },

              });
            }
    }));

    imageryViewModels.push(new Cesium.ProviderViewModel({
            name: 'ESRI World Street Map',
            iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/esriWorldStreetMap.png'),
            tooltip: '\
      This worldwide street map presents highway-level data for the world. Street-level data includes the United States; much of \
      Canada; Japan; most countries in Europe; Australia and New Zealand; India; parts of South America including Argentina, Brazil, \
      Chile, Colombia, and Venezuela; Ghana; and parts of southern Africa including Botswana, Lesotho, Namibia, South Africa, and Swaziland.\n\
      http://www.esri.com',
            creationFunction: function() {
              return new Cesium.ArcGisMapServerImageryProvider({
                url: '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/Mapserver',
                errorEvent: function(e) {
                  console.log("There was an error loading the tile: "+ e);
                },

              });
            }
    }));
    
    imageryViewModels.push(new Cesium.ProviderViewModel({
           name : 'Open\u00adStreet\u00adMap',
           iconUrl : Cesium.buildModuleUrl('Widgets/Images/ImageryProviders/openStreetMap.png'),
           tooltip : 'OpenStreetMap (OSM) is a collaborative project to create a free editable \
      map of the world.\nhttp://www.openstreetmap.org',
           creationFunction : function() {
             return new Cesium.OpenStreetMapImageryProvider({
               url : '//a.tile.openstreetmap.org/'
             });
           }
     }));

    return imageryViewModels;
  },

  createDefaultTerrainViewModels: function() {
    var terrainViewModels = [];


    terrainViewModels.push(new Cesium.ProviderViewModel({
      name: 'STK World Terrain meshes',
      iconUrl: Cesium.buildModuleUrl('Widgets/Images/TerrainProviders/STK.png'),
      tooltip: 'High-resolution, mesh-based terrain for the entire globe.',
      creationFunction: function() {
        return new Cesium.CesiumTerrainProvider({
          url: '//assets.agi.com/stk-terrain/world',
          requestWaterMask : true,
          requestVertexNormals: true
        });
      }
    }));
    return terrainViewModels;
  },

  initCB: function() {
    var cesiumController = this;

    //cesiumController.setupLayers();

    var viewer = cesiumController.get('viewer');
    var camera = viewer.camera;

    cesiumController.loadPoints();   // enable cesium markers
    /*camera.flyTo({ 
        destination: Cesium.Cartesian3.fromDegrees(-111.100, 36.998, 5000000.0)
    });*/
    //console.log(camera.positionCartographic);
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
  },

  actions: {
    showCesium: function() {

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
    
    window.CESIUM_BASE_URL = './assets/images';
    var cesiumController = this; 
       
    var imageryLayers = cesiumController.get('imageryLayers');
    //var imageryViewModels = cesiumController.get('imageryViewModels');
    Cesium.BingMapsApi.defaultKey = 'AslSxct_WT1tBMfBnXE7Haqq3rosfoymosE84z64f5FO7RMjEez3fFWw5HU0WLJ-'; 

    //Define the default imagery and terrain models
    var imageryViewModels = cesiumController.createDefaultImageryViewModels(); 
    var terrainViewModels = cesiumController.createDefaultTerrainViewModels();

    //-- Set cesium view extend with rectangle
    //-- Can be substituted with view.camera.setView() for allowing zoom level (elevation)
    // testing testing -- uncomment the following three lines for default view
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
      fullscreenButton: true,
      geocoder: true,
      homeButton: true,
      infoBox: true,
      sceneModePicker: true,
      selectionIndicator: true,
      timeline: false,
      navigationHelpButton: true,
      navigationInstructionsInitiallyVisible: true,
      imageryProviderViewModels: imageryViewModels,
      terrainProviderViewModels: terrainViewModels
    });
    viewer.resize();
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
     
    //this.initCB();
  },

    reloadLayers: function() {
      this.removeLayers();
      //this.changeSpecies();
      this.setupLayers();
  },

    plusYear: function() {
      this.changeYear(1);
    },
    minusYear: function() {
      this.changeYear(0);
    },

    setWorstRcp: function() {
        this.set('rcp', 'rcp85');
      },
    setBestRcp: function() {
        this.set('rcp', 'rcp26');
      
    },
    getEntity: function() {
    },
    playPause: function() {
      if (this.get('isAnimated')) {
        console.log("Stopping animation");
        this.set('isAnimated', 0);
      } else {
        console.log("Starting animation");
        this.set('isAnimated', 1);
      }
    },

    //Will need changes for enumeration as in loadPoints()
    toggleOuterraMarkers: function() {

      var viewer = this.get('viewer');
      var markerArray = viewer.entities;
      var markerArrayLength = markerArray._entities.length;
      var logLength =  'markerArray.length = ' + markerArrayLength;

      if ( markerArrayLength == 0 ) {
        var self = this;
        setTimeout(function() {
          //console.log('Second try');
          var content = outerraModel.get('content');
          console.log("Content listing: " +  content);
          if (content.isLoaded) {
            var points = content.get('content');
            for (var x =0, len = points.length; x < len; x++) {
              var lat = points[x].get('y');
              var lon = points[x].get('x');
              //console.log('lat: '+lat+', lon: '+lon);
              var title = points[x].get('title');
              var description = points[x].get('url');
              self.addBillboard(lon, lat, title, description);
            }
          }
          
        }, 1000);
        //console.log(logLength);
      } else {
        //console.log('outerraMarkers already active');
        viewer.entities.removeAll();
        //console.log(logLength);
      };

    },
  } 
});
