import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    console.log('Headlines route hit with parameter: '+ params.pageId);
    return this.get('store').query('headline', {pageId: params.pageId})
		.then(function(headlines) 
		{
			//return headlines.get("firstObject");
			return headlines;
		});
  },
   render: function() {
     console.log('activate-function');
     this._super();
     window.scrollTo(0,120);
   }
});
