module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({

    config: {
      title: 'GameOn',
      srcDir: 'game_on/static/app-src',
      buildDir: 'game_on/static/app-build',
      distDir: 'game_on/static/app-dist',
      libsDir: 'game_on/static/libs',
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
      },
      tests: {
        src: ['test/*.spec.ts'],
        dest: 'test/js/',
        options: {
          module: 'commonjs',
          target: 'es5',
          removeComments: true
        }
      }
    },

    /*==============================================
     = clean
     ==============================================*/
    clean: {
      main: [
        '<%= config.buildDir %>/*',
        '<%= config.distDir %>/*'
      ]
    },

    /*=============================================
     = uglify
     =============================================*/
    uglify: {
      main: {
        options: {
          mangle: false,
          banner: '/* \n<%= config.title %> \nbuilt on <%= config.date() %> \n*/\n'
        },
        files: [{
          '<%= config.distDir %>/app.min.js': [
            '<%= config.buildDir %>/js/app.js',
            '<%= config.buildDir %>/js/**/*.module.js',
            '<%= config.buildDir %>/js/**/*.filters.js',
            '<%= config.buildDir %>/js/**/*.ctrl.js',
            '<%= config.buildDir %>/js/**/*.svc.js',
            '<%= config.buildDir %>/js/**/*.menus.js',
            '<%= config.buildDir %>/js/**/*.dir.js'
          ]
        }]
      }
    },

    /*=============================================
     = copy
     =============================================*/
    copy: {
      libs: {
        files: [{
          expand: true,
          flatten: true,
          src: [
            '<%= config.libsDir %>/css/bootstrap-datepicker3.min.css'
          ],
          dest: '<%= config.distDir %>/libs'
        }]
      }
    },

    /*=============================================
     = watch
     =============================================*/
    watch: {
      sass: {
        files: ['<%= config.srcDir %>/css/**/*.scss'],
        tasks: ['sass']
      },
      ts: {
        files: [
          '<%= config.srcDir %>/ts/**/*.ts',
          'test/**/*.spec.ts'
        ],
        tasks: ['typescript']
      }
    }
  });

  grunt.registerTask('build', [
    'sass', 'typescript'
  ]);
  grunt.registerTask('dist', [
    'sass', 'cssmin',
    'typescript', 'uglify',
    'copy'
  ]);
};
