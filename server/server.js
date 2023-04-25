/* eslint-disable indent */
/* eslint-disable no-tabs */
const express = require('express');
const pgController = require('./controller/pgController');
const path = require('path');
const { Client } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

const connectionString =
	'postgres://ipudzayh:QxX6Haw8-tMjKZ2_-FQjQAZXQhYw35Ag@lallah.db.elephantsql.com/ipudzayh';
const client = new Client({ connectionString });
client.connect();

app.use(express.json());
app.use('/', express.static(path.join(__dirname, '../public')));

// for demonstrative purposes, this is the ID I'll be using in my project.
// const PROFILE_ID = '725543eb-8fd4-4e43-b5ac-2374c16900ef';

client.query(
	"SELECT task_desc FROM task JOIN profile ON task.profile_id = profile.id WHERE profile.id = '725543eb-8fd4-4e43-b5ac-2374c16900ef';",
	(err, res) => (err ? console.log(err.message) : console.log(res.rows))
);

// app.get('/', pgController.getList, (req, res) => {
// 	return res.status(200).json({ message: 'hello' });
// });

// app.get('/test', pgController.getList, (req, res) => {
// 	return res.status(200).json({ message: res.locals.message, sup: 'the sky' });
// });

// app.post('/test', pgController.postListItem, (req, res) => {
// 	return res.status(200).json({ recieved: true });
// });

// app.delete('/test/:id', pgController.deleteListItem, (req, res) => {
// 	return res.status(200).json({ recieved: true });
// });

// app.patch('/test', pgController.updateList, (req, res) => {
// 	return res.status(200).json({ recieved: true });
// });

app.listen(PORT, () => {
	console.log(`listening on port: ${PORT}`);
});
