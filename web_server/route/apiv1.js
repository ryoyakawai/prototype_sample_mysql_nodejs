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

  const _MONTH_TEXT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  let obj_response = {
    success: false,
    data: {}
  }

  const getDateTimeHeader = () => {
    // 15/Nov/2020:02:02:24 +0000
    const pd_00 = ( target_num, digit = 2) => {
      return ('00' + target_num.toString()).substr(-1 * parseInt(digit))
    }
    const dd = new Date();
    const date= `${pd_00(dd.getDate())}/${_MONTH_TEXT[dd.getMonth()]}/${dd.getFullYear()}`
    const utc_time = `${pd_00(dd.getUTCHours())}:${pd_00(dd.getUTCMinutes())}:${pd_00(dd.getUTCSeconds())} +0000`
    return `${date}:${utc_time}`
  }

  /*
  router.use(function timeLog (req, res, next) {
    console.log(`datetime=[${getDateTimeHeader()}]`)
    next()
  })
  */

  router.post('/query', async function(req, res, next){
    const req_body = req.body
    const _SQL = req_body.query
    console.log(`  - - [${getDateTimeHeader()}] "SQL LOG" "${_SQL}"`)
    mysql.open()
    try {
      const results = await mysql.queryByRawSql(_SQL)
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
