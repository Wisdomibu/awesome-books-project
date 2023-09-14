const textWrapper = document.querySelector('.textWrapper');
const addBtn = document.querySelector('#btn');
const input = document.querySelectorAll('.input');

class BookList {
  constructor() {
    this.addBook = this.addBook.bind(this);
    this.createElem = this.createElem.bind(this);
    addBtn.addEventListener('click', this.addBook);
  }

  loadBooks() {
    this.bookList = JSON.parse(localStorage.getItem('myBookList')) || [];
    this.bookList.forEach((book) => {
      this.createElem(book.title, book.author);
    });
  }

  createElem(inputValueTitle, inputValueaAuthor) {
    const container = document.createElement('div');
    container.className = 'bookContainer';
    const h3 = document.createElement('h3');
    h3.innerHTML = inputValueTitle;
    const p = document.createElement('p');
    p.innerText = `by ${inputValueaAuthor}`;
    const button = document.createElement('button');
    button.innerText = 'Remove';
    const divLine = document.createElement('div');
    divLine.append(h3, p);
    divLine.className = 'listdiv';
    // Remove Button part
    button.addEventListener('click', () => {
      container.style.display = 'none';
      this.bookList.splice(
        this.bookList.findIndex(
          (book) => book.title === inputValueTitle && book.author === inputValueaAuthor,
        ),
        1,
      );
      localStorage.setItem('myBookList', JSON.stringify(this.bookList));
    });

    container.append(divLine, button);
    textWrapper.appendChild(container);
  }

  addBook() {
    const inputValueTitle = input[0].value;
    const inputValueaAuthor = input[1].value;
    if (inputValueTitle !== '' && inputValueaAuthor !== '') {
      this.bookList.push({ title: inputValueTitle, author: inputValueaAuthor });
      this.createElem(inputValueTitle, inputValueaAuthor);
      localStorage.setItem('myBookList', JSON.stringify(this.bookList));
    }
    input[0].value = '';
    input[1].value = '';
  }
}

const books = new BookList();
books.loadBooks();
