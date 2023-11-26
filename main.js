let bookshelf = [];

document.body.onload = () => {
  loadBookshelf();
  renderBookshelf();
};

function renderBookshelf(findJudul = "") {
  const { inProgressBooks, completedBooks } = getBookshelf();

  const inProgressBooksList = document.getElementById(
    "incompleteBookshelfList"
  );
  const completedBooksList = document.getElementById("completeBookshelfList");
  inProgressBooksList.innerHTML = "";
  completedBooksList.innerHTML = "";
  inProgressBooks.forEach((book) => {
    if (findJudul == "") {
      const bookItem = document.createElement("article");
      bookItem.classList.add("book_item");
      bookItem.innerHTML = `
      <h3>${book.title}</h3>
      <p>Penulis : ${book.author}</p>
      <p>Tahun : ${book.year}</p>
      <div class="action">
        <button class="green" onclick="moveBook(${book.id}, true)">Selesai Dibaca</button>
        <button class="red" onclick="createModalForDelete(${book.id})">Hapus Buku</button>
        <button class="blue" onclick="createModalForEdit(${book.id})">Edit Buku</button>
      </div>
      `;
      inProgressBooksList.appendChild(bookItem);
    } else {
      if (book.title.toLowerCase().includes(findJudul.toLowerCase())) {
        const bookItem = document.createElement("article");
        bookItem.classList.add("book_item");
        bookItem.innerHTML = `
        <h3>${book.title}</h3>
        <p>Penulis : ${book.author}</p>
        <p>Tahun : ${book.year}</p>
        <div class="action">
          <button class="green" onclick="moveBook(${book.id}, true)">Selesai Dibaca</button>
          <button class="red" onclick="createModalForDelete(${book.id})">Hapus Buku</button>
          <button class="blue" onclick="createModalForEdit(${book.id})">Edit Buku</button>
        </div>
        `;
        inProgressBooksList.appendChild(bookItem);
      }
    }
  });
  completedBooks.forEach((book) => {
    if (findJudul == "") {
      const bookItem = document.createElement("article");
      bookItem.classList.add("book_item");
      bookItem.innerHTML = `
      <h3>${book.title}</h3>
      <p>Penulis : ${book.author}</p>
      <p>Tahun : ${book.year}</p>
      <div class="action">
        <button class="green" onclick="moveBook(${book.id}, false)">Belum Selesai Dibaca</button>
        <button class="red" onclick="createModalForDelete(${book.id})">Hapus Buku</button>
        <button class="blue" onclick="createModalForEdit(${book.id})">Edit Buku</button>
      </div>
      `;
      completedBooksList.appendChild(bookItem);
    } else {
      if (book.title.toLowerCase().includes(findJudul.toLowerCase())) {
        const bookItem = document.createElement("article");
        bookItem.classList.add("book_item");
        bookItem.innerHTML = `
        <h3>${book.title}</h3>
        <p>Penulis : ${book.author}</p>
        <p>Tahun : ${book.year}</p>
        <div class="action">
          <button class="green" onclick="moveBook(${book.id}, false)">Belum Selesai Dibaca</button>
          <button class="red" onclick="createModalForDelete(${book.id})">Hapus Buku</button>
          <button class="blue" onclick="createModalForEdit(${book.id})">Edit Buku</button>
        </div>
        `;
        completedBooksList.appendChild(bookItem);
      }
    }
  });
}

function editBook(id, title, author, year) {
  const bookIndex = bookshelf.findIndex((book) => book.id === id);
  if (bookIndex !== -1) {
    bookshelf[bookIndex].title = title;
    bookshelf[bookIndex].author = author;
    bookshelf[bookIndex].year = year;

    localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
  }
  renderBookshelf();
}

function addBook(title, author, year, isComplete) {
  const newBook = {
    id: Date.now(),
    title,
    author,
    year,
    isComplete,
  };

  bookshelf.push(newBook);

  localStorage.setItem("bookshelf", JSON.stringify(bookshelf));

  renderBookshelf();
}

function getBookshelf() {
  const storedBookshelf = JSON.parse(localStorage.getItem("bookshelf"));

  const currentBookshelf = storedBookshelf !== null ? storedBookshelf : [];

  const inProgressBooks = currentBookshelf.filter((book) => !book.isComplete);
  const completedBooks = currentBookshelf.filter((book) => book.isComplete);

  return {
    inProgressBooks,
    completedBooks,
  };
}

function moveBook(bookId, isComplete) {
  const bookIndex = bookshelf.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    bookshelf[bookIndex].isComplete = isComplete;
    localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
  }

  renderBookshelf();
}

function deleteBook(bookId) {
  const bookIndex = bookshelf.findIndex((book) => book.id === bookId);

  if (bookIndex !== -1) {
    bookshelf.splice(bookIndex, 1);
    localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
  }

  renderBookshelf();
}

function loadBookshelf() {
  const storedBookshelf = JSON.parse(localStorage.getItem("bookshelf"));

  const currentBookshelf = storedBookshelf !== null ? storedBookshelf : [];

  bookshelf = currentBookshelf;
}

function SubmitInputBook(evt) {
  evt.preventDefault();

  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = parseInt(document.getElementById("inputBookYear").value);
  const isComplete = document.getElementById("inputBookIsComplete").checked;

  addBook(title, author, year, isComplete);

  evt.target.reset();
}

function findJudul(evt) {
  evt.preventDefault();

  const findJudul = document.getElementById("searchBookTitle").value;
  renderBookshelf(findJudul);

  evt.target.reset();
}

function createModalForDelete(id) {
  document.getElementById("modal").innerHTML = `
  <div id="id01" class="modal" style="display:block">
      <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
      <form class="modal-content">
        <div class="container">
          <h1>Hapus Buku</h1>
          <p>Apakah anda setuju untuk menghapus buku ini?</p>
    
          <div class="clearfix">
            <button type="button" class="cancelbtn" onclick="document.getElementById('id01').style.display='none'">Cancel</button>
            <button type="button" class="deletebtn" onclick="deleteBook(${id}); document.getElementById('id01').style.display='none'">Delete</button>
          </div>
        </div>
      </form>
    </div>
  `;
}

function SubmitEditBook(evt) {
  evt.preventDefault();

  const title = document.getElementById("editBookJudul").value;
  const author = document.getElementById("editBookAuthor").value;
  const year = parseInt(document.getElementById("editBookYear").value);
  const bookID = parseInt(document.getElementById("BookID").value);
  console.log({
    title,
    author,
    year,
    bookID,
  });
  editBook(bookID, title, author, year);

  evt.target.reset();
}

function createModalForEdit(id) {
  const bookIndex = bookshelf.findIndex((book) => book.id === id);

  document.getElementById("modal").innerHTML = `
  <div id="id01" class="modal" style="display:block">
    <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
    <form class="modal-content" onsubmit="SubmitEditBook(event)">
      <div class="container">
        <h1>Edit Buku</h1>

        <label for="judulBuku"><b>Judul Buku</b></label>
        <input id="editBookJudul" type="text" placeholder="Masukkan Nama Buku" name="judulBuku" value="${bookshelf[bookIndex].title}" required>

        <label for="penulis"><b>Penulis Buku</b></label>
        <input id="editBookAuthor" type="text" placeholder="Masukkan Penulis Buku" name="penulis" value="${bookshelf[bookIndex].author}" required>

        <label for="tahun"><b>Tahun Terbit</b></label>
        <input id="editBookYear" on type="number" placeholder="Masukkan Tahun Terbit" oninput="onlynumber(this)" value="${bookshelf[bookIndex].year}" name="tahun" required>

        <input hidden value="${id}" id="BookID">

        <button type="submit" onclick="document.getElementById('id01').style.display='none'">Edit</button>
      </div>
    </form>
  </div>
  `;
}

var modal = document.getElementById("id01");

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function onlynumber(input) {
  let ip = input.id;
  let res = ip.value;

  if (res != "") {
    if (isNaN(res)) {
      ip.value = "";
      return false;
    } else {
      return true;
    }
  }
}
