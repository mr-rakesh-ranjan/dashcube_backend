// creating connection with db 
const dbConfig = {
    user: 'user_name',
    password: 'password',
    database: 'db_name',
    server: 'db_server_url',
    port: 1433,
    pool: {
        max: 30,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
}

module.exports = dbConfig;