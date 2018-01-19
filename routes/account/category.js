/**
 * User: sofia
 * Date: 2018/1/19
 * Version: 1.0.0
 * Description:
 */
const express = require('express');
const router = new express.Router();
const db = require('../../db/account');

router.get('/', async (request, response) => {
    const {rows} = await db.query('SELECT * FROM category LIMIT 500', []);
    rows.sort((pre, next) => next.id - pre.id);
    response.json(rows);
});

router.get('/:id', async (request, response) => {
    const {id} = request.params;
    const {rows} = await db.query('SELECT * FROM category WHERE id = $1', [id]);
    response.json(rows[0]);
});

router.put('/:id', async (request, response) => {
    const {name, pid} = request.body, {id} = request.params;
    const {rows} = await db.query('UPDATE category SET name = $2, pid = $3 WHERE id = $1', [id, name, pid]);
    response.json(rows);
});

router.post('/', async (request, response) => {
    const {name, pid} = request.body;
    const {rows} = await db.query('INSERT INTO category (name, pid) VALUES ($1, $2)',
        [name, pid]);
    response.json(rows);
});

router.delete('/:id', async (request, response) => {
    const {id} = request.params;
    const {rows} = await db.query('DELETE FROM category WHERE id=$1', [id]);
    response.json(rows);
});

module.exports = router;