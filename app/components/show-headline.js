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
  }
});
