import Ember from 'ember';

export default Ember.ArrayController.extend({
  sortProperties: ['orderId'],
  sortAscending: true,
  previousScroll: $(window).scrollTop(),
  classArray: [],
  classCounter: 0,


  comparePos: function(id, pos) {
    console.log('comparePos called');
     
    var divSize = $(id).height();
    var divTop = pos;
    var divBottom = divTop + divSize;
    var windowTop = $(window).scrollTop();
    var windowSize = window.innerHeight; 
    var windowBottom = windowTop + windowSize;
    var scrollView = divSize * 0.8;
    console.log("Top: " + windowTop + ", Bottom: " + windowBottom);
    var divId = id+ '-scroll';
    if (((divTop + scrollView) > windowTop) && ((divBottom - scrollView) < windowBottom)) {
      $(divId).addClass('right-nav-active'); 
    } else {
      $(divId).removeClass('right-nav-active'); 
    }
  },

  logId: function(elem,idx,arr) {
    

    var id = '#'+elem;
    var pos = $(id).offset().top;
    var tuple = [];
    
    tuple = [id,  pos];
    this.comparePos(id, pos); 
    //console.log(idx);
    //console.log(tuple);
    return tuple;
  },
  getPositions: function() {
    console.log('getPositions called');
    var arr = this.get('classArray');
    var classList = [];
    arr.forEach(this.logId, this);
    

    return arr;
  },

  highlightFirstDot: function() {
    
    var activeDot = this.get('classArray')[0];
    var activeDotId = '#'+ activeDot + "-scroll";
    console.log("Active dot id is: ");
    console.log($(activeDotId));
    console.log("Does this exist? "+$(activeDotId).length);
    console.log($(activeDotId).hasClass('right-nav-active'));
    if ($(activeDotId).hasClass('right-nav-active') === false) {
    console.log('Adding right-nav-active class...');
    $(activeDotId).addClass('right-nav-active');
    } 
     
    console.log(activeDotId + " has active class: "+$(activeDotId).hasClass('right-nav-active'));
  },
  modelDidChange: function() {
    console.info(this.get('model').type);
    console.log('Setting classArray');
    console.log(this.get('model').sortBy('orderId'));
    this.set('classArray', this.get('model').sortBy('orderId').mapBy('classId'));
    console.log(this.get('classArray'));
    this.set('classCounter', 0);
    var _this = this;
    //THIS IS A HACK THAT SHOULD PROBABLY BE DONE MORE ELEGANTLY IN FUTURE
    //highlightFirstDot will only work with a timer of 0
    
     setTimeout(function() {
      console.log('Hello, Timer');
      console.log(_this);
      _this.highlightFirstDot();
     }, 0);
  }.observes('model.isLoaded'),
  bindScrolling: function(opts) {
    var onScroll, _this =this;
    //opts = opts || {debounce: 100};
    
     console.log('highlightFirstDot - timer');
     

     this.highlightFirstDot();
    onScroll = function() {
      //return _this.scrolled();
      return _this.debounce(_this.headlineScrolled(), 2000);
    };
    $(document).bind('touchmove', onScroll);
    $(window).bind('scroll', onScroll);
    },
  scrolled: function() {
    console.log('MapsController was scrolled');
    console.log($(window).scrollTop());
  },

  debounce: function(func,wait,immediate) {
    var timeout;
    return function() {
      var context = this,
          args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        timeout = null;
        if (!immediate) {
          func.apply(context,args);
        }
      }, wait);
      if (immediate && !timeout)
        func.apply(context,args);
    };
  },
  headlineScrolled: function() {
    this.getPositions();
    //console.log(elems);
  },

  
  actions: {

  toggleDetail: function(detail) {
    console.log("openDetail called.");
    console.log(detail);
    
    var detailId = '#'+detail;
    var headline = detailId.substring(0, detailId.length - 7);
    console.log(headline);
    console.log($(detailId).css('max-height'));
    $(detailId).css("max-height", $(detailId).css("max-height") === '0px' ? '3600px' : '0px');
    if ($(detailId).css('max-height') === '0px') {
      $('body').scrollTo($(detailId).offset().top - 120, {duration: 'slow', offsetTop: '200',  easing: 'swing'});
    } else {
      $('body').scrollTo($(headline), {duration: 'slow', easing: 'swing'});
    }

  },

  scrollToHeadline: function(headline) {
    console.log('scrollToHeadline called.');
    console.log(headline);
    var headlineId = '#'+headline;
    var scrollId = headlineId + '-scroll';
    console.log("ScrollId is "+scrollId);
    $('body').scrollTo($(headlineId), 1200, {easing: 'swing'});
    $(scrollId).addClass('active');


  },

  getChart: function(chart) {
    console.log('GetChart called');
    var pictureUrl =chart.get('pictureUrl');
    var figureUrl = chart.get('figureUrl');
    var pictureContainer = '#' + chart.get('headline').get('pictureContainer');
    var chartContainer = '#' + chart.get('headline').get('chartContainer');
    console.log(pictureContainer + ' will have ' + pictureUrl);
    console.log(chartContainer + ' will have ' + chartContainer);
    $(pictureContainer).attr('src', pictureUrl);
    $(chartContainer).attr('src', figureUrl);
  },

    getMountain: function(mountain) {
    console.log('GetMountain called');
    var mountainUrl = mountain.get('mountainUrl');
    var mountainContainer = '#' + mountain.get('headline').get('mountainContainer');
    console.log(mountainContainer + ' will have ' + mountainUrl);
    $(mountainContainer).attr('src',mountainUrl);
  }
  
  }
});
