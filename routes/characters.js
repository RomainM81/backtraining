const express = require('express')
const mysql = require('../db-config')

const router = express.Router()

//Get route
router.get('/', (req, res) => {
    const sql ='SELECT * FROM characters'
    mysql.query(sql, (err, result) => {
        if(err) {
            res.status(500).send('Error')
        } else {
            res.status(200).json(result)
        }
    })
})

//Post route
router.post('/', (req, res) => {
    const bodyData = [req.body.character_firstname, req.body.character_lastname, req.body.character_book_id]
    const sql =  'INSERT INTO characters (character_firstname, character_lastname, character_book_id) VALUES (?, ?, ?)'
    console.log(bodyData)
    mysql.query(sql,bodyData, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).json({result})
        }
    })
})

//Put route by id
router.put('/:id', (req, res) => {
    const testId = req.params.id
    const bodyData = [
        req.body.character_firstname,
        req.body.character_lastname,
        testId
    ]
    console.log(bodyData)
    console.log(testId)
    const sql = 'UPDATE test SET character_firstname=?, character_lastname=? WHERE characters.character_id=?'
    mysql.query(sql, bodyData, (err, result) => {
        if(err) {
            res.status(500).send('Error')
        }else {
            res.status(200).json(result)
        }
        })
    })


//Delete route by
router.delete('/:id', (req, res) => {
    const testId = req.params.id
    const sql ='DELETE FROM characters WHERE characters.character_id=?'
    mysql.query(sql, testId, (err, result) => {
        if(err) {
            res.status(500).send('Error')
        } else {
            res.status(200).send('Deleted!')
        }
    })
})

module.exports = router