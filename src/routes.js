const {
  addBook,
  getAllBooks,
  getBooksById,
  editBookById,
  deleteBookById,
  getAllReadingBooks,
  getAllUnreadingBooks,
  getAllFinishedBooks,
  getAllUnfinishedBooks,
  getAllBooksContainsDicoding
} = require("./handler");

const routes = [
  {
    method: "POST",
    path: "/books",
    handler: addBook
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooks
  },
  {
    method: "GET",
    path: "/books/{bookId}",
    handler: getBooksById
  },
  {
    method: "PUT",
    path: "/books/{bookId}",
    handler: editBookById
  },
  {
    method: "DELETE",
    path: "/books/{bookId}",
    handler: deleteBookById
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllReadingBooks
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllUnreadingBooks
  },
  {
    method: "GET",
    path: "/books/finished",
    handler: getAllFinishedBooks
  },
  {
    method: "GET",
    path: "/books/unfinished",
    handler: getAllUnfinishedBooks
  },
  {
    method: "GET",
    path: "/books/contains",
    handler: getAllBooksContainsDicoding
  }
];

module.exports = routes;