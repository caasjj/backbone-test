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
	display:function () {
		for ( var p in this.attributes ) {
			console.log( 'myModelItem[' + p + '] = ' + this.attributes[p] );
		}
	}
} );

var myModelItem = new MyModelItem( {

} );

myModelItem.url = '/PHP/DATA/public_html/restaurants/15';
var updateName = 'Another Dump!';

myModelItem.fetch().then( function ( resp, status, qxhr ) {
	console.log( 'Loaded. Show:' );
	console.log( 'Name: ' + myModelItem.get( 'name' ) + '(Resp: ' + JSON.stringify( resp ) + ')' + 'qxhr.readyState: ' +
		qxhr.readyState );
	console.log( 'Updating...' );
	myModelItem.set( 'name', updateName );
	myModelItem.save().then( function ( resp, status, qxhr ) {
		console.log( 'Update done. Reloading...' );
		myModelItem.fetch().then( function ( resp, status, qxhr ) {
			console.log( 'Reloaded.  Show:' );
			console.log( 'Name: ' + myModelItem.get( 'name' ) + '(Resp: ' + JSON.stringify( resp ) + ')' +
				'qxhr.readyState: ' + qxhr.readyState );
			myModelItem.display();

		}, function ( qxhr, error ) {
			console.log( 'reload Failed!! Error: ' + error );
		} );
	}, function ( qxhr, error ) {
		console.log( 'Update Failed!! Error: ' + error );
		console.log( 'Reloading anyway...' );
		myModelItem.fetch().then( function ( resp, qxhr, opts ) {
			console.log( 'Reloaded.  Show:' );
			console.log( 'Name: ' + myModelItem.get( 'name' ) + '(Resp: ' + JSON.stringify( resp ) + ')' +
				'qxhr.readyState: ' + qxhr.readyState );
		}, function () {
			console.log( 'Reload Failed!!' );
		} );
	} );
}, function ( qxhr, error ) {
	console.log( 'Load failed!! Error: ' + error );
} );

