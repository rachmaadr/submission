const {nanoid} = require('nanoid');
const bookShelf = require('./bookShelf');

const addBook = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    } = request.payload;

    if (!name) {
        const response = h.response({
          status: "fail",
          message: "Gagal menambahkan buku. Mohon isi nama buku"
        });

        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
          status: "fail",
          message:
            "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });

        response.code(400);
        return response;
    }

    const id = nanoid(16);
    const insertAt = new Date().toISOString;
    const updatedAt = insertAt;

    const newBook = {
      id,
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      insertAt,
      updatedAt
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: "success",
            message: "Buku berhasil ditambahkan",
            data: {
                bookId: id,
            },
        });

        response.code(201);
        return response;
    }

    const response = h.response({
        status: "fail",
        message: "Buku gagal ditambahkan",
    });
    response.code(500);
    return response;

}

const getAllBooks = () => ({
    status: "success",
    data: {
        books,
    },
});

const getBooksById = (request, h) => {
    const {id} = request.params;
    const book = book.filter((n) => n.id === id)[0];
    if (book !== undefined) {
        return{
            status: 'success',
            data: {
                book,
            },
        };
    };

    const response = h.response({
      status: "fail",
      message: "Buku tidak ditemukan"
    });
    response.code(400);
    return response;
}

module.exports = {
  addBook,
  getAllBooks,
  getBooksById
};