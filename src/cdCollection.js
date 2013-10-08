/*jslint browser: true*/
/*global $, jQuery, Backbone, Underscore, Handlebars, Firebase */

/*** Model and View ***/
var CdModel = Backbone.Model.extend( {
	initialize:function () {
		'use strict';
		console.log( 'CdModel initialized' );
	}
} );

var CdView = Backbone.View.extend( {
	tagName  :'li',
	hTemplate:Handlebars.compile( $( '#cdlist-template' ).html() ),

	initialize:function () {
		'use strict';
		this.listenTo( this.model, 'change', this.render );
		this.listenTo( this.model, 'remove', this.remove );
		console.log( 'CdView initialized' );
	},

	render    :function () {
		'use strict';
		var html = this.hTemplate( this.model.attributes );
		this.$el.html( html );
		return  this;
	}
} );

/*** Collection ***/
var CdCollection = Backbone.Firebase.Collection.extend( {
	model   :CdModel,

	firebase:'https://newstore.firebaseIO.com'
} );

var cdCollection = new CdCollection();

/*** Collection View ***/
var CdCollectionView = Backbone.View.extend( {
	el:$( '#out' ),

	initialize:function () {
		'use strict';
		this.listenTo( this.collection, 'add', this.addCd );
		this.listenTo( this.collection, 'reset', this.addAll );
	},

	addCd:function ( cd ) {
		'use strict';
		var cdView = new CdView( {model:cd} );
		this.$el.append( cdView.render().el );
	},

	addAll:function () {
		'use strict';
		this.collection.forEach( this.addCd, this );
	},

	render:function () {
		'use strict';
		this.addAll();
	}
} );

var cdViews = new CdCollectionView( {collection:cdCollection} );

/*** App View ***/
var AppView = Backbone.View.extend( {
	el:$( '#app' ),

	initialize:function () {
		'use strict';
	},

	events:{
		"keypress #new-cd":"addCd",
		"click #del"      :"deleteCd"
	},

	addCd:function ( e ) {
		'use strict';
		if ( +e.keyCode !== 13 ) {
			return;
		}
		cdCollection.add( this.readCdData() );
		e.stopPropagation();
	},

	readCdData:function () {
		'use strict';
		var $album = this.$( 'input[name="album"]' ), $artist = this.$( 'input[name="artist"]' ), $genre = this.$( 'input[name="genre"]' ), $stars = this.$( 'input[name="stars"]' ), obj = {
			album :$album.val(),
			artist:$artist.val(),
			genre :$genre.val(),
			stars :$stars.val()
		};
		$album.val( '' ).focus();
		$artist.val( '' );
		$genre.val( '' );
		$stars.val( '' );
		return obj;

	},

	deleteCd:function ( e ) {
		'use strict';
		console.log( 'Got delete CD event', e.target );
		cdCollection.remove( $( '[type="checkbox"]' ).find( 'checked' ) );
		e.stopPropagation();
	}
} );

var app = new AppView();

