import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cesium-holding', 'Integration | Component | cesium holding', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{cesium-holding}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#cesium-holding}}
      template block text
    {{/cesium-holding}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
