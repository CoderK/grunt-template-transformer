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

    can_load_template_written_with_html : function(test){
        grunt.file.defaultEncoding = 'utf8';

        var sRawHTML = grunt.file.read('test/resources/template.html').replace(/(\r\n|\n|\r)/gm,"");
        var aExtractedString = sRawHTML.match(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi);
        var nLen = aExtractedString.length;
        var htTemplates = {};
        var sTemplate = null;
        var sId = null;

        for(var i = 0; i < nLen; i++){
            sTemplate = aExtractedString[i];
            sId = sTemplate.match(/<script.*id="(.*)">/)[1];
            htTemplates[sId] = sTemplate;
        }

        grunt.file.write("./tmp/template-test.js", JSON.stringify(htTemplates));

        test.equal(htTemplates.length, undefined);
        test.done();
    }
};


