# Jade for jQuery

Jade for jQuery is a lightweight jQuery plugin providing a friendly API for using the
[jade](http://jade-lang.com) template engine.

## Features

* Simple API
* Adheres to jQuery plugin conventions
* Caches compiled templates for more better performance

## Dependencies

* [jQuery](http://jquery.com) >= 1.4.2
* [jade](http://jade-lang.com) >= 0.20.0

## Getting Started

Some simple examples of using jade for jQuery are provided below. Please note that some working example pages are
also provided in `/examples`.

### Basic Usage

    <script id="my-template" type="text/x-jade">
    h1 Hello #{name}!
    </script>
    
    <script type="text/javascript">
        var data = { name: 'World' };
        $('#my-template').jade(data).appendTo('body');
    </script>

### Using the API Directly

Jade for jQuery exposes the `$.jade` for times when inline template tags aren't desired.  As shown below, this
method will compile the provided template and render it using the provided data.

    var template = 'h1 Hello #{name}!',
        data = { name: 'World' },
        html = $.jade(template, data);
    $('body').append(html);

Please note that the code above will not actually cache the compiled template, though. If it is known ahead of time
that a given template will be used repeatedly, a template name can be provided as well, which will be used as a
cache key for the compiled template:

    var template = 'h1 Hello #{name}!',
        templateName = 'header-template',
        data = { name: 'World' },
        html = $.jade(templateName, template, data);
    $('body').append(html);

## Todo

  * Allow template markup inside of script tags to be indented
  * A test suite

## Licensing

Copyright 2012, Jeremy Martin <http://github.com/jmar777>
Dual licensed under the MIT or GPL Version 2 licenses.