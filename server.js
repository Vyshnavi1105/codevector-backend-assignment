const pool = require('./src/db');
const express = require('express');
const productRoutes = require('./src/routes/products');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello CodeVector');
});

app.use('/products', productRoutes);

pool.query('SELECT NOW()', (err, result) => {
    if (err) {
        console.log('Database connection failed');
        console.log(err);
    } else {
        console.log('Database connected successfully');
    }
});
app.listen(3000, () => {
    console.log('Server running on port 3000');
});