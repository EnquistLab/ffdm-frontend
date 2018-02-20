import Ember from 'ember';
import { inject as service } from '@ember/service';

export default Ember.Component.extend({
  plants: null,
  plantSort: ['name'],
  plantsSorted: Ember.computed('plants', function() 
			{ return this.get('plants').sortBy('name'); }),
  //modelReturned: Ember.computed('plants', function()
  //	{return this.get('plants').get('isFulfilled') || this.get('plants').get('isLoaded');}),
  prompt: null,
  selection: null,
  optionValuePath: 'value',
  optionLabelPath: 'label',
  store: Ember.inject.service(),
  
  init: function () {
	this._super(...arguments);
	var pp = this.get('store').findAll('plant')
	.then(plants => { this.set('plants', plants); });
	if (!pp) { this.set('plants', []); } 
  },

  actions: {
    change: function () {
      let selectedIndex = this.$('select')[0].selectedIndex;
      let pp = this.get('plantsSorted');

      // decrement index by 1 if we have a prompt
      let hasPrompt = !!this.get('prompt');
      let contentIndex = hasPrompt ? selectedIndex - 1 : selectedIndex;
      let _selection = pp[contentIndex];

      this.set('selection', _selection);
      //this.sendAction('willChangeAction', _selection);
      /*if (this.get('optionValuePath')) {
        this.set('selection', _selection.get(this.get('optionValuePath')));
      } else {
        this.set('selection', _selection);
      }*/

      //this.sendAction('didChangeAction', _selection);
    }
  }
});
