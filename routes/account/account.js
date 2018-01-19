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
    const {rows} = await db.query('SELECT * FROM account LIMIT 500', []);
    response.json(rows);
});

router.get('/:id', async (request, response) => {
    const {id} = request.params;
    const {rows} = await db.query('SELECT * FROM account WHERE id = $1', [id]);
    response.json(rows[0]);
});

router.put('/:id', async (request, response) => {
    const {name, description, type, remainder} = request.body, {id} = request.params;
    const {rows} = await db.query(
        'UPDATE account SET name = $2, description = $3, type = $4, remainder = $5 WHERE id = $1',
        [id, name, description, type, remainder]);
    response.json(rows);
});

router.post('/', async (request, response) => {
    const {name, description, type, remainder} = request.body;
    const {rows} = await db.query('INSERT INTO account (name, description, type, remainder) VALUES ($1, $2)',
        [name, description, type, remainder]);
    response.json(rows);
});

router.delete('/:id', async (request, response) => {
    const {id} = request.params;
    const {rows} = await db.query('DELETE FROM account WHERE id=$1', [id]);
    response.json(rows);
});

module.exports = router;