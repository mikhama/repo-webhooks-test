const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const db = require('./config/db');
const routes = require('./app/routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

MongoClient.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err, client) => {
    if (err) {
        return console.log('Error: Cannot establish connection with mongoDB:', err.message);
    }

    const database = client.db('testa');

    routes(app, database);

    app.listen(port, () => console.log(`App listeining on port ${port}`));
});
