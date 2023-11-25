function addBook(title, author, pages, isComplete) {
  // Create a new book object
  const newBook = {
    id: Date.now(),
    title,
    author,
    pages,
    isComplete,
  };

  // Add the new book to the bookshelf array
  bookshelf.push(newBook);

  // Save the updated bookshelf array to localStorage
  localStorage.setItem("bookshelf", JSON.stringify(bookshelf));

  // Render the updated bookshelf
  renderBookshelf();
}

function getBookshelf() {
  // Retrieve the bookshelf array from localStorage
  const storedBookshelf = JSON.parse(localStorage.getItem("bookshelf"));

  // If the bookshelf array exists in localStorage, use it. Otherwise, use an empty array.
  const currentBookshelf = storedBookshelf !== null ? storedBookshelf : [];

  // Filter the current bookshelf array into two arrays: inProgressBooks and completedBooks
  const inProgressBooks = currentBookshelf.filter((book) => !book.isComplete);
  const completedBooks = currentBookshelf.filter((book) => book.isComplete);

  // Return an object containing the two arrays
  return {
    inProgressBooks,
    completedBooks,
  };
}

function moveBook(bookId, isComplete) {
  // Find the book with the specified bookId in the bookshelf array
  const bookIndex = bookshelf.findIndex((book) => book.id === bookId);

  // If the book is found, update its isComplete property and save the updated bookshelf array to localStorage
  if (bookIndex !== -1) {
    bookshelf[bookIndex].isComplete = isComplete;
    localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
  }

  // Render the updated bookshelf
  renderBookshelf();
}

function deleteBook(bookId) {
  // Find the book with the specified bookId in the bookshelf array
  const bookIndex = bookshelf.findIndex((book) => book.id === bookId);

  // If the book is found, remove it from the bookshelf array and save the updated bookshelf array to localStorage
  if (bookIndex !== -1) {
    bookshelf.splice(bookIndex, 1);
    localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
  }

  // Render the updated bookshelf
  renderBookshelf();
}

function loadBookshelf() {
  // Retrieve the bookshelf array from localStorage
  const storedBookshelf = JSON.parse(localStorage.getItem("bookshelf"));

  // If the bookshelf array exists in localStorage, use it. Otherwise, use an empty array.
  const currentBookshelf = storedBookshelf !== null ? storedBookshelf : [];

  // Assign the current bookshelf array to the bookshelf variable
  bookshelf = currentBookshelf;
}
