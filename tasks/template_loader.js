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

  grunt.registerMultiTask('template_loader', 'Loader for JavaScript template written by XML', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      punctuation: '.',
      separator: ', '
    });

    grunt.file.defaultEncoding = 'utf8';

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {

      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      }).join(grunt.util.normalizelf(options.separator));


        var aExtractedString = src.match(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi);
        var nLen = aExtractedString.length;
        var htTemplates = {};
        var sTemplate = null;
        var sResult = null;
        var sId = null;

        for(var i = 0; i < nLen; i++){
            sTemplate = aExtractedString[i];
            sId = sTemplate.match(/<script.*id="(.*)">/)[1];
            htTemplates[sId] = sTemplate;
        }

      // Handle options.
        var htAssign = options.assign;

        if(htAssign.variable){
            sResult = "var " + htAssign.variable + " = ";
        }

        if(htAssign.object){
            sResult = sResult + htAssign.object + " = ";
        }

        sResult += JSON.stringify(htTemplates);

      // Write the destination file.
      grunt.file.write(f.dest, sResult);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
