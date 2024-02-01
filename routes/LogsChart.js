const dbConfig = require('../db/config');
const express = require('express'),
    router = express.Router();
const sql = require('mssql')

// get indiviual count of data by distinct sourceSystem
router.get('/source-system', function(request, response) {
    getDistinctCount().then((data) => {
        // console.log(data[0]); //for debugging purpose only
        response.json(data[0]);
    }).catch((err) => {
        console.log(err);
    })
});

// define function getDistinctCount()
async function getDistinctCount() {
    try {
        let pool = sql.connect(dbConfig);
        let requestedData = (await pool).request().query("Select distinct SourceSystem, count (SourceSystem) as CountTotal from dbo.Logs Group by SourceSystem");
        return (await requestedData).recordsets;
    } catch (err) {
        console.log(err);    
    }
}

// get indiviual count of data by distinct type
router.get('/type', function(request, response) {
    getDistinctCountByType().then((data) => {
        console.log(data[0]); //for debugging purpose only
        response.json(data[0]);
    }).catch((err) => {
        console.log(err);
    })
});

// define function for getting getDistinctCountByType()
async function getDistinctCountByType() {
    try {
        let pool = sql.connect(dbConfig);
        let requestedData = (await pool).request().query("Select distinct Type, count (Type) as CountTotal from dbo.Logs Group by Type");
        return (await requestedData).recordsets;
    } catch (err) {
        console.log(err);    
    }
}


module.exports = router;