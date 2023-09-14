const textWrapper = document.querySelector('.textWrapper');
const addBtn = document.querySelector('#btn');
const input = document.querySelectorAll('.input');
const list = document.getElementById('list');
const addNew = document.getElementById('new');
const contact = document.getElementById('contact');
const form = document.querySelector('form');
const title = document.querySelector('.title');
const line = document.querySelector('.line');
const h1 = document.querySelector('h1');
const contactInfo = document.querySelector('#contact-info');

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
      textWrapper.style.border = '3px solid black';
      localStorage.setItem('myBookList', JSON.stringify(this.bookList));
    } else {
      textWrapper.style.border = 'none';
    }
    input[0].value = '';
    input[1].value = '';
  }
}

const books = new BookList();
books.loadBooks();

//  ====== Navigation =======
list.addEventListener('click', () => {
  form.style.display = 'none';
  title.style.display = 'none';
  textWrapper.style.display = 'block';
  contactInfo.style.display = 'none';
});

addNew.addEventListener('click', () => {
  textWrapper.style.display = 'none';
  line.style.display = 'none';
  h1.style.display = 'none';
  form.style.display = 'flex';
  contactInfo.style.display = 'none';
});

function info() {
  let information = '';
  information += `
<h3>Contact Information</h3>
<p> Do you have any question or you just want to say "hello"?<br>You can reach out to us!</p>
<ul class="contactList">
<li>Our e-mail: mail@mail.com</li>
<li>Our phone number: 0043586534422</li>
<li>Our address: Streetnam 22, 84503 City, Country</li>
</ul>
`;
  contactInfo.innerHTML = information;
}

contact.addEventListener('click', () => {
  textWrapper.style.display = 'none';
  form.style.display = 'none';
  title.style.display = 'none';
  contactInfo.style.display = 'block';
  h1.style.display = 'none';

  info();
});
