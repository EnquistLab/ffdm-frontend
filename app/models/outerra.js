import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string'),
  x: DS.attr('number'),
  y: DS.attr('number'),
  tilt: DS.attr('number'),
  heading: DS.attr('number'),
  createdAt: DS.attr('date'),
  updatedAt: DS.attr('date')
});
