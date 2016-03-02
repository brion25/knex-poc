import {Router} from 'express';

const router = Router(),
      TABLE = 'books';

router.use((req,res,next) => {
  pg.schema.createTableIfNotExists(TABLE,(table) => {
    table.string('name');
    table.decimal('pages');
    table.string('editorial');
  }).then(() => {
    next();
  });
});

router.get('/',(req, res) => {
  pg(TABLE).select('name','pages','editorial').from(TABLE)
    .then(function(books){
      res.json({
        success : true,
        books : books
      });
    })
    .catch((err) => {
      res.json({
        success : false,
        err : err
      });
    });
});

router.get('/:name',(req, res) => {
  let bookName = req.params.name;

  pg(TABLE).where({ name : bookName}).select('name','pages','editorial')
    .then(function(books){
      res.json({
        success : true,
        books : books
      });
    })
    .catch((err) => {
      res.json({
        success : false,
        err : err
      });
    });
});

router.put('/:name',(req, res) => {
  let bookName = req.params.name,
      book = req.body

  pg(TABLE).where({ name : bookName}).update(book)
    .then(function(books){
      res.json({
        success : true,
        books : books
      });
    })
    .catch((err) => {
      res.json({
        success : false,
        err : err
      });
    });
});

router.delete('/:name',(req, res) => {
  let bookName = req.params.name

  pg(TABLE).where({ name : bookName}).del()
    .then(function(books){
      res.json({
        success : true,
        books : books
      });
    })
    .catch((err) => {
      res.json({
        success : false,
        err : err
      });
    });
});

router.post('/',(req, res) => {
  let book = req.body
  pg(TABLE).insert(book)
    .then(() => {
      res.json({
        success : true
      });
    })
    .catch((err) => {
      res.json({
        success : false,
        err : err
      });
    })
});

export default router;
