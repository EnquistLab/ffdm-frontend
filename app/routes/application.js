import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    showModal: function(name) {
	  console.log(name);
      this.render(name, {
        into: 'application',
        outlet: 'modal'
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
