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
    const {rows} = await db.query('SELECT * FROM journal LIMIT 500', []);
    rows.sort((pre, next) => next.id - pre.id);
    response.json(rows);
});

router.get('/:id', async (request, response) => {
    const {id} = request.params;
    const {rows} = await db.query('SELECT * FROM journal WHERE id = $1', [id]);
    response.json(rows[0]);
});

router.put('/:id', async (request, response) => {
    const {account_id, category_id, money, state_type, comments, cost_at, book_id} = request.body, {id} = request.params;
    const {rows} = await db.query(
        'UPDATE journal SET account_id = $2, category_id = $3, money = $4, state_type = $5, comments = $6, cost_at = $7, book_id = $8 WHERE id = $1',
        [id, account_id, category_id, money, state_type, comments, cost_at, book_id]);
    response.json(rows);
});

router.post('/', async (request, response) => {
    const {account_id, category_id, money, state_type, comments, cost_at, book_id} = request.body;
    const {rows} = await db.query('INSERT INTO journal (account_id, category_id, money, state_type, comments, cost_at, book_id) VALUES ($1, $2, $3, $4, $5, $6, $7)',
        [account_id, category_id, money, state_type, comments, cost_at, book_id]);
    response.json(rows);
});

router.delete('/:id', async (request, response) => {
    const {id} = request.params;
    const {rows} = await db.query('DELETE FROM journal WHERE id=$1', [id]);
    response.json(rows);
});

module.exports = router;