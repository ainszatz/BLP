const { Client } = require('pg');

const client = new Client({
    connectionString: 'postgres://avnadmin:AVNS_NUbbAc3oe60SAncYe7f@pg-norizz-norizz.d.aivencloud.com:20337/defaultdb?sslmode=require',
    ssl: {
        rejectUnauthorized: false, // Allow self-signed certificates
    },
});

client.connect()
    .then(() => {
        console.log('Connected to the database');
        return client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
    })
    .then(res => {
        console.log('Tables:', res.rows);
    })
    .catch(err => {
        console.error('Connection error', err.stack);
    })
    .finally(() => {
        client.end();
    });
