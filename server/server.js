/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable no-tabs */
const express = require('express');
const pgController = require('./controller/pgController');
const path = require('path');
// const bcrypt = require('bcrypt'); // to be used for auth

// set up server
const app = express();
const PORT = 3000;
app.use(express.json());
// app.use('/', express.static(path.join(__dirname, './public')));

// static user profile.id for demo:
// const profileId = '725543eb-8fd4-4e43-b5ac-2374c16900ef';
// static user task for demo:
// const task = 'do my laundry';

app.get('/:id', pgController.getTasks, (req, res) => {
	console.log(res.locals.table);
	res.status(200).json(res.locals.table);
});

// POST REQUEST handler:
app.post(
	'/:id/:task',
	pgController.postTask,
	pgController.getTasks,
	(req, res) => {
		console.log(res.locals.table);
		res.status(200).json(res.locals.table);
	}
);

// PATCH REQUEST handler:
app.patch(
	'/:id',
	pgController.updateTask,
	pgController.getTasks,
	(req, res) => {
		console.log(res.locals.table);
		res.status(200).json(res.locals.table);
	}
);
// DELETE REQUEST handler:
app.delete(
	'/:id',
	pgController.deleteTask,
	pgController.getTasks,
	(req, res) => {
		console.log(res.locals.table);
		res.status(200).json(res.locals.table);
	}
);
// 404 handler:
app.get('/', (req, res) => res.status(404).send('Error: page not found'));
// ERROR handler:
app.use((err, req, res, next) => {
	const defaultErr = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error occurred' },
	};
	const errorObj = Object.assign(defaultErr, err);
	console.log(errorObj.log);
	return res.status(errorObj.status).send(JSON.stringify(errorObj.message));
});
// server listen:
app.listen(PORT, () => {
	console.log(`listening on port: ${PORT}`);
});
