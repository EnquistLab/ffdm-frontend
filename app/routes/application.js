import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    showModal: function(name, model) {
	  console.log(name);
	  console.log(model);
      this.render(name, {
        into: 'application',
        outlet: 'modal',
        model: model
      });
    },
    removeModal: function() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    }
//	error(reason) { console.log(reason);}
  }
});
