import DS from 'ember-data';

export default DS.Model.extend({
  mountain    : DS.belongsTo('mountain', {async:true}),
  name        : DS.attr(),
  mountainUrl : DS.attr('string'),
  headline    : DS.belongsTo('headline', {async:true}),
  createdAt   : DS.attr(),
  updatedAt   : DS.attr()
});
