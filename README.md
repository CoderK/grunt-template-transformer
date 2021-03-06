# template-transformer

> Module for Transforming JavaScript template to JSON Object

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-template-transformer --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-template-transformer');
```

## The "template_transformer" task

### Overview
In your project's Gruntfile, add a section named `template_transformer` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  template_transformer: {
    options: {
      // Task-specific options go here.
      }
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.assign.variable
Type: `String`

A string specifying variable name to be assigned

#### options.assign.object
Type: `String`

A string specifying object name to be assigned.


### Usage Examples

#### Custom Options

```js
grunt.initConfig({
  template_transformer: {
    custom_options: {
        options: {
            assign : {
                variable : "TemplateJSON",
                object : "foo.com.TemplateJSON"
            }
        },
        files: {
            'tmp/template-context.js': ["test/resources/template.html"]
        }
    }
  },
});
```
'test/resources/template.html'

```html
<!DOCTYPE html>
<html>
<head>
    <title>Template for test</title>
</head>
<body>

<script type="text/template" id="test1">
    <div></div>
</script>

<script type="text/template" id="test2">
    <a></a>
</script>

</body>
</html>
```

When this example task is executed, it will transform HTML file into js on the below.

'template-context.js'

```js
var foo = foo || {};
foo.com = foo.com || {};

var TemplateJSON = foo.com.TemplateJSON = {"test1":"<script type=\"text/template\" id=\"test1\">\n    <div></div>\n</script>","test2":"<script type=\"text/template\" id=\"test2\">\n    <a></a>\n</script>"}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
