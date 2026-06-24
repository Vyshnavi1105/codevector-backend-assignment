const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/', async (req, res) => {
  try {
    const { category, limit = 5, cursor } = req.query;

    let query = 'SELECT * FROM products';
    let values = [];
    let conditions = [];

    if (category) {
      values.push(category);
      conditions.push(`category = $${values.length}`);
    }

    if (cursor) {
      values.push(cursor);
      conditions.push(`id < $${values.length}`);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    values.push(limit);
    query += ` ORDER BY id DESC LIMIT $${values.length}`;

    const result = await pool.query(query, values);

    const products = result.rows;
    const nextCursor =
      products.length > 0 ? products[products.length - 1].id : null;

    res.json({
      products,
      nextCursor
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Internal Server Error'
    });
  }
});

module.exports = router;