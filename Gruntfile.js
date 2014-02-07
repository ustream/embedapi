// Gruntfile.js
module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		mocha: {
			all: {
				src: ['tests/testrunner.html'],
			},
			options: {
				run: true
			}
		},

		uglify: {
			all: {
				options: {
					report: 'gzip'
				},
				files: {
					'pkg/ustream-embedapi.min.js': ['src/ustream-embedapi.js']
				}
			}
		}

	});

	// Load grunt mocha task
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['mocha', 'uglify']);
};