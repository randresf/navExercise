var httpServices = {
	/** Function overview: get the json structure to create the  navigation menu
	 * 	@param uri : URL where the data is
	 **/
	getJsonStructure: function ( uri ) {
		var request = new XMLHttpRequest();
		request.onreadystatechange = function () {
			if ( request.readyState === 4 && request.status === 200 ) {
				switch ( request.status ) {
					// on success
				case 200:
					var response = JSON.parse( request.responseText );
					menuController.createToolbar( response );
					break;
					// on error
				default:
					console.error( request.status + ': Error.' );
					break;
				}
			}
		};
		// Make the request
		request.open( 'GET', uri );
		request.send();
	}
};
