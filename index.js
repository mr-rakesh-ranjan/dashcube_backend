const express = require('express');
const logsRouter = require('./routes/logs');
const chartRouter = require('./routes/LogsChart');
// const ngrok = require('@ngrok/ngrok');
// const http = require('http')
const dbConfig = require('./db/config');
app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    sql = require('mssql');

var server = {
    port: 4040
};

if (sql.connect(dbConfig)) {
    console.log("connect to db");
} else {
    console.log("Not connected!!");
}

app.use(cors())
app.use(bodyParser.json())
app.use('/logs', logsRouter)
app.use('/charts', chartRouter)

// driver method for run express app
app.listen(server.port, () => {
    console.log(`Server is started at  ${server.port}`);
})

// // Create webserver
// http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end('Congrats you have created an ngrok web server');
// }).listen(server.port, () => console.log('Node.js web server at 8080 is running...'));

// // Get your endpoint online
// ngrok.connect({ addr: 4040, authtoken_from_env: true })
//     .then(listener => console.log(`Ingress established at: ${listener.url()}`))
//     .catch((err) => console.log(err));