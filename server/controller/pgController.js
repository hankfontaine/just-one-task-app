/* eslint-disable comma-dangle */
/* eslint-disable no-tabs */
/* eslint-disable indent */
const { Client } = require('pg');

const connectionString =
	'postgres://ipudzayh:QxX6Haw8-tMjKZ2_-FQjQAZXQhYw35Ag@lallah.db.elephantsql.com/ipudzayh';
const client = new Client({ connectionString });
client.connect();

// static user profile.id for demo:
// const profileId = '725543eb-8fd4-4e43-b5ac-2374c16900ef';
// static user task for demo:
// const task = 'do my laundry';

const pgController = {
	// GET list of user's completed tasks
	getTasks: async (req, res, next) => {
		console.log(req.params.id);

		const query = await client.query(
			`SELECT * FROM task JOIN profile ON task.profile_id = profile.id WHERE profile.id = '${req.params.id}';`
		);
		try {
			res.locals.table = query.rows.map((task) => [
				task.task_desc,
				task.updated_at,
			]);
			return next();
		} catch {
			return next({
				log: 'Express failed to GET database entries',
				status: 400,
				message: { err: 'An error occurred' },
			});
		}
	},
	// POST user's current task
	postTask: async (req, res, next) => {
		await client.query(
			`INSERT INTO task (task_desc, profile_id) VALUES ('${req.params.task.replaceAll(
				'_',
				' '
			)}', '${req.params.id}');`
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
	// UPDATE user's current task completion date
	updateTask: async (req, res, next) => {
		await client.query(
			`UPDATE task SET updated_at = NOW() WHERE id IN (SELECT id FROM task WHERE profile_id = '${req.params.id}' ORDER BY created_at DESC LIMIT 1);`
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
	// DELETE user's current task
	deleteTask: async (req, res, next) => {
		await client.query(
			`DELETE FROM task WHERE id IN (SELECT id FROM task WHERE profile_id = '${req.params.id}' ORDER BY created_at DESC LIMIT 1);`
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
