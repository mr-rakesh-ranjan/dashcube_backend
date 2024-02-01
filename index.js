const express = require('express');
const logsRouter = require('./routes/logs');
const chartRouter = require('./routes/LogsChart')
const dbConfig = require('./db/config');
    app = express(),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    sql = require('mssql');

var server = {
    port: 4040
};

if(sql.connect(dbConfig)){
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