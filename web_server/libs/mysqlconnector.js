"use strict";

module.exports = class MysqlConnector {
//export default class MysqlConnector {
  constructor(options = {}) {
    this.mysql = require('mysql')
    this.conn_options = options
    this.conn = {}
  }

  open() {
    this.conn = this.mysql.createConnection(this.conn_options)
    this.conn.connect()
  }

  close() {
    this.conn.end()
  }

  queryByRawSql(SQL) {
    return new Promise( (resolve, reject) => {
      let query_result = true
      this.conn.query(SQL, function (error, results, fields) {
        if (error) {
          reject(error)
        }
        resolve(results)
      });
    })
  }
}
