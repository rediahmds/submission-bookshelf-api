/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable function-paren-newline */
/* eslint-disable arrow-parens */
// eslint-disable-next-line import/no-extraneous-dependencies
const { nanoid } = require('nanoid');
const books = require('./books');

const handlers = {
  home: () => '<h1>Homepage of Bookshelf API Project</h1>',
  saveBooks: (req, h) => {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = req.payload;

    // Generate book id
    const id = nanoid();

    // Checks if the book is fineshed
    const finished = readPage === pageCount;

    // Create date data
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    // Checks if the book has name
    if (!name) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal menambahkan buku. Mohon isi nama buku',
        })
        .code(400);
    }

    // Checks readpage logic. Cuz it's impossible that we've read more than the page count
    if (readPage > pageCount) {
      return h
        .response({
          status: 'fail',
          message:
            'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400);
    }

    const book = {
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
      updatedAt,
    };

    books.push(book);

    return h
      .response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: id,
        },
      })
      .code(201);
  },
  getAllBooks: (req, h) => {
    const { name, reading, finished } = req.query;
    const booksMatch = [];

    // QUERY BOOK BY NAME
    if (name) {
      // Filter book by name given in the query
      const booksByName = books.filter(book =>
        // eslint-disable-next-line comma-dangle
        book.name.toLowerCase().includes(name.toLowerCase())
      );

      // Push the elements to another array
      booksByName.forEach(book =>
        booksMatch.push({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
          // eslint-disable-next-line comma-dangle
        })
      );

      return h.response({
        status: 'success',
        data: {
          books: booksMatch,
        },
      });
    }

    // QUERY BOOK BY ITS READ STATE - reading: true
    if (parseInt(reading, 10) === 1) {
      // Find books that meet the prerequisite
      const booksInRead = books.filter(book => book.reading === true);

      // Push to another array
      booksInRead.forEach(book =>
        booksMatch.push({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
          // eslint-disable-next-line comma-dangle
        })
      );

      return h.response({
        status: 'success',
        data: {
          books: booksMatch,
        },
      });
    }

    // QUERY BOOK BY ITS READ STATE - reading: false
    if (parseInt(reading, 10) === 0) {
      // Find books that meet the prerequisite
      const booksNotInRead = books.filter(book => book.reading === false);

      // Push to another array
      booksNotInRead.forEach(book =>
        booksMatch.push({
          id: book.id,
          name: book.name,
          publisher: book.publisher,
          // eslint-disable-next-line comma-dangle
        })
      );

      return h.response({
        status: 'success',
        data: {
          books: booksMatch,
        },
      });
    }

    // If no query provided, return all books
    books.forEach(book =>
      // eslint-disable-next-line implicit-arrow-linebreak
      booksMatch.push({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
        // eslint-disable-next-line comma-dangle
      })
    );

    // If no query provided, show all books
    return h.response({
      status: 'success',
      data: {
        books: booksMatch,
      },
    });
  },
  getBookByID: (req, h) => {
    const { id } = req.params;

    const bookFound = books.find(book => book.id === id);

    // If book not found, return error response
    if (!bookFound) {
      return h
        .response({
          status: 'fail',
          message: 'Buku tidak ditemukan',
        })
        .code(404);
    }

    // If book found, return success response
    return h.response({
      status: 'success',
      data: {
        book: bookFound,
      },
    });
  },
  updateBook: (req, h) => {
    const {
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
    } = req.payload;

    const { id } = req.params;

    // If no name provided, return error response
    if (!name) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Mohon isi nama buku',
        })
        .code(400);
    }

    // If read page > page count, return error response
    if (readPage > pageCount) {
      return h
        .response({
          status: 'fail',
          message:
            'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        })
        .code(400);
    }

    // What if the id is not match?
    const bookFound = books.find(book => book.id === id); // original book
    const bookIndex = books.findIndex(book => book.id === id);

    // If id not found, return error response
    if (!bookFound || bookIndex === -1) {
      return h
        .response({
          status: 'fail',
          message: 'Gagal memperbarui buku. Id tidak ditemukan',
        })
        .code(404);
    }

    // Update the books value
    const updatedAt = new Date().toISOString();
    const updatedBook = {
      ...bookFound,
      name,
      year,
      author,
      summary,
      publisher,
      readPage,
      pageCount,
      updatedAt,
      reading,
    };

    // Replace the book
    books.splice(bookIndex, 1, updatedBook);
    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
  },
  deleteBookByID: (req, h) => {
    const { id } = req.params;
    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
      return h
        .response({
          status: 'fail',
          message: 'Buku gagal dihapus. Id tidak ditemukan',
        })
        .code(404);
    }

    // Delete book
    books.splice(bookIndex, 1);

    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
  },
};

module.exports = handlers;
