let knex = require('knex');
let dbConfig = {
	client: 'mysql',

	connection: {
		user: 'admin',
		password: 'Abel3186',
		database: 'ligma',
		host: 'database-2.cipbolbrtdst.us-east-2.rds.amazonaws.com',
		filename: '', // Only used for SQLite
		dateStrings: true
	}
};
// Need a bit of customisation for Oracle to use ISO date stamps
if ( dbConfig.client === 'oracledb') {
	dbConfig.fetchAsString = [ 'date', 'number', 'clob' ];
	dbConfig.pool = {
		afterCreate: function (conn, done) {
			conn.execute("ALTER SESSION SET NLS_DATE_FORMAT='YYYY-MM-DD HH24:MI:SS'", function (err) {
				if (err) {
					done(err, conn);
				}
				else {
					done(err, conn);
				}
			});
		}
	};
}

module.exports = knex(dbConfig);
