const welcomeText = document.querySelector("#welcome");
const movieTable = document.querySelector(".table-body");
const btnDelete = document.querySelectorAll(".tr");
const usName = JSON.parse(localStorage.getItem("name"));
welcomeText.innerHTML = `${usName.toUpperCase()}, welcome to MOVIE-TIME`;
const token = JSON.parse(localStorage.getItem("token"));

function getMovies() {
  fetch("http://localhost:8000/api/movies")
    .then((res) => res.json())
    .then((data) => {
      renderMovies(data);
      console.log(data);
    })
    .catch((error) => console.log(error));
}

function renderMovies(data) {
  data.forEach((item, idx) => {
    let tr = document.createElement("tr");
    tr.classList.add("tr");
    tr.innerHTML = `
    <td >${idx + 1}</td>
    <td>${item.title}</td>
    <td>${item.genre.name}</td>
    <td>${item.numberInStock}</td>
    <td class="table-cell">
      <button data-id="${item._id}" class="btn btn-delete">Delete</button>
    </td>
    <td class="table-cell">
      <button class="btn btn-edit">Edit</button>
    </td>
  `;

    movieTable.append(tr);
  });
}

async function deleteMovie(id) {
  const res = await fetch(`http://localhost:8000/api/movies/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": token,
    },
  });
  return res;
}

movieTable.addEventListener("click", async (e) => {
  if (e.target.tagName == "BUTTON") {
    console.log(e.target.dataset.id);
    try {
      const res = await deleteMovie(e.target.dataset.id);
      const data = await res.json();
      console.log(data);
      console.log("Movie succesfully deleted");
      movieTable.innerHTML = "";
      getMovies();
    } catch (error) {
      console.error("Error:", error);
    }
  }
});

getMovies();
