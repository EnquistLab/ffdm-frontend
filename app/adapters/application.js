import Ember from 'ember';
import DS from 'ember-data';
import config from '../config/environment';

export default DS.RESTAdapter.extend({
  coalesceFindResults: true, // blueprints support coalescing (reduces the amount of calls)
  namespace: '',             // same as API prefix in Sails config
  host: config.APP.API_HOST, //Sails Server
  corsWithCredential: true
});

