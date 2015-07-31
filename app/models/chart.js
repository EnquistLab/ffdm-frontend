import DS from 'ember-data';

export default DS.Model.extend({
  plant   : DS.belongsTo('plant', {async:true}),
  pictureUrl : DS.attr('string'),
  figureUrl : DS.attr('string'),
  headline  : DS.belongsTo('headline', {async:true}),
  createdAt : DS.attr(),
  updatedAt : DS.attr()
});
