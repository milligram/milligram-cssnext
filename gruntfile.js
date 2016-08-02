module.exports = function ( grunt ) {

	'use strict';


	// ================================================================
	// CONFIG TASKS
	// ================================================================

	// Define the configuration
	grunt.initConfig({

		// Specifics of npm's package.json handling
		pkg: grunt.file.readJSON( 'package.json' ),

		// Banner
		banner:
			'/*!\n'+
			' * Milligram v<%= pkg.version %>\n'+
			' * <%= pkg.homepage %>\n'+
			' *\n'+
			' * Copyright (c) '+new Date().getFullYear()+' CJ Patoilo\n'+
			' * Licensed under the <%= pkg.license %> license\n'+
			'*/\n\n',

		// DEFAULT TASK
		// ================================================================

		// Watch files and process the above tasks
		watch: {
			options: {
				livereload: false
			},
			grunt: {
				files: [
					'gruntfile.js'
				],
				options: {
					reload: true
				}
			},
			postcss: {
				files: [
					'src/**/*.css'
				],
				tasks: [
					'postcss',
					'cssnano'
				]
			}
		},

		// BUILD TASKS
		// ================================================================

		// Clear files and folders
		clean: {
			all: [
				'dist'
			],
			css: [
				'dist/**/*.css',
				'dist/**/*.map'
			]
		},

		// Compile CSS files with POSTCSS CSSNEXT
		postcss: {
			options: {
				map: {
          			inline: false, // save all sourcemaps as separate files...
          			annotation: 'dist/' // ...to the specified directory
      			},
			  processors: [
				  require("postcss-import")(),
				  require('postcss-cssnext')()
			  ]
		  },
		  dest: {
			  files: {
			  	'dist/milligram.css': 'src/milligram.css'
		  	}
		  }
		},

		cssnano: {
		    options: {
		      sourcemap: false,
			  safe: true
		    },
		    dist: {
		      files: {
		        'dist/milligram.min.css': 'dist/milligram.css'
		      }
		    }
		},

		// Copy files and folders.
		copy: {
			all: {
				files: [{
					expand: true,
					cwd: 'src',
					src: '**',
					dest: 'dist'
				}]
			}
		}
	});


	// ================================================================
	// REGISTER TASKS
	// ================================================================

	// Default task
	grunt.registerTask( 'default', [
		'build',
		'watch'
	]);

	// Build task
	grunt.registerTask( 'build', [
		'clean:all',
		'postcss',
		'cssnano',
		'clean:css',
		'copy'
	]);


	// ================================================================
	// LOAD TASKS
	// ================================================================

	// Automatically loading Grunt tasks
	require( 'load-grunt-tasks' )( grunt );

	// Display the elapsed execution time of Grunt tasks
	require( 'time-grunt' )( grunt );


};
