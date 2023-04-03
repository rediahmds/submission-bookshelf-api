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
    const booksWithCertainProps = [];
    books.forEach(book =>
      // eslint-disable-next-line implicit-arrow-linebreak
      booksWithCertainProps.push({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
        // eslint-disable-next-line comma-dangle
      })
    );

    return h.response({
      status: 'success',
      data: {
        books: booksWithCertainProps,
      },
    });
  },
};

module.exports = handlers;
