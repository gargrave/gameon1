module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({

    config: {
      title: 'GameOn',
      srcDir: 'game_on/static/app-src',
      buildDir: 'game_on/static/app-build',
      distDir: 'game_on/static/app-dist',
      date: function() {
        var d = new Date();
        return d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate();
      }
    },

    /*==============================================
     = sass
     ==============================================*/
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          '<%= config.buildDir %>/css/main.css': '<%= config.srcDir %>/css/main.scss'
        }
      }
    },

    /*==============================================
     = cssmin
     ==============================================*/
    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: '<%= config.buildDir %>/css/',
          src: ['*.css'],
          dest: '<%= config.distDir %>/css',
          ext: '.min.css'
        }]
      }
    },

    /*==============================================
     = typescript
     ==============================================*/
    typescript: {
      base: {
        src: ['<%= config.srcDir %>/ts/**/*.ts'],
        dest: '<%= config.buildDir %>/js/',
        options: {
          module: 'commonjs',
          target: 'es5',
          removeComments: true
        }
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

  grunt.registerTask('build', [
    'sass', 'typescript'
  ]);
};
