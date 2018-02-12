import Ember from 'ember';

export default Ember.Route.extend({
  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('plants').set('model', this.store.findAll('plant'));
    this.controllerFor('outerras').set('model', this.store.findAll('outerra'));
  }
//	actions: { error(reason) { console.log(reason); } }
});
