import Ember from 'ember';

export default Ember.Controller.extend({
 
  actions: {
    bcPlay: function(play) {
      console.log('Play button clicked');
      $('#playButton').carousel('cycle');
    },

    bcPause: function(pause) {
      console.log('Pause button clicked');
      $('#pauseButton').carousel('pause');
    }
  }
});
