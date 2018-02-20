import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'wrapper',
  templateName: 'headline',

  init() {
    this._super(...arguments);
  },

  didInsertElement: function() {
    console.log("Showing headline");
    this.sendAction('showHeadline');
  },
	actions: {	//Essentially wrappers for actions on the controller
toggleDetail(headlineID) { this.sendAction('toggleDetail', headlineID); },
scrollToHeadline(headlineID) { this.sendAction('scrollToHeadline', headlineID); },
getChart(chart) { this.sendAction('getChart', chart); },
getMountain(mountain) { this.sendAction('scrollToHeadline', mountain); }
	}
});
