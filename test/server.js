var expect = require( "chai" ).expect;
var request = require( "request" );

describe( "JSON navigation available", function () {

	var url = "http://localhost:3000/data/nav.json";

	it( "returns status 200", function ( done ) {
		request( url, function ( error, response, body ) {
			expect( response.statusCode ).to.equal( 200 );
			done();
		} );
	} );

	it( "returns a JSON string", function ( done ) {
		request( url, function ( error, response, body ) {
			expect( JSON.parse( body ) ).to.be.an( 'Object' );
			done();
		} );
	} );

} );
