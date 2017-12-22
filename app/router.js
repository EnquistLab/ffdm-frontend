import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("index", { path: "/"});
  this.route("welcome");
  this.route("cesium", { path: "/"});
  this.route("cesium");
  this.route("plants");
  this.route("headlines", {path: '/headlines/:pageId'});
  this.route("carousel");
});

export default Router;
