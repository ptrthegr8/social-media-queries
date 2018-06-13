const { Client } = require('pg');
const express = require('express');

const app = express();
app.use(express.json());

const client = new Client({database: 'social-media'});

app.get('/users', (req, res) => {
    client.query('SELECT * FROM users', (err, result) => {
       err ? console.log(err.stack) : res.send(result.rows);
    });
});

app.get('/users/:id', (req, res) => {
    const foo = (req.params.id)
    client.query(`SELECT * FROM users WHERE id = ${foo} `, (err, result) => {
        err ? console.log(err.stack) : res.send(result.rows);
    });
})

app.post('/users', (req, res) => {
    const query = {
    text : 'INSERT INTO users(username, bio) VALUES($1, $2)',
    values : ['Mr. Mister', 'Take these broken wings; And learn to fly again; And learn to live so free; When we hear the voices sing; The book of love will open up; And let us in; Take these broken wings'] 
    };

    client.query(query, (err, result)=> {
        err ? console.log(err.stack) : res.send(result.rows)
    });
});

app.listen(3000, () => {
    console.log("SNICKELFRITZ");
    client.connect();
});