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
		bindEventForMobileMenu();
	};

	function bindEventForMobileMenu() {
		var mobileToogle = document.getElementById( 'menu-toggle' );
		mobileToogle.onclick = function () {
			_classExists(this, "close") ? _removeGivenClass(this, "close") : _addGivenClass(this, "close");	
			var nav = document.getElementById( 'toolbar' );
			nav.className === "nav" ? nav.className = "nav-mobile" : nav.className = "nav";
		};
	};

	function _classExists(domObj, className) {
		if (domObj.classList.length > 1) {
			for (var i = 0; i < domObj.classList.length; i++) {
				if(domObj.classList[i] === className)
					return true;
			}
			return false;
		} else {
			return domObj.className === className;
		}
	}
	
	function _removeGivenClass(domObj, className){
		domObj.classList.remove(className);
	};

	function _addGivenClass(domObj, className){	
		var exists = _classExists(domObj, className);
		if(!exists) domObj.className += " " + className;
		
	};

	return {
		createToolbar: createToolbar
	}
} )();
