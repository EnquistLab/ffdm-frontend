import Ember from 'ember';

export default Ember.View.extend({
  tagName: 'wrapper',
  templateName: 'headline',
  didInsertElement: function() {
    var controller = this.get('controller');
    controller.set('classCounter', controller.get('classCounter') + 1);
    if (controller.get('classCounter') === controller.get('classArray').length) {
      controller.bindScrolling();
    }
  }
});
