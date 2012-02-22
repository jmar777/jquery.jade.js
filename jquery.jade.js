/*!
 * jQuery Jade Plugin v0.1.2
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
	var cache = {},
		// matches templates that are all whitespace
		wsReg = /^\s*$/,
		// matches the first line with template markup, and captures any indentation
		firstMarkupReg = /([ \t]*)[^ \t\r\n]/;
	// compile a given template, and cache it if a non-falsy name was provided
	var compile = function(name, template) {
		// is this a named template?
		if (name) {
			// then we're caching
			return cache[name] || (cache[name] = compile(undefined, template));
		} else {
			// don't brick on all whitespace templates
			if (wsReg.test(template)) { template = ''; }

			// allow for indented template markup
			var firstMarkupLine = template.match(firstMarkupReg);
			if (firstMarkupLine) {
				var wsLength = firstMarkupLine[1].length,
					reg = new RegExp('^[ \\t]{' + wsLength + '}', 'gm');
				template = template.replace(reg, '');
			}

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
				buf.push($.jade(name, template, locals[i]));
			}
			return buf.join('');
		} else {
			return fn(locals);
		}
	};

	var inc = 0;
	$.fn.jade = function(locals) {
		var $tmpl = $(this[0]);
		if (!$tmpl.length) return $([]);

		var name = $tmpl.data('jade-tpl-name');
		if (!name) {
			$tmpl.data('jade-tpl-name', (name = 'jade-tpl-' + ++inc));
		}

		var raw = $.jade(name, $tmpl.text(), locals || {});

		// @todo: is this the best way to do this? will we lose top-level text nodes?
		return $('<div/>').html(raw).children();
	};

})(jQuery);