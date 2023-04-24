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

// for demonstrative purposes, this is the username and password I'll be using in my project.
const USER_NAME = 'hank';
const HASHED_PW =
	'$2b$10$clhyK2suFbtjNYFUMD74n.BgM8Gk/P4mvyhXGw7FmFT6ZGbmn3MXS';

client.query(
	// need to work on authentication portion - causing errors here
	// `SELECT id FROM profile WHERE username = ${USER_NAME} AND password = ${HASHED_PW};`,

	// this is the ID we will be using as a foreign key in our tasks table for queries.
	// "SELECT id FROM profile WHERE username = 'hank' AND password = '$2b$10$clhyK2suFbtjNYFUMD74n.BgM8Gk/P4mvyhXGw7FmFT6ZGbmn3MXS';",

	// this is the query where we can look up associated tasks for the unique user.
	"SELECT * FROM task JOIN profile ON username = 'hank' AND password = '$2b$10$clhyK2suFbtjNYFUMD74n.BgM8Gk/P4mvyhXGw7FmFT6ZGbmn3MXS';",

	(err, res) => {
		if (!err) {
			console.log(res.rows);
		} else {
			console.log(err.message);
		}
	}
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
