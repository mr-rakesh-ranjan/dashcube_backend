let dbConfig = require('../db/config')
const express = require('express'),
    router = express.Router();
const sql = require('mssql');


// get all logs
router.get('/all', function (req, res) {
    getAllLogs().then((data) => {
        // console.log(data[0]);  //for debuggging only
        res.json(data[0]);
    }).catch((err) => {
        console.log(err);
    })
});

// filtering the data 
router.get('/', function(req, res, next){
    const filters = req.query;
    getAllLogs().then((data) => {
        const filteredLogs = data[0].filter(log => {
            let isValid = true;
            for (key in filters) {
                console.log(key, log[key], filters[key]);
                isValid= isValid && log[key] == filters[key];
            }
            return isValid;
        });
        res.json(filteredLogs)
    }).catch((err) => {
        console.log(err);
    })
});

// Get all Logs of db
async function getAllLogs() {
    try {
        let pool = await sql.connect(dbConfig)
        let logs = await pool.request().query("select * from Logs");
        return logs.recordsets;
    } catch (err){
        console.log(err);
    }
}

// get Logs by SourceSystem
async function getLogsBySourceSystem(sourceSystem){
    try {
        let pool = await sql.connect(dbConfig);
        let logs = await pool.request()
        .input('input_parameter', sql.NVarChar, sourceSystem)
        .query("select * from Logs where SourceSystem = @input_parameter")
        return logs.recordsets;
    } catch (err) {
        console.log(err);
    }
}



module.exports = router;