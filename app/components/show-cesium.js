import Ember from 'ember';
/* global Cesium */
export default Ember.Component.extend({

  tagName: '',
  classNames: ['viewer'],

  /*proxy: '',	Eventually re-factor to have multiple cesium views with direct params,
  rcp: '',	not just passing the whole controller for the cesium template in
  species: '',
  imageryLayers: '',
  imageryViewModels: [],
  terrainViewModels: [],	

  createDefaultImageryViewModels: also, eventually provide anonymous methods to controller routines
  ...					called here.
  */ 

  init() {
    this._super(...arguments);
  },

  didInsertElement() {
	this.sendAction('showCesium');
  }
});
