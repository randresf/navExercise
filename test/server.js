var expect = require( "chai" ).expect;
var request = require( "request" );
/** Test overview: validate if the get service is working**/
describe( "JSON navigation available", function () {

	var url = "http://localhost:3000/data/nav.json";
	/** Test overview: validate if the get status is 200**/
	it( "returns status 200", function ( done ) {
		request( url, function ( error, response, body ) {
			expect( response.statusCode ).to.equal( 200 );
			done();
		} );
	} );
	/** Test overview: validate if the response body is an object**/
	it( "returns a JSON string", function ( done ) {
		request( url, function ( error, response, body ) {
			expect( JSON.parse( body ) ).to.be.an( 'Object' );
			done();
		} );
	} );

} );
