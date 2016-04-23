module.exports = function(grunt) {
	// Project configuration.
	const c = 'js/control/';
	grunt.initConfig({
		// sass: {
		// 	css: {
		// 		src: 'prebuild/scss/styles.scss',
		// 		dest: 'build/css/styles.css',
		// 	}
		// },
		concat: {
			js: {
				src: [`${c}start.js`, `${c}extensions.js`, `${c}constructors.js`, `${c}init.js`, 'js/*.js', `${c}/end.js`],
				dest: 'build/js/scripts.js',
			},
			// scss: {
			// 	src: ['scss/*.scss'],
			// 	dest: 'prebuild/scss/styles.scss',
			// },
		},
		// watch: {
		// 	js: {
		// 		files: ['js/*.js'],
		// 		tasks: ['concat'],
		// 	},
			// scss: {
			// 	files: ['scss/*.scss'],
			// 	tasks: ['concat'],
			// },
			// css: {
			// 	files: ['prebuild/scss/styles.scss'],
			// 	tasks: ['sass'],
			// },
		// },
		uglify: {
			options: {
				mangle: {
					except: ['m', 'jscolor']
				}
			},
			my_target: {
				files: {
					'build/js/scripts.min.js': ['build/js/scripts.js']
				}
			}
		}
	});
	// grunt.loadNpmTasks('grunt-contrib-compass');
	// grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// grunt.loadNpmTasks('grunt-contrib-watch');
	// grunt.registerTask('default', ['compass']);
	// grunt.registerTask('default', ['concat', 'sass', 'watch']);
};