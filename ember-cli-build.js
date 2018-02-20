/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app'),
    Funnel = require('broccoli-funnel'),
    Merge = require('broccoli-merge-trees');

//var bootstrap = 'bower_components/bootstrap-sass-official/assets';
var fontawesome = 'bower_components/font-awesome/scss';

module.exports = function(defaults) 
    {
    var app = new EmberApp(defaults, {
      fingerprint: {
        enabled: true,
        exclude: ['assets/images']
      },

      sassOptions: {
        includePaths: ['app/styles', 
                'node_modules/cesium/Build/CesiumUnminified/Widgets/',
		'node_modules/jquery-scrollto/out/styles',
		fontawesome ]
      },

      sourcemaps: {
        enabled: EmberApp.env() !== 'production',
        extensions: ['js']
      },

      'ember-bootstrap': {
	bootstrapVersion: 3,
        importBootstrapFont: true,
        importBootstrapCSS: true,
	whitelist: ['bs-modal-simple', 'bs-navbar']
      }
    });

    //app.import('bower_components/jquery.scrollTo/jquery.scrollTo.min.js');
    app.import('node_modules/jquery-scrollto/out/lib/jquery-scrollto.js');
    //app.import('bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js');

    //Cesium
    app.import('node_modules/cesium/Build/Cesium/Cesium.js');
    //Cesium css included in app/styles/app.scss
    //app.import('node_modules/cesium/Build/Cesium/Widgets/widgets.css');

    //D3
    app.import('node_modules/d3/build/d3.min.js');
    
    /*var bootstrapFonts = new Funnel(bootstrap, {
        srcDir: '/fonts/bootstrap',
        include: ['glyphicons-halflings-regular.*',],
        destDir: '/fonts/bootstrap'
    });*/
    
    // Bootstrap .scss
    /*var bootstrapStyles = new Funnel(bootstrap, {
        srcDir: '/stylesheets/',
        include: ['*'],
        destDir: '/assets/styles/bootstrap'
    });*/

    //Include FontAwesome
    /*app.import('bower_components/fontawesome/css/font-awesome.css');
    var fontAwesomeFonts = new Funnel('bower_components/fontawesome/fonts', {
        srcDir: '/',
        include: ['*'],
        destDir: '/assets/fonts/fontawesome'
    });*/

    // Use `app.import` to add additional libraries to the generated
    // output files.
    //
    // If you need to use different assets in different
    // environments, specify an object as the first parameter. That
    // object's keys should be the environment name and the values
    // should be the asset to use in that environment.
    //
    // If the library that you are including contains AMD or ES6
    // modules that you would like to import into your application
    // please specify an object with the list of modules as keys
    // along with the exports of each module as its value.

    //return mergeTrees([app.toTree(), bootstrapFonts, bootstrap,  fontAwesomeFonts]);
    //return app.toTree(new Merge([bootstrapFonts, bootstrapStyles, fontAwesomeFonts]));
    //return app.toTree(new Merge([fontAwesomeFonts]));
    return app.toTree();
};





