import knex from 'knex';
import express from 'express';
import bodyParser from 'body-parser';

// Starting Knex
global.pg = knex({
  client : 'pg',
  connection: {
    port : 5432,
    host : 'localhost',
    database : 'mytest'
  }
});


import booksRouter from './routes/books'

const app = express(),
      PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/book',booksRouter);

app.listen(PORT,() => {
  console.log(`Server is listening at port ${PORT}`);
})
