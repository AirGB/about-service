const client = require('./connection-pg.js');

// hosts
const selectHostInfo = (id, callback) => {
  const theQuery = `select * from hosts where id = ${id}`;
  client.query(theQuery, (err, result) => {
    if (err) {
      callback(err);
    } else {
      // console.log('hosts', result.rows);
      callback(null, result.rows);
    }
  });
};

// reviews
const reviewsForHost = (userId, callback) => {
  const theQuery = `select * from reviews where user_id = ${userId}`;
  client.query(theQuery, (err, result) => {
    if (err) {
      callback(err);
    } else {
      console.log('reviews length', result.rows.length);
      callback(null, result.rows.length);
    }
  });
};

const addReviewForHost = (body, callback) => {
  const theQuery = `insert into reviews (id, user_id, list_id, rating) values (${body.id}, ${body.userId}, ${body.listId}, ${body.rating})`;
  client.query(theQuery, (err, result) => {
    if (err) {
      console.log('error from add Review', err);
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

const deleteReviewForHost = (id, callback) => {
  const theQuery = `delete from reviews where id = ${id}`;
  client.query(theQuery, (err, result) => {
    if (err) {
      console.log('error from delete Review', err);
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

const updateReviewRating = (body, callback) => {
  const theQuery = `update reviews set rating = ${body.rating} where id = ${body.id}`;
  client.query(theQuery, (err, result) => {
    if (err) {
      console.log('error from update review rating query', err);
      callback(err);
    } else {
      callback(null, result);
    }
  });
};

// listings
const neighborhoodInfo = (id, callback) => {
  const theQuery = `select * from listings where id = ${id}`;
  client.query(theQuery, (err, result)=> {
    if (err) {
      console.log(err);
    } else {
      console.log('neighborhoodInfo', result.rows);
      callback(null, result.rows);
    }
  });
};

// selectHostInfo();
// addReviewForHost(10000007, 1, 1, 5);

module.exports = {
  selectHostInfo, reviewsForHost, addReviewForHost, deleteReviewForHost, updateReviewRating, neighborhoodInfo,
};
