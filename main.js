let bookshelf = [];

document.body.onload = () => {
  loadBookshelf();
  renderBookshelf();
}

function renderBookshelf(findJudul = "") {
  // Retrieve the inProgressBooks and completedBooks arrays from the getBookshelf function
  const { inProgressBooks, completedBooks } = getBookshelf();

  // Select the inProgressBooks and completedBooks lists
  const inProgressBooksList = document.getElementById("incompleteBookshelfList");
  const completedBooksList = document.getElementById("completeBookshelfList");

  // Clear the lists
  inProgressBooksList.innerHTML = "";
  completedBooksList.innerHTML = "";

  // For each book in the inProgressBooks array, create an li element and append it to the inProgressBooks list
  inProgressBooks.forEach((book) => {
    if(findJudul == "")
    {
      const bookItem = document.createElement("article");
      bookItem.classList.add("book_item");
      bookItem.innerHTML = `
      <h3>${book.title}</h3>
      <p>Penulis : ${book.author}</p>
      <p>Tahun : ${book.year}</p>
      <div class="action">
        <button class="green" onclick="moveBook(${book.id}, true)">Selesai Dibaca</button>
        <button class="red" onclick="deleteBook(${book.id})">Hapus Buku</button>
      </div>
      `;
      inProgressBooksList.appendChild(bookItem);
    }
    else
    {
      if(book.title.toLowerCase().includes(findJudul.toLowerCase()))
      {
        const bookItem = document.createElement("article");
        bookItem.classList.add("book_item");
        bookItem.innerHTML = `
        <h3>${book.title}</h3>
        <p>Penulis : ${book.author}</p>
        <p>Tahun : ${book.year}</p>
        <div class="action">
          <button class="green" onclick="moveBook(${book.id}, true)">Selesai Dibaca</button>
          <button class="red" onclick="deleteBook(${book.id})">Hapus Buku</button>
        </div>
        `;
        inProgressBooksList.appendChild(bookItem);
      }
    }
  });

  // For each book in the completedBooks array, create an li element and append it to the completedBooks list
  completedBooks.forEach((book) => {
    if(findJudul == "") {
      const bookItem = document.createElement("article");
      bookItem.classList.add("book_item");
      bookItem.innerHTML = `
      <h3>${book.title}</h3>
      <p>Penulis : ${book.author}</p>
      <p>Tahun : ${book.year}</p>
      <div class="action">
        <button class="green" onclick="moveBook(${book.id}, false)">Belum Selesai Dibaca</button>
        <button class="red" onclick="deleteBook(${book.id})">Hapus Buku</button>
      </div>
      `;
      completedBooksList.appendChild(bookItem);
    }
    else
    {
      if(book.title.toLowerCase().includes(findJudul.toLowerCase()))
      {
        const bookItem = document.createElement("article");
        bookItem.classList.add("book_item");
        bookItem.innerHTML = `
        <h3>${book.title}</h3>
        <p>Penulis : ${book.author}</p>
        <p>Tahun : ${book.year}</p>
        <div class="action">
          <button class="green" onclick="moveBook(${book.id}, false)">Belum Selesai Dibaca</button>
          <button class="red" onclick="deleteBook(${book.id})">Hapus Buku</button>
        </div>
        `;
        completedBooksList.appendChild(bookItem);
      }
    }
  });
}

function addBook(title, author, year, isComplete) {
  // Create a new book object
  const newBook = {
    id: Date.now(),
    title,
    author,
    year,
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

function SubmitInputBook(evt) {
  // Prevent the default form submit behavior
  evt.preventDefault();

  // Get the values from the title, author, and pages fields
  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  const isComplete = document.getElementById("inputBookIsComplete").checked;

  // Add the new book to the bookshelf
  addBook(title, author, year, isComplete);

  // Reset the form
  evt.target.reset();
}

function findJudul(evt) {
  evt.preventDefault();
  
  const findJudul = document.getElementById("searchBookTitle").value;
  renderBookshelf(findJudul);

  // Reset the form
  evt.target.reset();
}