"use script";
let obj = {};
const tbody = document.querySelector("tbody");
const addBtn = document.querySelector("[add-btn]");
const title = document.querySelector(".title");
const author = document.querySelector(".author");
const year = document.querySelector(".year");

let allBooks = JSON.parse(localStorage.getItem("allBooks"))
  ? JSON.parse(localStorage.getItem("allBooks"))
  : [
      {
        id: Date.now(),
        title: "Solihlar gulshani",
        author: "Honiy al-Haj",
        createdYear: 2022,
        isRead: false,
      },
    ];

const saveStorage = (books) => {
  localStorage.setItem("allBooks", JSON.stringify(books));
};

saveStorage(allBooks);

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (title.value && author.value && year.value) {
    obj = {
      id: Date.now(),
      title: title.value,
      author: author.value,
      createdYear: year.value,
      isRead: false,
    };
    allBooks.push(obj);
    title.value = "";
    author.value = "";
    year.value = "";
  } else alert("Iltimos maydonlarni to`liq to`ldiring!");

  setAllBooks(allBooks);
  saveStorage(allBooks);
});

const setAllBooks = (books) => {
  tbody.innerHTML = ``;
  books.forEach((book) => {
    tbody.innerHTML += `
        <tr class="border-b border-slate-300 hover:bg-slate-200 overflow-x-auto">
            <td class="text-center font-medium py-2 ${
              book.isRead ? "line-through text-green-700" : ""
            }">${book.title}</td>
            <td class="text-center font-medium py-2 ${
              book.isRead ? "line-through text-green-700" : ""
            }">${book.author}</td>
            <td class="text-center font-medium py-2 ${
              book.isRead ? "line-through text-green-700" : ""
            }">${book.createdYear}</td>
            <td>
            <div class=" flex items-center justify-center gap-[10px]">
                <button onclick="isReadBook(${book.id})"
                    class="bg-green-500 hover:bg-green-600 rounded transitin-all duration-300
                    ${book.isRead ? "block" : "hidden"}"
                >
                    <i class="fa-solid fa-check p-2"></i>
                </button>
                <button onclick="isReadBook(${book.id})"
                    class="w-[30px] bg-yellow-400 hover:bg-yellow-500 rounded transitin-all duration-300
                    ${book.isRead ? "hidden" : "block"}"
                >
                    <i class="fa-sharp fa-solid fa-xmark p-2"></i>
                </button>
                <button onclick="deleteBook(${book.id})"
                    class="bg-red-500 hover:bg-red-600 rounded transitin-all duration-300"
                >
                    <i class="fa-sharp fa-solid fa-trash p-2"></i>
                </button>
                </div>
            </td>
            </tr>
      `;
  });
};

setAllBooks(allBooks);

const isReadBook = (id) => {
  allBooks.forEach((book) => {
    if (book.id === id) {
      book.isRead = !book.isRead;
    }
  });
  setAllBooks(allBooks);
  saveStorage(allBooks);
};

const deleteBook = (id) => {
  allBooks.map((book) => {
    if (book.id === id) {
      if (confirm(`Are you sure, you want to delete!`)) {
        allBooks = allBooks.filter((book) => book.id !== id);
        setAllBooks(allBooks);
        saveStorage(allBooks);
      }
    }
  });
};
