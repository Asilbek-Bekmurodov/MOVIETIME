const welcomeText = document.querySelector("#welcome");
const movieTable = document.querySelector(".movie-table");

const usName = JSON.parse(localStorage.getItem("name"));
welcomeText.innerHTML = `${usName.toUpperCase()}, welcome to MOVIE-TIME`;

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
    tr.innerHTML = `
    <td >${idx + 1}</td>
    <td>${item.title}</td>
    <td>${item.genre.name}</td>
    <td>${item.numberInStock}</td>
    <td class="table-cell">
      <button class="btn btn-delete">Delete</button>
    </td>
    <td class="table-cell">
      <button class="btn btn-edit">Edit</button>
    </td>
  `;

    movieTable.append(tr);
  });
}
getMovies();
