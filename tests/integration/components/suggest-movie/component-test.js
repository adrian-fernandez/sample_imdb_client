import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('suggest-movie', 'Integration | Component | suggest movie', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{suggest-movie}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#suggest-movie}}
      template block text
    {{/suggest-movie}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
