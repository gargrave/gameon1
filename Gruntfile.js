module.exports = function(grunt) {
  grunt.initConfig({

    config: {
      title: 'GameOn',
      date: function() {
        var d = new Date();
        return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
      }
    },

    /*=============================================
     = uglify
     =============================================*/
    uglify: {
      main: {
        options: {
          mangle: false,
          banner: '/* <%= config.title %> | built on <%= config.date() %> */'
        },
        files: [{
          'game_on/static/app/app.min.js': [
            'game_on/static/app/app.js',
            'game_on/static/app/**/*.module.js',
            'game_on/static/app/**/*.ctrl.js',
            'game_on/static/app/**/*.svc.js',
            'game_on/static/app/**/*.menus.js',
            'game_on/static/app/**/*.dir.js'
          ]
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('build', ['uglify']);
};
