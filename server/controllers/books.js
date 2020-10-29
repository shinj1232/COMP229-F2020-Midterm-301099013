//Hyunjune Shin 301099013 COMP229-F2020-MidTerm-301099013
let express = require("express");
let router = express.Router();
let mongoose = require('mongoose');

//define the book model
let book = require('../models/books');

module.exports.displayBookList =(req, res, next) => {
    // find all books in the books collection
    book.find( (err, books) => {
      if (err) {
        return console.error(err);
      }
      else {
        res.render('books/index', {
          title: 'Books',
          books: books
        });
      }
    });
}

//displays empty details page to add
module.exports.displayAddPage = (req, res, next) => {

  res.render('books/details', {title: 'Add', books: ''});

}

//processesing the new book entry from details page
module.exports.processAddPage = (req, res, next) => {

  //initialize new book 
  let newBook = book({
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });

  //create new book
  book.create(newBook, (err,book)=>{
    if(err)
    {
      console.log(err);
      res.end(err);
    } else {
      //goes back to the book list page
      res.redirect('/books');
    }
  });
}

//display details page with the info that user wants to edit
module.exports.displayEditPage  = (req, res, next) => {

  //initialize id
  let id = req.params.id;
  //find the book by id
  book.findById(id, (err, bookToEdit ) =>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else 
    {
      //sends the retrived data of the id and goes to details with correct info
        res.render('books/details', {title: 'Edit Book',  books: bookToEdit});
    }
});

}

//processing the edit
module.exports.processEditPage = (req, res, next) => {

  //initialize the id
  let id = req.params.id;
  //initialize book
  let updatedBook = book({
    "_id": id,
    "Title": req.body.title,
    "Description": req.body.description,
    "Price": req.body.price,
    "Author": req.body.author,
    "Genre": req.body.genre
  });
  //updates the edited book
  book.updateOne({_id: id,}, updatedBook,(err)=>{
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else 
    {
      //sends to user back to the list of books with updated list
        res.redirect('/books');
    }
  });
}

//performs delete of the data
module.exports.performDelete =  (req, res, next) => {

  //initialize id
  let id = req.params.id;
  //removes the book by its' id
  book.remove({_id: id}, (err)=> {
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else
    {
      //sends the user back to the list of books with updated list
        res.redirect('/books');
    }
  });
}

