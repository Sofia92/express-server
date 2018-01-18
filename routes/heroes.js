/**
 * User: sofia
 * Date: 2018/1/12
 * Version: 1.0.0
 * Description:
 */
const express = require('express');
const router = new express.Router();
const db = require('../db/index');
let heroes = [];

router.get('/', async (request, response) => {
    const {rows} = await db.query('SELECT * FROM heroes LIMIT 500', []);
    rows.sort((pre, next) => next.id - pre.id);
    response.json(rows);
});

router.get('/:id', async (request, response) => {
    const {id} = request.params;
    const {rows} = await db.query('SELECT * FROM heroes WHERE id = $1', [id]);
    response.json(rows[0]);
});

router.put('/:id', async (request, response) => {
    const {name, phone, hobby} = request.body, {id} = request.params;
    const {rows} = await db.query('UPDATE heroes SET name = $2, phone = $3, hobby = $4 WHERE id = $1', [id, name, phone, hobby]);
    response.json(rows);
});

router.post('/', async (request, response) => {
    const {name} = request.body;
    const {rows} = await db.query('INSERT INTO heroes (name) VALUES ($1)', [name]);
    response.json(rows);
});

router.delete('/:id', async (request, response) => {
    const {id} = request.params;
    const {rows} = await db.query('DELETE FROM heroes WHERE id=$1', [id]);
    response.json(rows);
});

module.exports = router;