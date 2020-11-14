"use strict";

(async () => {

  const express = require('express')
  const router = express.Router()

  const db_host = process.env.DATABASE_HOST || 'localhost'
  const db_port = process.env.DATABASE_PORT || '13306'
  const db_user_id = process.env.DATABASE_USER_NAME || '0000'
  const db_user_password = process.env.DATABASE_USER_PASSWORD || '0000'
  const database = process.env.DATABASE_NAME || 'merchandise_sample'

  const database_options = {
    host     : db_host,
    port     : db_port,
    user     : db_user_id,
    password : db_user_password,
    database : database
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
    console.log(database_options)
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
