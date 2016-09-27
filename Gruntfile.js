// Gruntfile.js
module.exports = function (grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		mocha: {
			all: {
				src: ['tests/testrunner.html']
			},
			options: {
				run: true
			}
		},

		uglify: {
			all: {
				options: {

				},
				files: {
					'dist/ustream-embedapi.min.js': ['src/ustream-embedapi.js'],
					'pkg/ustream-embedapi.min.js': ['src/ustream-embedapi.js'] // soon to be deprecated
				}
			}
		},

		release: {
			options: {
				bump: true, //default: true
				file: 'package.json', //default: package.json
				add: true, //default: true
				commit: true, //default: true
				push: true, //default: true
				tag: true, //default: true
				pushTags: true, //default: true
				npm: false, //default: true
				npmtag: false, //default: no tag
				tagName: 'release-<%= version %>'
			}
		}

	});

	// Load grunt mocha task
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-release');

	grunt.registerTask('default', ['mocha', 'uglify']);
};