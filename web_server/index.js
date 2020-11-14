"use strict";

(async () => {

  const HTTP_PORT = process.env.WEB_PORT || 8081
  const morgan = require('morgan')
  const express = require('express')
  const serveIndex = require('serve-index')
  const cors = require('cors')
  const app = express()
  const router = express.Router()

  const apiv1 = require('./route/apiv1')

  const cors_options = {
    origin: '*',
    optionsSuccessStatus: 200
  }

  let path_in_url = '/' // path of the URL
  let path_to_expose = `${__dirname}/static` // directory to expose
  if(process.env.STATIC_PATH_IN_URL != undefined && process.env.STATIC_PATH_IN_URL != "") {
    path_in_url = process.env.STATIC_PATH_IN_URL
  }
  if(process.env.STATIC_PATH_TO_EXPOSE != undefined && process.env.STATIC_PATH_TO_EXPOSE != "") {
    path_to_expose = process.env.STATIC_PATH_TO_EXPOSE
  }
  let reg_exp = new RegExp("^\\.")
  path_to_expose = path_to_expose.replace(reg_exp, __dirname)
  console.log(' >>> dirname=[%s] cwd=[%s]', __dirname, process.cwd())

  app.use(cors(cors_options));
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('combined'))
  app.disable('x-powered-by')

  app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });

  let serverRootPath = `${process.cwd()}`
  let index_file = 'index.html' // { false, <index file name>}

  app.use(path_in_url, express.static(path_to_expose, { index: index_file }))
  // showing server index is never allowed in cors mode
  //app.use(path_in_url, serveIndex(path_to_expose, { icons: true, view: 'details' }))
  console.log(' >> [PATH] url=[http://localhost:%s%s] exposed_dir=[%s] path_in_url=[%s]', HTTP_PORT, path_in_url, path_to_expose, path_in_url)

  // API
  app.use('/api/v1', apiv1)


  // healthcheck
  app.get('/healthcheck', (req, res, next) => {
    res.status(200).send()
  })

  // 404 Not Found
  app.get('*', function(req, res, next){
    res.status(404).send('404 Not Found')
  })
  app.post('*', function(req, res, next){
    res.status(404).send('404 Not Found')
  })
  app.put('*', function(req, res, next){
    res.status(404).send('404 Not Found')
  })
  router.get('*', function(req, res, next){
    res.status(404).send('404 Not Found')
  })
  router.post('*', function(req, res, next){
    res.status(404).send('404 Not Found')
  })
  router.put('*', function(req, res, next){
    res.status(404).send('404 Not Found')
  })

  const server = app.listen( HTTP_PORT, () => {
    console.log(' >> App is running in HTTP_PORT=[%s] ', HTTP_PORT)
  })

})()
