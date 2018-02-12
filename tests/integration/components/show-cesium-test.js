import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('show-cesium', 'Integration | Component | show cesium', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{show-cesium}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#show-cesium}}
      template block text
    {{/show-cesium}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
