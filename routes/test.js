const express = require('express')
const mysql = require('../db-config')

const router = express.Router()

//Get route
router.get('/', (req, res) => {
    const sql ='SELECT * FROM test'
    mysql.query(sql, (err, result) => {
        if(err) {
            res.status(500).sen('Error')
        } else {
            res.status(200).json(result)
        }
    })
})

//Post route
router.post('/', (req, res) => {
    const bodyData = [req.body.test_firstname, req.body.test_lastname]
    const sql =  'INSERT INTO test (test_firstname, test_lastname) VALUES (?, ?)'
    mysql.query(sql,bodyData, (err, result) => {
        if (err) {
            res.status.apply(500).send('Error')
        } else {
            res.status(200).json({result})
        }
    })
})

//Delete route by
router.delete('/:id', (req, res) => {
    const testId = req.params.id
    const sql ='DELETE FROM test WHERE test.test_id=?'
    mysql.query(sql, testId, (err, result) => {
        if(err) {
            res.status(500).send('Error')
        } else {
            res.status(200).send('Deleted!')
        }
    })
})

module.exports = router