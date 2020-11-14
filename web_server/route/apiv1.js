"use strict";

(async () => {

  const express = require('express')
  const router = express.Router()

  const database_options = {
    //host     : 'localhost',
    host     : 'host.docker.internal',
    port     : '13306',
    user     : '0000',
    password : '0000',
    database : 'merchandise_sample'
  }

  const MysqlConnector = require('../libs/mysqlconnector')
  const mysql = new MysqlConnector(database_options)

  let obj_response = {
    success: false,
    data: {}
  }

  router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
  })

  router.post('/query', async function(req, res, next){
    console.log(req.body, req.body.query)
    const _SQL = 'SELECT * FROM merchandise_type_master'
    mysql.open()
    try {
      const results = await mysql.queryByRawSql(_SQL)
      console.log(results)
      obj_response.success = true
      obj_response.data = results
      res.status(200).send(obj_response)
    } catch (e) {
      console.log(e)
    }
    mysql.close()
  })

  module.exports = router

})()
