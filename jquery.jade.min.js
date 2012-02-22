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
(function(a){var b={},c=/^\s*$/,d=/([ \t]*)[^ \t\r\n]/;var e=function(a,f){if(a){return b[a]||(b[a]=e(undefined,f))}else{if(c.test(f)){f=""}var g=f.match(d);if(g){var h=g[1].length,i=new RegExp("^[ \\t]{"+h+"}","gm");f=f.replace(i,"")}return jade.compile(f)}};a.jade=function(b,c,d){if(arguments.length===2){d=c;c=b;b=undefined}else if(arguments.length!==3){throw new Error("Invalid number of arguments: "+arguments.length)}var f=e(b,c);if(Array.isArray(d)){var g=[];for(var h=0,i=d.length;h<i;h++){g.push(a.jade(b,c,d[h]))}return g.join("")}else{return f(d)}};var f=0;a.fn.jade=function(b){var c=a(this[0]);if(!c.length)return a([]);var d=c.data("jade-tpl-name");if(!d){c.data("jade-tpl-name",d="jade-tpl-"+ ++f)}var e=a.jade(d,c.text(),b||{});return a("<div/>").html(e).children()}})(jQuery);