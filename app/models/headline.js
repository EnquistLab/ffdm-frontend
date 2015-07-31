import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  classId: DS.attr('string'),
  orderId: DS.attr('string'),
  pageId: DS.attr('string'),
  detail: DS.attr('string'),
  charts: DS.hasMany('chart', {async:true}),
  mountains: DS.hasMany('mountain', {async: true}),
  down: DS.attr('boolean'),
  createdAt: DS.attr(),
  updatedAt: DS.attr(),


  detailId: function() {
    return this.get('classId') + '-detail';
  }.property('classId'),

  scrollId: function() {
    return this.get('classId') + '-scroll';
  }.property('scrollId'),

  chartContainer: function() {
    return this.get('classId') + '-chart';
  }.property('classId'),
  
  pictureContainer: function() {
    return this.get('classId') + '-picture';
  }.property('classId'),
  
  mountainContainer: function() {
    return this.get('classId') + '-mountain';
  }.property('classId')
  

});
