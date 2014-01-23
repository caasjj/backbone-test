var TestCollection = Backbone.Collection.extend({
  
  model: TestModel,
  
  initialize: function() {
    this.on('trig', function() {
      console.log('Triggered!');
    })
  }
});