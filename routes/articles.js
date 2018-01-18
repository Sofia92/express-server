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
    const {rows} = await db.query('SELECT * FROM article LIMIT 500', []);
    rows.sort((pre, next) => next.id - pre.id);
    response.json(rows);
});

router.get('/:id', async (request, response) => {
    const {id} = request.params;
    const {rows} = await db.query('SELECT * FROM article WHERE id = $1', [id]);
    response.json(rows[0]);
});

router.put('/:id', async (request, response) => {
    const {title, content, createdat, categoryid} = request.body, {id} = request.params;
    const {rows} = await db.query(
        'UPDATE article SET title = $2, content = $3, updatedat = $4, createdat = $5, categoryid = $6 WHERE id = $1',
        [id, title, content, new Date(), createdat, categoryid]);
    response.json(rows);
});

router.post('/', async (request, response) => {
    const {title} = request.body;
    const {rows} = await db.query('INSERT INTO article (title, createdat) VALUES ($1, $2)', [title, new Date()]);
    response.json(rows);
});

router.delete('/:id', async (request, response) => {
    const {id} = request.params;
    const {rows} = await db.query('DELETE FROM article WHERE id=$1', [id]);
    response.json(rows);
});

module.exports = router;