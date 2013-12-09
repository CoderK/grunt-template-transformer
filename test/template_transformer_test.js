'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.template_loader = {
    setUp: function(done) {
        // setup here if necessary
        done();
    },

    can_create_variableDeclaration_string : function(test){
        // given
        // when
        var sVariableDeclaration = grunt.createVariableDeclaration({
            variable : "foo"
        }, "");

        // then
        test.equal(sVariableDeclaration, "var foo = ");
        test.done();
    },

    can_create_objectDeclaration_string : function(test){
        // given
        // when
        var sObjectDeclaration = grunt.createObjectDeclaration({
            object : "foo.bar.Template"
        }, "");

        // then
        test.equal(sObjectDeclaration, 'var foo = foo || {}; \nfoo.bar = foo.bar || {}; \n\nfoo.bar.Template = ');
        test.done();
    },

    can_parse_scriptTag_in_the_HTML_file : function(test){
        // givn
        var sSourceHTML = grunt.file.read('test/resources/template.html');

        // when
        var htTemplates = grunt.parseSourceHTML(sSourceHTML);

        // then
        test.equal(htTemplates.test1, '<div></div>');
        test.equal(htTemplates.test2, '<a></a>');

        test.done();
    }

};


