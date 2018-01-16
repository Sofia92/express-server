/**
 * User: sofia
 * Date: 2018/1/16
 * Version: 1.0.0
 * Description:
 */
const {Client} = require('pg');
const client = new Client({
    user: 'sofiayu',
    host: 'localhost',
    database: 'heroesdb',
    password: '889913',
    port: '5432'
});
client.connect();

module.exports = {
    query: (text, params, callback) => {
        return client.query(text, params, callback);
    }
};