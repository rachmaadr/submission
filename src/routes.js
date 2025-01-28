const {
  addBook,
  getAllBooks,
  getBooksById,
  editBookById,
  deleteBookById
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
  }
];

module.exports = routes;