import knex from 'knex';

// Starting Knex
const pg = knex({
  client : 'pg',
  connection: {
    port : 5432,
    host : 'localhost',
    database : 'mytest'
  }
});

const table = 'books'

const books = [
  {
    name : 'Da Vince Code',
    pages : 352,
    editorial : 'Santillana'
  },
  {
    name : 'JS for Dummies',
    pages : 501,
    editorial : 'Pearson'
  }
];

function createTable(){
  return pg.schema.dropTableIfExists(table).then(function(){
    return pg.schema.createTable(table,function(table){
      table.string('name');
      table.decimal('pages');
      table.string('editorial');
    });
  });
}

function insertBooks(){
  let promises = [];

  books.forEach((book) => {
    promises.push(
      pg(table).insert({
        name : book.name,
        pages : book.pages,
        editorial : book.editorial
      })
    );
  });

  return Promise.all(promises);
}

function queryBooks(){
  return pg.select('name','pages','editorial').from(table)
    .then(function(books){
      console.log(books)
    });
}

createTable()
  .then(function(){
    console.log(`Table : ${table} was created`);
  })
  .then(insertBooks)
  .then(function(){
    console.log('Books inserted...')
  })
  .then(queryBooks)
  .then(function(){
    process.exit(0)
  })
  .catch(function(err){
    console.log(err);
    process.exit(1);
  });
