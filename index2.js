
let controllers = require( './controllers/index' );
let bodyParser = require( 'body-parser' );
let express = require( 'express' );
let bb = require( 'express-busboy' );
require('source-map-support').install();
let db = require('./db');

let app = express();
app.set( 'trust proxy', true );

// Show error information
process.on( 'unhandledRejection', (reason, p) => {
	console.log( 'Unhandled promise error:  ' + p + reason );
	console.log( 'stack: ' + reason.stack );
} );

// Allow file uploads
app.use( bodyParser.urlencoded({ extended: true }) );
bb.extend( app, {
	upload: true
} );
app.use( controllers );

// Static files for the demo. Use nginx or similar for real deploys
//app.use( express.static('public') );
//app.use( '/examples', express.static('examples') );

// 500 Error
app.use( function( err, req, res, next ) {
	res
		.status(500)
		.send('Something broke!');
} );

// 404 Error
app.use( function( req, res ) {
	res
		.status(404)
		.send('Sorry cant find that!');
} );

// Listening
let port = process.env.PORT || 3000;

app.listen( port, function () {
    console.log( 'DataTables Editor demo - navigate to http://localhost:8081/' );
} );

// Test the database connection on startup by getting a list of table names in the db
// This can safely be removed if you are happy with your db connection configur