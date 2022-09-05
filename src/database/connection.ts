import knex from 'knex';

export default knex({
    client: 'mysql2',
    connection: {
        host: process.env.DATABASE_HOST || '127.0.0.1',
        user: process.env.DATABASE_USER || 'root',
        database: process.env.DATABASE_DATABASE || 'medsoft',
        password: process.env.DATABASE_PASSWORD || '',
    }
});