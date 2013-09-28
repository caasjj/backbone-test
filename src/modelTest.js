/**
 * Created with JetBrains PhpStorm.
 * User: developer
 * Date: 9/27/13
 * Time: 9:15 AM
 * To change this template use File | Settings | File Templates.
 */
//(function () {
var MyModelItem = Backbone.Model.extend( {
	id     :"id",
	display:function ( msg ) {
		console.log( msg + ' ' + this.get( 'name' ) );
	},
	readSuccess: function(model, resp, opts) {
		this.display('Loaded model:');
	},
	readError: function(model, xhr, opts) {
		this.display( 'Could not load model from server');
	}
} );

var myModelItem = new MyModelItem( {

} );

myModelItem.url = '/PHP/DATA/public_html/restaurants/15';

var loadDefer = myModelItem.fetch( {
	success: function(m,r,o) { return myModelItem.readSuccess(m,r,o); },
	error  : function(m,r,o) { return myModelItem.readError(m,r,o); }
} );

var updateDefer = loadDefer.then( function ( resp, stat, opts ) {
	console.log( 'Load Ajax Done: ' + JSON.stringify( resp ) );
	myModelItem.set('name', 'Junk');
	var saveDefer =  myModelItem.save();
	return saveDefer;
}, function ( resp, xhr, opts ) {
	console.log( 'Could not load model' );
} );

updateDefer.then( function(resp, stat, opts) {
	console.log( 'Update Ajax Done:' + JSON.stringify(resp) );
}, function(resp, stat, opts) {
	console.log( 'Update Ajax fail:' + JSON.stringify(resp) );
})




