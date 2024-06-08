// const registerForm = document.querySelector(".register");
// const loginForm = document.querySelector(".login");

// const userName = document.querySelector("#user_name");
// const userEmail = document.querySelector("#user_email");
// const userPassword = document.querySelector("#user_password");

// const switchRegister = document.querySelector(".switch-register");
// const switchLogin = document.querySelector(".switch-login");

// const token = JSON.parse(localStorage.getItem("token"));

// switchRegister.addEventListener("click", () => {
//   registerForm.style.display = "block";
//   loginForm.style.display = "none";
// });

// switchLogin.addEventListener("click", () => {
//   registerForm.style.display = "none";
//   loginForm.style.display = "block";
// });

// if (!token) {
//   registerForm.style.display = "block";
//   loginForm.style.display = "none";
// } else {
//   registerForm.style.display = "none";
//   loginForm.style.display = "block";
// }

// registerForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   let obj = {};

//   obj = {
//     name: userName.value,
//     email: userEmail.value,
//     password: userPassword.value,
//   };

//   console.log(JSON.stringify(obj));

//   fetch("http://localhost:8000/api/users", {
//     method: "POST",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify(obj),
//   })
//     .then((res) => res.json())
//     .then(({ token }) => {
//       console.log(token);
//       localStorage.setItem("token", JSON.stringify(token));
//       localStorage.setItem("name", JSON.stringify(obj.name));
//       window.location.href = "./home.html";
//     });
// });

// loginForm.addEventListener("submit", (e) => {
//   e.preventDefault();
// });
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector(".register");
  const loginForm = document.querySelector(".login");

  const userName = document.querySelector("#user_name");
  const userEmail = document.querySelector("#user_email");
  const userPassword = document.querySelector("#user_password");

  const loginEmail = document.querySelector("#login_email");
  const loginPassword = document.querySelector("#login_password");

  const switchRegister = document.querySelector(".switch-register");
  const switchLogin = document.querySelector(".switch-login");

  const token = JSON.parse(localStorage.getItem("token"));

  function toggleForms(showRegister) {
    if (showRegister) {
      registerForm.classList.add("active");
      loginForm.classList.remove("active");
    } else {
      registerForm.classList.remove("active");
      loginForm.classList.add("active");
    }
  }

  switchRegister.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms(true);
  });
  switchLogin.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms(false);
  });

  toggleForms(!token);

  function handleFormSubmit(url, body) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((res) => res.json());
  }

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = {
      name: userName.value,
      email: userEmail.value,
      password: userPassword.value,
    };

    handleFormSubmit("http://localhost:8000/api/users", user)
      .then(({ token, user }) => {
        console.log(user);
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("name", JSON.stringify(user.name));
        window.location.href = "./home.html";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = {
      email: loginEmail.value,
      password: loginPassword.value,
    };
    handleFormSubmit("http://localhost:8000/api/auth", user)
      .then(({ token, user }) => {
        localStorage.setItem("token", JSON.stringify(token));
        window.location.href = "./home.html";
        localStorage.setItem("name", JSON.stringify(user.name));
        console.log(user);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
