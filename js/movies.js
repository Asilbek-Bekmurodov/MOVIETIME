const movieForm = document.querySelector(".movie-form");
const movieGenres = document.querySelector(".movie-genres");
const movieTitle = document.querySelector("#movie__title");
const movieStock = document.querySelector("#movie__stock");
const movieRate = document.querySelector("#movie__rate");
const formError = document.querySelector(".form-error");
const token = JSON.parse(localStorage.getItem("token"));
// toast
let toastBox = document.getElementById("toastBox");
let successMsg = "<i class='fa-solid fa-bolt'></i> Successfully submitted";
let errorMsg = '<i class="fa-solid fa-xmark"></i> Please fix the error';
let invalidMsg =
  '<i class="fa-solid fa-circle-exclamation"></i> Invalid input, check again';

async function fetchGenre() {
  try {
    const res = await fetch("http://localhost:8000/api/genres");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return null; // or handle the error as needed
  }
}

fetchGenre().then((data) => renderGenres(data));

function renderGenres(data) {
  data.forEach(({ name, _id }) => {
    movieGenres.insertAdjacentHTML(
      "beforeend",
      `<option  value="${_id}">${name}</option>`
    );
  });
}

movieForm.onsubmit = function (e) {
  e.preventDefault();

  console.log(movieGenres.value);
  console.log("submit");

  const obj = {
    title: movieTitle.value,
    genreId: movieGenres.value,
    numberInStock: movieStock.value,
    dailyRentalRate: movieRate.value,
  };

  handleMovieFormSubmit("http://localhost:8000/api/movies", obj)
    .then(() => {
      showToast(successMsg);
      movieForm.reset();
    })
    .catch((err) => {
      showToast(errorMsg);
      formError.innerHTML = "Something went wrong";
    })
    .finally(() => {
      setTimeout(() => {
        formError.innerHTML = "";
      }, 2000);
    });
};

async function handleMovieFormSubmit(url, body) {
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

// toast

function showToast(msg) {
  let toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML = msg;
  toastBox.appendChild(toast);

  if (msg.includes("error")) {
    toast.classList.add("error");
  } else if (msg.includes("Invalid")) {
    toast.classList.add("invalid");
  }

  setTimeout(() => {
    toast.remove();
  }, 5000);
}
