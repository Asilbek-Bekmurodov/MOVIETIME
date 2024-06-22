const genresList = document.querySelector(".genres__list");
const genreForm = document.querySelector(".genre__form");
const genreName = document.querySelector(".genre__name");
const token = JSON.parse(localStorage.getItem("token"));
const genreBtn = document.querySelector(".genre__btn");

genresList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = e.target.parentElement.dataset.id;
    console.log(id);

    fetch(`http://localhost:8000/api/genres/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    }).then((res) => {
      genresList.innerHTML = "";
      fetchGenre();
      console.log(res);
    });
  }
});

genreForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = {
    name: genreName.value,
  };

  handleGenreFormSubmit("http://localhost:8000/api/genres", obj)
    .then(() => {
      console.log("Add succesfuly");
      genreForm.reset();
    })
    .catch((err) => {
      console.log(err);
      alert("error");
    })
    .finally(() => {
      genresList.innerHTML = "";
      fetchGenre();
    });
});

async function handleGenreFormSubmit(url, body) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "x-auth-token": token,
    },
    body: JSON.stringify(body),
  });
  return await res.json();
}

function fetchGenre() {
  fetch("http://localhost:8000/api/genres")
    .then((res) => res.json())
    .then((data) => renderGenre(data));
}

function renderGenre(data) {
  console.log(data);
  data.forEach(({ name, _id }, idx) => {
    genresList.insertAdjacentHTML(
      "beforeend",
      `
      <li data-id="${_id}" class="genres__item">
        <span>${idx + 1}</span>
        <strong>${name}</strong>
        <button class="genre__btn">X</button>
      </li>
      `
    );
  });
}

fetchGenre();
