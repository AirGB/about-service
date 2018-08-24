const nr = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const redis = require('redis');
const responseTime = require('response-time');

const app = express();

// postgres queries
const db = require('../db/queries-pg.js');

// create and connect redis client to local instance
const reClient = redis.createClient({
  host: process.env.REDIS || '127.0.0.1'
});

// print on successful connection to redis
reClient.on('connect', () => {
  console.log('connected to redis!');
});
// print redis errors to console
reClient.on('error', (err) => {
  console.log('Error', err);
});

// use response-time as middleware
app.use(responseTime());

// to parse our data and use req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '../public')));


// GET 

app.get('/api/about/hosts/:id', (req, res) => {
  // console.log(req.params);
  const id = req.params.id;
  reClient.get(id, (error, result) => {
    if (result) {
      res.send(result);
    } else {
      db.selectHostInfo(id, (err, result) => {
        if (err) {
          console.log('error in server pg', err);
          res.status(500).send(err);
        } else {
          reClient.setex(id, 180, JSON.stringify(result));
          res.status(200).send(result);
        }
      });
    }
  });
});

app.get('/api/about/reviews/:userId', (req, res) => {
  // console.log('test', req.params);
  const userId = req.params.userId;
  reClient.get(userId, (err, result) => {
    if (result) {
      res.json(result);
    } else {
      db.reviewsForHost(userId, (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          reClient.setex(userId, 180, JSON.stringify(result));
          res.status(200).json(result);
        }
      });
    }
  });
});

app.get('/api/about/neighborhood/:listingId', (req, res) => {
  const listingId = req.params.listingId;
  reClient.get(listingId, (err, result) => {
    if (result) {
      res.json(result);
    } else {
      db.neighborhoodInfo(+req.params.listingId, (err, result) => {
        if (err) {
          console.log('err from s-pg', err);
          res.status(500).send(err);
        } else {
          reClient.setex(listingId, 180, JSON.stringify(result));
          res.status(200).json(result);
        }
      });
    }
  });
});

// POST

app.post('/api/about/reviews/new', (req, res) => {
  // console.log('from server post reviews', req.body);
  db.addReviewForHost(req.body, (err, result) => {
    if (err) {
      console.log('err from server post reviews', err);
      res.status(500).send(err);
    } else {
      // console.log('result', result);
      // console.log('result rows', result.rows);
      res.status(200).send(result);
    }
  });
});


// PUT
app.put('/api/about/reviews/:listingId/update', (req, res) => {
  db.updateReviewRating(req.body, (err, result) => {
    if (err) {
      console.log('err from server update review', err);
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

// DELETE
app.delete('/api/about/reviews/:listingId/delete', (req, res) => {
  // console.log('test', req.params);
  db.deleteReviewForHost(+req.params.listingId, (err, result) => {
    if (err) {
      console.log('err from server delete review', err);
      res.status(500).send(err);
    } else {
      // console.log("DELETED", result)
      res.status(200).send(result);
    }
  });
});

//CONNECTION
app.listen(3001, () => {
  console.log('Server started on 3001');
});
