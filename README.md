# [Knex.js](http://knexjs.org/) - PoC

Proof of concept of the library Knex.js, for this PoC, I'll be using [PostgreSQL](http://www.postgresql.org/) and a simple rest API in Express

## Pre-requisites

- PostgreSQL needs to be installed
- Run PostgreSQL

## Instructions

- Download the code:

  ```
  git clone https://github.com/brion25/knex-poc
  ```
- Install dependencies:

  ```
  npm install
  ```
- Run the server

  ```
  node .
  ```

  It will run an API with the most common verbs : `GET`, `POST`, `PUT`, `DELETE` under the path : `http:localhost:3000/book`:

  ```
  GET http:localhost:3000/book //Get all the books
  POST http:localhost:3000/book //Insert a new book
  GET http:localhost:3000/book/:name //Get books by book name
  PUT http:localhost:3000/book/:name //Update books by book name
  DELETE http:localhost:3000/book/:name //Delete books by book name
  ```

## Book Schema

```
{
  name : String,
  pages : Decimal,
  editorial : String
}
```
