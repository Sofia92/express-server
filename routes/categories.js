/**
 * User: sofia
 * Date: 2018/1/17
 * Version: 1.0.0
 * Description:
 */
const express = require('express');
const router = new express.Router();
const db = require('../db/article');

router.get('/', async (request, response) => {
    const {rows} = await db.query('SELECT * FROM category LIMIT 500', []);
    rows.sort((pre, next) => next.id - pre.id);
    response.json(rows);
});

router.get('/:id', async (request, response) => {
    const {rows} = await db.query('SELECT * FROM category LIMIT 500', []);
    rows.sort((pre, next) => next.id - pre.id);
    response.json(rows);
});

router.post('/', async (request, response) => {
    const {name} = request.body;
    const {rows} = await db.query('INSERT INTO category (name, createdat) VALUES ($1, now())', [name]);
    response.json(rows);
});
module.exports = router;