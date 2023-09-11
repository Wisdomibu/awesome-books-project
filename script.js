
const container = document.querySelector(".container");
const textWrapper = document.querySelector(".textWrapper");
const addBtn = document.querySelector("#btn");
const input = document.querySelectorAll(".input");
const bookList = JSON.parse(localStorage.getItem("myBookList")) || [];

function addBook() {
  console.log("clicked to add book");
  let inputValueTitle = input[0].value;
  let inputValueaAuthor = input[1].value;
  if (inputValueTitle !== "" && inputValueaAuthor !== "") {
    console.log(bookList);
    bookList.push({ title: inputValueTitle, author: inputValueaAuthor });
    createElement(inputValueTitle, inputValueaAuthor);
    localStorage.setItem("myBookList", JSON.stringify(bookList));
  }
  input[0].value = "";
  input[1].value = "";
}

addBtn.addEventListener("click", addBook);

function createElement(inputValueTitle, inputValueaAuthor) {
  const container = document.createElement("div");
  container.className = "bookContainer";
  const h3 = document.createElement("h3");
  h3.innerHTML = inputValueTitle;
  const p = document.createElement("p");
  p.innerText = inputValueaAuthor;
  const button = document.createElement("button");
  button.innerText = "Remove";
  const divLine = document.createElement("div");
  divLine.className = "line";

  // Remove Button part
  button.addEventListener("click", () => {
    container.style.display = "none";
    bookList.splice(
      bookList.findIndex(
        (book) =>
          book.title === inputValueTitle && book.author === inputValueaAuthor
      ),
      1
    );
    localStorage.setItem("myBookList", JSON.stringify(bookList));
  });

  container.append(h3, p, button, divLine);
  textWrapper.appendChild(container);
}

// Populate book list from local storage on page load
for (const book of bookList) {
  createElement(book.title, book.author);
}