/* eslint-disable comma-dangle */
/* eslint-disable no-tabs */
/* eslint-disable indent */
const { Client } = require('pg');

// for demonstrative purposes, this is the ID I'll be using in my project.
// const PROFILE_ID = '725543eb-8fd4-4e43-b5ac-2374c16900ef';

const connectionString =
	'postgres://ipudzayh:QxX6Haw8-tMjKZ2_-FQjQAZXQhYw35Ag@lallah.db.elephantsql.com/ipudzayh';
const client = new Client({ connectionString });
client.connect();

const pgController = {
	getTasks: async (req, res, next) => {
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

	postTask: async (req, res, next) => {
		await client.query(
			"INSERT INTO task (task_desc, profile_id) VALUES ('say hi to my friends', '725543eb-8fd4-4e43-b5ac-2374c16900ef');"
		);
		try {
			// console.log(query);
			// res.locals.table = query;
			return next();
		} catch {
			return next({
				log: 'Express error handler caught unknown middleware error',
				status: 400,
				message: { err: 'An error occurred' },
			});
		}
	},

	updateTask: async (req, res, next) => {
		// const id = req.params.id;
		// const { message } = req.body;
		// const response = await client.query(
		// 	'UPDATE example_table SET message = "Hello, everyone!" WHERE id = 1;',
		// 	[message, id]
		// );
		// console.log(response);
		return next();
	},

	deleteTask: async (req, res, next) => {
		await client.query(
			"DELETE FROM task WHERE id IN (SELECT id FROM task WHERE profile_id = '725543eb-8fd4-4e43-b5ac-2374c16900ef' ORDER BY created_at DESC LIMIT 1);"
		);
		try {
			// console.log(query);
			// res.locals.table = query;
			return next();
		} catch {
			return next({
				log: 'Express error handler caught unknown middleware error',
				status: 400,
				message: { err: 'An error occurred' },
			});
		}
	},
};

module.exports = pgController;
