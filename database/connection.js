module.exports = require('knex')({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        database: 'medsoft',
        password: ''
    }
});