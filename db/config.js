// creating connection with db 
const dbConfig = {
    user: 'sqlserver',
    password: 'chatbot@123',
    database: 'chatdb',
    server: 'chatbotserver456.database.windows.net',
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