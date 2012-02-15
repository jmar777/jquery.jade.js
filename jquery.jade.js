/*!
 * jQuery Jade Plugin v0.1.0
 * http://github.com/jmar777/jquery.jade.js
 * Requires:
 *  - jQuery >= 1.4.2 (http://jquery.com)
 *  - jade >= 0.20.0+ (https://github.com/visionmedia/jade)
 *
 * Copyright 2012, Jeremy Martin <http://github.com/jmar777>
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
(function($) {

	// for storing compiled templates
	var cache = {};
	// compile a given template, and cache it if a non-falsy name was provided
	var compile = function(name, template) {
		// is this a named template?
		if (name) {
			// then we're caching
			return cache[name] || (cache[name] = compile(undefined, template));
		} else {
			// no name, just compile it
			return jade.compile(template);
		}
	}

	$.jade = function(name, template, locals) {
		// name is optional
		if (arguments.length === 2) {
			locals = template;
			template = name;
			name = undefined;
		} else if (arguments.length !== 3) {
			throw new Error('Invalid number of arguments: ' + arguments.length);
		}
		var fn = compile(name, template);

		// handle arrays
		if (Array.isArray(locals)) {
			var buf = [];
			for (var i = 0, len = locals.length; i < len; i++) {
				buf.push($.jade(template, locals[i]));
			}
			return buf.join('');
		} else {
			return fn(locals);
		}
	};

	var inc = Math.floor(Math.random()*10000);
	$.fn.jade = function(locals) {
		var $tmpl = $(this[0]);
		// i guess an empty string makes sense here?
		if (!$tmpl.length) return '';

		var name = $tmpl.data('jade-tpl-name');
		if (!name) {
			$tmpl.data('jade-tpl-name', (name = 'jade-tpl' + ++inc));
		}

		var raw = $.jade(name, $tmpl.text(), locals || {});

		// @todo: is this the best way to do this? will we lose top-level text nodes?
		return $('<div/>').html(raw).children();
	};

})(jQuery);