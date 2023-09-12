class BookList {
  constructor() {
    this.textWrapper = document.querySelector(".textWrapper");
    this.addBtn = document.querySelector("#btn");
    this.input = document.querySelectorAll(".input");
    this.bookList = JSON.parse(localStorage.getItem("myBookList")) || [];
    this.addBtn.addEventListener("click", this.addBook.bind(this));
    this.renderBooks();
  }

  renderBooks() {
    this.textWrapper.innerHTML = "";
    this.bookList.forEach((book) => {
      this.createElem(book.title, book.author);
    });
  }

  createElem(inputValueTitle, inputValueAuthor) {
    const container = document.createElement("div");
    container.className = "bookContainer";
    const h3 = document.createElement("h3");
    h3.innerHTML = inputValueTitle;
    const p = document.createElement("p");
    p.innerText = inputValueAuthor;
    const button = document.createElement("button");
    button.innerText = "Remove";
    const divLine = document.createElement("div");
    divLine.className = "line";

    button.addEventListener("click", () => {
      container.style.display = "none";
      this.removeBook(inputValueTitle, inputValueAuthor);
    });

    container.append(h3, p, button, divLine);
    this.textWrapper.appendChild(container);
  }

  addBook() {
    const inputValueTitle = this.input[0].value;
    const inputValueAuthor = this.input[1].value;
    if (inputValueTitle !== "" && inputValueAuthor !== "") {
      this.bookList.push({ title: inputValueTitle, author: inputValueAuthor });
      this.createElem(inputValueTitle, inputValueAuthor);
      localStorage.setItem("myBookList", JSON.stringify(this.bookList));
    }
    this.input[0].value = "";
    this.input[1].value = "";
  }

  removeBook(title, author) {
    const bookIndex = this.bookList.findIndex(
      (book) => book.title === title && book.author === author
    );
    if (bookIndex !== -1) {
      this.bookList.splice(bookIndex, 1);
      localStorage.setItem("myBookList", JSON.stringify(this.bookList));
    }
  }
}

const bookListApp = new BookList();
