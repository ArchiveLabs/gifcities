module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      files: [
        'src/**/*.js',
        'src/**/*.jsx'
      ],
      tasks: ['browserify']
    },
    browserify: {
      dist: {
        options: {
           transform: [
             ['babelify', {presets: ['es2015', 'react', 'stage-1']}]
           ]
        },
        src: ['src/app.js'],
        dest: 'web/app.build.js',
      }
    },
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.registerTask('default', ['browserify']);
};
