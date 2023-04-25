/* eslint-disable comma-dangle */
/* eslint-disable no-tabs */
/* eslint-disable indent */
const { Client } = require('pg');

const connectionString =
	'postgres://ipudzayh:QxX6Haw8-tMjKZ2_-FQjQAZXQhYw35Ag@lallah.db.elephantsql.com/ipudzayh';
const client = new Client({ connectionString });
client.connect();

const pgController = {
	postListItem: async (req, res, next) => {
		// const { listItem } = req.body;
		// const response = await client.query(
		// 	'INSERT INTO example_table (date, message)VALUES ($1, $2)',
		// 	[Date.now(), listItem]
		// );
		// console.log(response);
		return next();
	},

	getList: async (req, res, next) => {
		const query = await client.query(
			"SELECT task_desc FROM task JOIN profile ON task.profile_id = profile.id WHERE profile.id = '725543eb-8fd4-4e43-b5ac-2374c16900ef';"
		);
		try {
			res.locals.table = query.rows;
			return next();
		} catch {
			return next({
				log: 'Express error handler caught unknown middleware error',
				status: 400,
				message: { err: 'An error occurred' },
			});
		}
	},

	updateList: async (req, res, next) => {
		// const id = req.params.id;
		// const { message } = req.body;
		// const response = await client.query(
		// 	'UPDATE example_table SET message = "Hello, everyone!" WHERE id = 1;',
		// 	[message, id]
		// );
		// console.log(response);
		return next();
	},

	deleteListItem: async (req, res, next) => {
		// const id = req.params.id;
		// const response = await client.query(
		// 	'DELETE FROM example_table WHERE id = 1;',
		// 	[id]
		// );
		// console.log(response);
		return next();
	},
};

module.exports = pgController;
