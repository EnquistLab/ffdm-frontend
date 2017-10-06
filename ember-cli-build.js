/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');
module.exports = function(defaults) {
	var app = new EmberApp({
	  fingerprint: {
	    enabled: true,
	    exclude: ['assets/images']
	  }
	  });
	var pickFiles = require('broccoli-static-compiler');
	//var mergeTrees = require('broccoli-merge-trees');

	app.import('bower_components/jquery.scrollTo/jquery.scrollTo.min.js');

	app.import('bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js');

};
// Glyphicons -- 404 cannot GET
/*var bootstrapFonts= pickFiles('bower_components/bootstrap-sass-official/assets/fonts/bootstrap', {
  srcDir: '/',
  files: [
  'glyphicons-halflings-regular.*',
    ],
  destDir: '/assets/fonts/bootstrap'
});
*/
// Cesium
/*var cesiumFiles = pickFiles('vendor/cesium/Build/Cesium', {
  srcDir: '/',
  files: ['*'],
  destDir: '/assets/cesium',
});
*/
// Bootstrap .scss
/*var bootstrap = pickFiles('bower_components/bootstrap-sass-official/assets/stylesheets/', {
  srcDir: '/',
  files: ['*'],
  destDir: '/assets/styles/bootstrap'
});

//Include FontAwesome
app.import('bower_components/fontawesome/css/font-awesome.css')
var fontAwesomeFonts = pickFiles('bower_components/fontawesome/fonts', {
  srcDir: '/',
  files: ['*'],
  destDir: '/assets/fonts/fontawesome'
});

*/

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

//module.exports = mergeTrees([app.toTree(), cesiumFiles, bootstrapFonts, bootstrap,  fontAwesomeFonts]);
