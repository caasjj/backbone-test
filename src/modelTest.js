/**
 * Created with JetBrains PhpStorm.
 * User: developer
 * Date: 9/27/13
 * Time: 9:15 AM
 * To change this template use File | Settings | File Templates.
 */
//function () {

/*jslint browser: true*/
/*global $, jQuery, Backbone, Underscore, Handlebars */

/*** Model ****/
var MyModelItem = Backbone.Model.extend( {
	idAttribute:"id",
	urlRoot    :'/PHP/DATA/public_html/users',
	defaults   :{
		firstname:'Bob',
		lastname :'Sammy',
		phone    :'555-111-1212',
		username :'userabuser',
		email    :'jackjack@colorado.gov',
		active   :'n',
		role     :'customer'
	},
	initialize: function() {
		'use strict';
		console.log('Model Inialized!');
	},
	display    :function () {
		'use strict';
		var p;

		for ( p in this.attributes ) {
			if ( this.attributes.hasOwnProperty( p ) ) {
				console.log( 'myModelItem[' + p + '] = ' + this.attributes[p] );
			}
		}
	},
	activate   :function () {
		'use strict';
		this.set( 'active', 'y' );
	},
	deActivate :function () {
		'use strict';
		this.set( 'active', 'n' );
	}
} );

var myModelItem = new MyModelItem( {
	id:12
} );

myModelItem.on( 'all', function ( event ) {
	'use strict';
	console.log( 'Model event ' + event );
} );

/*** View ***/
var MyView = Backbone.View.extend( {
	id       :'List',
	className:'ClassyList',
	tagName  :'ul',
	template :Handlebars.compile( '<li> <input type="checkbox" {{#if checked}}checked{{/if}}> {{firstname}}, {{lastname}} - Active: {{active}} </li>' ),
	events   :{
		'change input':'toggleActivate'
	},

	initialize    :function () {
		'use strict';
		console.log('View Initialized');
		this.model.on( 'change', this.render, this );
		this.model.on( 'destroy', this.remove, this );
	},
	render        :function () {
		'use strict';
		var html = this.template( _.extend( this.model.attributes,
			{ checked:(this.model.attributes.active === 'y' ? true : false) } ) );
		/*		for ( p in this.model.attributes ) {
		 if ( this.model.attributes.hasOwnProperty( p ) ) {
		 html += '<li>' + this.model.attributes[p] + '</li>';
		 }
		 }*/
		this.$el.html( html );
		$( '#app' ).append( this.el );
	},
	toggleActivate:function ( e ) {
		'use strict';
		if ( $( e.target ).prop( 'checked' ) ) {
			this.model.activate();
		} else {
			this.model.deActivate();
		}
	},
	remove        :function () {
		'use strict';
		console.log( 'View Removed!!!' );
		this.$el.remove();
	}
} );
var myView = new MyView( {
	model:myModelItem
} );

/*
 myModelItem.fetch().then( function ( resp, status, qxhr ) {
 'use strict';
 myView.render();
 console.log( 'Loaded. Show:' );
 console.log( 'Name: ' + myModelItem.get( 'firstname' ) + '(Resp: ' + JSON.stringify( resp ) + ')' +
 'qxhr.readyState: ' + qxhr.readyState );
 console.log( 'Updating...' );
 myModelItem.set( 'firstname', updateName );
 myModelItem.save().then( function ( resp, status, qxhr ) {
 console.log( 'Update done. Reloading...' );
 myModelItem.fetch().then( function ( resp, status, qxhr ) {
 myView.render();
 console.log( 'Reloaded.  Show:' );
 console.log( 'Name: ' + myModelItem.get( 'firstname' ) + '(Resp: ' + JSON.stringify( resp ) + ')' +
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
 console.log( 'Name: ' + myModelItem.get( 'firstname' ) + '(Resp: ' + JSON.stringify( resp ) + ')' +
 'qxhr.readyState: ' + qxhr.readyState );
 }, function () {
 console.log( 'Reload Failed!!' );
 } );
 } );
 }, function ( qxhr, error ) {
 'use strict';
 console.log( 'Load failed!! Error: ' + error );
 } );
 */

var $id = 67;
var newModelItem = new MyModelItem( {
	id          :$id,
	firstname   :'SASSYDUDE',
	paymenttoken:'CS1X56IU'
} );
var newView = new MyView( {
	model:newModelItem
} );

newView.render();
/*
setTimeout( function () {
	'use strict';
	newModelItem.destroy().then( function () {

		console.log( 'Deleted user' );
	}, function () {
		console.log( 'Could NOT delete user with id ' + newModelItem.get( 'id' ) );
	} );
}, 3000 );*/


//}

