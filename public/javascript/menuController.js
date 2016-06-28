var menuController = ( function () {
	function createULElement( submenu, level ) {
		var level = level || "parents";
		if ( submenu.length ) {
			var initialTag = document.createElement( 'ul' );
			submenu.forEach( function ( option, index ) {
				var tagLi = document.createElement( 'li' );
				var link = document.createElement( 'a' );
				link.innerHTML = option.label;
				tagLi.appendChild( link );
				if ( option.items && option.items.length ) {
					var tagULSubmenu = createULElement( option.items, "childs" );
					tagLi.appendChild( tagULSubmenu );
					tagLi.className += level;
					tagLi.setAttribute( "tabindex", "1" );
				} else {
					link.href = option.url;
				}
				initialTag.appendChild( tagLi );
			} );
			return initialTag;
		}
	}
	/** Function overview: create the  navigation menu
	 * 	@param data : json with all the information for the toolbar
	 **/
	function createToolbar( data ) {
		var htmlMenu = createULElement( data.items );
		document.getElementById( 'toolbar' ).appendChild( htmlMenu );
	};

	/*NavModule.mobileToggleBehaviour();
	NavModule.hideMenu();*/
	return {
		createToolbar: createToolbar
	}
} )();
