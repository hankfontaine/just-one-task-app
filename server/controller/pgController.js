/* eslint-disable comma-dangle */
/* eslint-disable no-tabs */
/* eslint-disable indent */
const { Client } = require('pg');

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
				log: 'Express failed to GET database entries',
				status: 400,
				message: { err: 'An error occurred' },
			});
		}
	},

	postTask: async (req, res, next) => {
		await client.query(
			"INSERT INTO task (task_desc, profile_id) VALUES ('clean my room', '725543eb-8fd4-4e43-b5ac-2374c16900ef');"
		);
		try {
			return next();
		} catch {
			return next({
				log: 'Express failed to POST task',
				status: 400,
				message: { err: 'An error occurred' },
			});
		}
	},

	updateTask: async (req, res, next) => {
		await client.query(
			"UPDATE task SET updated_at = NOW() WHERE id IN (SELECT id FROM task WHERE profile_id = '725543eb-8fd4-4e43-b5ac-2374c16900ef' ORDER BY created_at DESC LIMIT 1);"
		);
		try {
			return next();
		} catch {
			return next({
				log: 'Express failed to PATCH database entry with completion date',
				status: 400,
				message: { err: 'An error occurred' },
			});
		}
	},

	deleteTask: async (req, res, next) => {
		await client.query(
			"DELETE FROM task WHERE id IN (SELECT id FROM task WHERE profile_id = '725543eb-8fd4-4e43-b5ac-2374c16900ef' ORDER BY created_at DESC LIMIT 1);"
		);
		try {
			return next();
		} catch {
			return next({
				log: 'Express failed to DELETE current database entry',
				status: 400,
				message: { err: 'An error occurred' },
			});
		}
	},
};

module.exports = pgController;
