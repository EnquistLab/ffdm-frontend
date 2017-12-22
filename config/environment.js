/*jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'ffdm-frontend',
    environment: environment,
    rootURL: '',
    locationType: 'hash',
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' https://player.vimeo.com www.google-analytics.com 'nonce-7fgda89vsd789'",
      'font-src': "'self' http://fonts.googleapis.com http://fonts.gstatic.com",
      'connect-src': "'self' http://localhost:1337 http://192.81.135.213:1337 http://scooby.iplantcollaborative.org:1337",
      'img-src': "'self' www.google-analytics.com",
      'style-src': "'self' http://fonts.googleapis.com",
      'frame-src': "'self' https://player.vimeo.com",
      'media-src': "'self' https://player.vimeo.com"
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      API_HOST: 'http://scooby.iplantcollaborative.org/sails' //default setting

      // Here you can pass flags/options to your application instance
      // when it is created
    },
  };

  if (environment === 'development') {
     ENV.APP.LOG_RESOLVER = true;
     ENV.APP.LOG_ACTIVE_GENERATION = true;
     ENV.APP.LOG_TRANSITIONS = true;
     ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
     ENV.APP.LOG_VIEW_LOOKUPS = true;
     ENV.APP.LOG_ACTIVE_GENERATION=true;
     ENV.rootURL = 'ffdm';
     ENV.APP.API_HOST = 'http://localhost:1337';

  }

  if (environment === 'dev_server') {
     ENV.APP.LOG_RESOLVER = true;
     ENV.APP.LOG_ACTIVE_GENERATION = true;
     ENV.APP.LOG_TRANSITIONS = true;
     ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
     ENV.APP.LOG_VIEW_LOOKUPS = true;
     ENV.APP.LOG_ACTIVE_GENERATION=true;
     ENV.APP.API_HOST = 'http://scooby.iplantcollaborative.org/sails'; 
     ENV.rootURL = 'ffdm';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.rootURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
      ENV.APP.API_HOST = 'http://scooby.iplantcollaborative.org/sails'; // default setting
  }

  
  return ENV;
};
