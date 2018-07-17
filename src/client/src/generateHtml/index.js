import http from 'http';
import express from 'express';
import bodyParser from'body-parser';
import render from './render';

const ADDRESS = process.env.NODE_HOST;
const PORT = process.env.NODE_PORT;

const app = express();
const server = http.Server(app);
window = {};

app.use(bodyParser.json({ limit: '10mb' }));

app.get('/', function (req, res) {
  res.end('Render server here!');
})

app.post('/render', function (req, res) {
  // We know we'll need a path and the data for our initial state,
  // so let's save this stuff first
  const url = req.body.url;

  const apiData = req.body.api_data;
  const pagesData = req.body.pages_data; 
  
  const result = render(url, apiData, pagesData);

  res.json({
    html: result.html,
    finalState: result.finalState
  })
})

server.listen(PORT, ADDRESS, function () {
  console.log('Render server listening at http://' + ADDRESS + ':' + PORT);
})