/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable no-tabs */
const express = require('express');
const pgController = require('./controller/pgController');
const path = require('path');
// const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/', express.static(path.join(__dirname, './public')));

// for demonstrative purposes, this is the ID I'll be using in my project.
// const PROFILE_ID = '725543eb-8fd4-4e43-b5ac-2374c16900ef';

app.get('/', pgController.getList, (req, res) => {
	console.log(res.locals.table);
	res.status(200).json(res.locals.table);
});

// app.post('/test', pgController.postListItem, (req, res) => {
// 	return res.status(200).json({ recieved: true });
// });

// app.delete('/test/:id', pgController.deleteListItem, (req, res) => {
// 	return res.status(200).json({ recieved: true });
// });

// app.patch('/test', pgController.updateList, (req, res) => {
// 	return res.status(200).json({ recieved: true });
// });

app.get('/', (req, res) => res.status(404).send('Error: page not found'));

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

app.listen(PORT, () => {
	console.log(`listening on port: ${PORT}`);
});
