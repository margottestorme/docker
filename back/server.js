const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 3000;

const options = {
    origin: ['http://localhost:81'],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    allowedHeaders: [
        'X-ACCESS_TOKEN',
        'Access-Control-Allow-Origin',
        'Authorization',
        'Origin',
        'x-requested-with',
        'Content-Type',
        'Content-Range',
        'Content-Disposition',
        'Content-Description',
    ],
    credentials: true,
};

app.use(cors(options));
app.use(bodyParser.json());

const db = mysql.createPool({
    connectionLimit: 10,
    host: 'mysql',
    user: 'projetuser',
    password: 'root',
    database: 'projet_db'
});

app.post('/create-user', (req, res, next) => {
    const user = { username: req.body.username, email: req.body.email, password: req.body.password };

    const sql = 'INSERT INTO users SET ?';
    db.query(sql, user, (err, result) => {
        if (err) {
            console.error('Error creating user:', err);
            return next(err);
        }
        console.log('User created successfully');
        res.json({ message: 'User created successfully', userId: result.insertId });
    });
});

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

app.get('/api/users', (req, res, next) => {
    const sql = 'SELECT username, email FROM users';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return next(err); 
        }
        res.json(results);
    });
});

app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message, stack: err.stack });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
