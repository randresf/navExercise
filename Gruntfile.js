module.exports = function ( grunt ) {
	// Project configuration.
	grunt.initConfig( {
		//add less compiler to use css in the browser
		less: {
			development: {
				options: {
					paths: [ 'public/less/**/*.less' ]
				},
				files: {
					'public/styles/main.css': 'public/less/alltogether.less'
				}
			}
		}
	} );

	grunt.loadNpmTasks( 'grunt-contrib-less' );
	grunt.registerTask( 'default', [ 'less' ] );

};