/*
 * template-loader
 * https://github.com/root/template-loader
 *
 * Copyright (c) 2013 CoderK
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks
    grunt.createVariableDeclaration = function (htAssign, sResult) {
        if(!htAssign.variable){
            return sResult;
        }

        sResult = "var " + htAssign.variable + " = ";
        return sResult;
    };

    grunt.createObjectDeclaration = function (htAssign, sResult) {
        if(!htAssign.object){
            return sResult;
        }

        var aFragments = htAssign.object.split(".");
        var sNamespace = "";
        var sPrefix = "";
        var nLengthOfFragments = aFragments.length;

        for (var i = 0; i < nLengthOfFragments- 1; i++) {
            sPrefix += aFragments[i];
            sNamespace += sPrefix + " = " + sPrefix + " || {}; \n";
            sPrefix += ".";
        }

        sResult = "var " + sNamespace + "\n" + sResult;
        sResult += sPrefix  + aFragments[nLengthOfFragments - 1] + " = ";

        return sResult;
    };

    grunt.parseSourceHTML = function (src) {
        var aExtractedScripts = src.match(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi);
        var nLen = aExtractedScripts.length;
        var htTemplates = {};
        var sTemplate = null;
        var sSerializedCode = null;
        var sId = null;

        for (var i = 0; i < nLen; i++) {
            sTemplate = aExtractedScripts[i];
            sId = sTemplate.match(/<script.*id="(.*)">/)[1];
            sSerializedCode = serialize(sTemplate);
            htTemplates[sId] = lrTrim(sSerializedCode);
        }
        return htTemplates;
    };

    function serialize(string){
        return string.replace(/[\r\n]/gi, "").match(/<script[^>]*>(.*?)<\/script>/)[1];
    }

    function lrTrim(string){
        return string.replace(/^\s+/, "").replace(/^\s+/, "");
    }

    grunt.registerMultiTask('template_transformer', 'Loader for JavaScript template written in HTML', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
          punctuation: '.',
          separator: ', '
        });

        grunt.file.defaultEncoding = 'utf8';

        // Iterate over all specified file groups.
        this.files.forEach(function(f) {
          // Concat specified files.
          var src = f.src.filter(function (filepath) {
              // Warn on and remove invalid source files (if nonull was set).
              if (!grunt.file.exists(filepath)) {
                  grunt.log.warn('Source file "' + filepath + '" not found.');
                  return false;
              } else {
                  return true;
              }
          }).map(function (filepath) {
                  // Read file source.
                  return grunt.file.read(filepath);
          }).join(grunt.util.normalizelf(options.separator));


          var htTemplates = grunt.parseSourceHTML(src);
          var sResult = "";

          // Handle options.
          var htAssign = options.assign;
          sResult = grunt.createVariableDeclaration(htAssign, sResult);
          sResult = grunt.createObjectDeclaration(htAssign, sResult);
          sResult += JSON.stringify(htTemplates);

          // Write the destination file.
          grunt.file.write(f.dest, sResult);

          // Print a success message.
          grunt.log.writeln('File "' + f.dest + '" created.');
        });
  });

};
