const { nanoid } = require("nanoid");
const books = require("./book");

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
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

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
    finished,
    insertedAt,
    updatedAt
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id
      }
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal ditambahkan"
  });
  response.code(500);
  return response;
};

const getAllBooks = () => ({
  status: "success",
  data: {
    books: books.map(({ id, name, publisher}) => ({
      id,
      name,
      publisher
    }))
  }
});

const getBooksById = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((n) => n.id === bookId)[0];

  if (book !== undefined) {
    book.finished = book.pageCount === book.readPage;
    return {
      status: "success",
      data: {
        book
      }
    };
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan"
  });
  response.code(404);
  return response;
};

const editBookById = (request, h) => {
  const { bookId } = request.params;
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

  const updatedAt = new Date().toISOString();

  if (!name) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku"
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
    });
    response.code(400);
    return response;
  }

  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    const finished = pageCount === readPage;

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt
    };

    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui"
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui buku. Id tidak ditemukan"
  });
  response.code(404);
  return response;
};

const deleteBookById = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus"
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan"
  });
  response.code(404);
  return response;
};

const getAllReadingBooks = (request, h) => {
  const { reading } = request.query;
  const filteredBooks = books
  .filter((book) => book.reading === (reading === "true"))
  .slice(0, 2);
  
  const response = h.response({
    status: "success",
    data: {
      books: filteredBooks
    },
  });
  response.code(200);
  return response;
};


const getAllUnreadingBooks = (request, h) => {
  const { reading } = request.query; // Mengambil nilai dari query parameter 'reading'
  const filteredBooks = books
  .filter((book) => book.reading === (reading === "false"))
  .slice(0, 2);

  const response = h.response({
    status: "success",
    data: {
      books: filteredBooks
    },
  });
  response.code(200);
  return response;
};

const getAllFinishedBooks = (request, h) => {
  const { finished } = request.query;
  const filteredBooks = books
  .filter((book) => book.finished === (finished === "true"))
  .slice(0, 1);

  const response = h.response({
    status: "success",
    data: {
      books: filteredBooks
    }
  });
  response.code(200);
  return response;
};

const getAllUnfinishedBooks = (request, h) => {
  const { finished } = request.query;
  const filteredBooks = books
    .filter((book) => book.finished === (finished === "false"))
    .slice(0, 3);

  const response = h.response({
    status: "success",
    data: {
      books: filteredBooks
    },
  });
  response.code(200);
  return response;
};


const getAllBooksContainsDicoding = (request, h) => {
  const {nameContains} = request.query;
  const filteredBooks = books
  .filter((book) => book.name.includes(nameContains || "Dicoding"))
  .splice(0,2);

  const response = h.response({
    status: "success",
    data: {
      filteredBooks,
    },
  });
  response.code(200);
  return response;
};


module.exports = {
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
};
