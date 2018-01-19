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
    const {rows} = await db.query('SELECT * FROM account_book LIMIT 500', []);
    rows.sort((pre, next) => next.id - pre.id);
    response.json(rows);
});

router.get('/:id', async (request, response) => {
    const {id} = request.params;
    const {rows} = await db.query('SELECT * FROM account_book WHERE id = $1', [id]);
    response.json(rows[0]);
});

router.get('/:id/journals', async (request, response) => {
    const {id} = request.params;
    const {rows} = await db.query('SELECT * FROM journal WHERE book_id = $1', [id]);
    response.json(rows);
});

router.put('/:id', async (request, response) => {
    const {name, description, icon} = request.body, {id} = request.params;
    const {rows} = await db.query(
        'UPDATE account_book SET name = $2, updated_at = $3, description = $4, icon = $5 WHERE id = $1',
        [id, name, new Date(), description, icon]);
    response.json(rows);
});

router.post('/', async (request, response) => {
    const {name, description, icon} = request.body;
    const {rows} = await db.query('INSERT INTO account_book (name, created_at, description, icon) VALUES ($1, $2, $3, $4)',
        [name, new Date(), description, icon]);
    response.json(rows);
});

router.delete('/:id', async (request, response) => {
    const {id} = request.params;
    const {rows} = await db.query('DELETE FROM account_book WHERE id=$1', [id]);
    response.json(rows);
});

module.exports = router;