var menuController = ( function () {
	/** Function overview: creates the UL element for each items collection
	 * 	@param submenu : json with items array
	 *   @param level : define if are parents or childs
	 **/
	function createULElement( submenu, level ) {
		var level = level || "parents"; //identify if there are childs
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
		bindEventForMobileMenu();
	};

	/** Function overview: toggle between mobile or desktop
	 * 	@param status : where is the user curently using the app
	 **/
	function _listBehaviorMobile( status ) {
		if ( status === "mobile" ) {
			var parentsList = document.getElementsByClassName( 'parents' );
			for ( var i = 0; i < parentsList.length; i++ ) {
				_addGivenClass( parentsList[ i ], 'parent-mobile' );
				_bindParentAction( parentsList[ i ] );
			};

		} else {
			var list = document.getElementsByClassName( 'parent-mobile' );
			while ( list.length > 0 ) {
				list[ 0 ].classList.remove( 'parent-mobile' );
			}
		}
	};

	/** Function overview: show/hide the submenu
	 * 	@param domObj : DOM element to attach the event
	 **/
	function _bindParentAction( domObj ) {
		domObj.onclick = function () {
			if ( _classExists( this, "open" ) ) {
				_removeGivenClass( this, "open" )
			} else {
				_addGivenClass( this, "open" );
			}
		};
	}

	/** Function overview: show/hide the heading bar for mobile or desktop
	 * 	@param none
	 **/
	function bindEventForMobileMenu() {
		var mobileToogle = document.getElementById( 'menu-toggle' );
		var hugeIcon = document.getElementsByClassName( 'hugeIcon' )[ 0 ];
		mobileToogle.onclick = function () {
			var status = "desktop";
			if ( _classExists( this, "close" ) ) {
				_removeGivenClass( hugeIcon, "active" );
				_removeGivenClass( this, "close" );
			} else {
				_addGivenClass( this, "close" );
				_addGivenClass( hugeIcon, "active" );
				status = "mobile";
			}
			var nav = document.getElementById( 'toolbar' );
			nav.className === "nav" ? nav.className = "nav-mobile" : nav.className = "nav";
			_listBehaviorMobile( status )
		};
	};

	/** Function overview: utility function to validate if the given
	 *	class exists in the given element
	 * 	@param domObj : DOM element to check
	 * 	@param className : class to search
	 **/
	function _classExists( domObj, className ) {
		if ( domObj.classList.length > 1 ) {
			for ( var i = 0; i < domObj.classList.length; i++ ) {
				if ( domObj.classList[ i ] === className )
					return true;
			}
			return false;
		} else {
			return domObj.className === className;
		}
	}

	/** Function overview: utility function to remove the given class name
	 * 	@param domObj : DOM element to check
	 * 	@param className : class to remove
	 **/
	function _removeGivenClass( domObj, className ) {
		domObj.classList.remove( className );
	};

	/** Function overview: utility function to add the given class name
	 * 	@param domObj : DOM element to check
	 * 	@param className : class to add
	 **/
	function _addGivenClass( domObj, className ) {
		var exists = _classExists( domObj, className );
		if ( !exists ) domObj.className += " " + className;

	};

	return {
		createToolbar: createToolbar
	}
} )();
