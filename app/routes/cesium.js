import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('plants').set('content', this.store.find('plant'));
    this.controllerFor('outerras').set('content', this.store.find('outerra'));
  }
});
