/*jslint browser: true*/
/*global $, jQuery, Backbone, Underscore, Handlebars, Firebase */

var albums = [
	{
		album :'Houses of the Holy',
		artist:'Led Zeppelin',
		genre :'Hard Rock',
		stars :5
	},
	{
		album :'Uh huh',
		artist:'John Cougar',
		genre :'Folk Rock',
		stars :4
	},
	{
		album :'Holy diver',
		artist:'Ronnie James Dio',
		genre :'Metal',
		stars :5
	}
];

var $source = $('#listTemplate');
var template = Handlebars.compile( $source.html() );
var html = template(albums);
$source.html(html);