/**
 * Created with JetBrains PhpStorm.
 * User: developer
 * Date: 9/27/13
 * Time: 9:15 AM
 * To change this template use File | Settings | File Templates.
 */
(function () {
	var MyModelItem = Backbone.Model.extend( {id:"id"} );

	var myModelItem = new MyModelItem( {

	} );

	myModelItem.url = '/PHP/DATA/public_html/restaurants/15';
	var updateName = 'Chinese dump Hut';

	function loadModel () {
		console.log( 'Loading Model for first time' )
		return myModelItem.fetch();
	}

	function showModel () {
		console.log( 'Model Loaded. Showing Model.' )
		console.log( 'Name: ' + myModelItem.get( 'name' ) + ', Delivery: ' + myModelItem.get( 'delivery' ) );
	}

	function updateModel () {
		console.log( 'Model Shown. Updating Model.' );
		myModelItem.set( 'name', updateName );
		return myModelItem.save();
	}

	function reLoadModel () {
		console.log( 'Model Updated. Re-loading' );
		return myModelItem.fetch();
	}

	function reShowModel () {
		console.log( 'Model re-loaded. Re-showing.' );
		console.log( 'Name: ' + myModelItem.get( 'name' ) + ', Delivery: ' + myModelItem.get( 'delivery' ) )
	}

	loadModel().then(
		function ( resp, status, qxhr ) {
			console.log( 'Loaded. Show:' );
			console.log( 'Name' + myModelItem.get( 'name' ) + '(Resp: ' + JSON.stringify(resp) + ')' + 'qxhr.readyState: ' + qxhr.readyState );
			console.log( 'Updating...' );
			myModelItem.set( 'name', updateName );
			myModelItem.save().then(
				function ( resp, status, qxhr ) {
					console.log( 'Update done. Reloading...' );
					myModelItem.fetch().then(
						function ( resp, status, qxhr ) {
							console.log( 'Reloaded.  Show:' )
						},
						function (qxhr, error) {
							console.log( 'reload Failed!! Error: ' + error );
						});
				},
				function ( qxhr, error) {
					console.log( 'Update Failed!! Error: ' + error );
					console.log( 'Reloading anyway...' );
					myModelItem.fetch().then(
						function ( resp, qxhr, opts ) {
							console.log( 'Reloaded.  Show:' );
							console.log( 'Name' + myModelItem.get( 'name' ) + '(Resp: ' + JSON.stringify(resp) + ')' + 'qxhr.readyState: ' + qxhr.readyState );
						},
						function () {
							console.log( 'Reload Failed!!' );
						});
				} );
		},
		function(qxhr, error) {
			console.log( 'Load failed!! Erro: ' + error);
		}
	);

})();
