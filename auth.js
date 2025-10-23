import client from "./config.js";

let signupForm = document.getElementById("signup-form");

let signName = document.getElementById("username");
let signPhone = document.getElementById("phone");
let signEmail = document.getElementById("email");
let signPassword = document.getElementById("password");

// ---------------Loader functions
const loader = document.getElementById("loader-overlay");
function showLoader() {
  loader.style.display = "flex";
}
function hideLoader() {
  loader.style.display = "none";
}

//---------Sign-up authentication
async function signup(e) {
  e.preventDefault();

  if (
    signEmail.value &&
    signName.value &&
    signPhone.value &&
    signPassword.value
  ) {
    showLoader();
    try {
      const { data, error } = await client.auth.signUp({
        email: signEmail.value,
        password: signPassword.value,
        options: {
          data: {
            Name: signName.value,
            phone: signPhone.value,
          },
        },
      });
      if (error) throw error;

      Swal.fire({
        title: "Sign up successful!",
        text: "Now login with your new account 🎉",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "login.html";
      });
    } catch (error) {
      console.error(error);
      if (signEmail.value === "" || signPassword.value === "") {
        Swal.fire({
          icon: "warning",
          title: "Missing Fields",
          text: "Please fill all fields",
        });
      }else {
        Swal.fire({
        icon: "error",
        title: "signup Failed",
        text: error.message || "Something went wrong 😢",
      });
      }
    } finally {
      hideLoader();
    }
  } else {
    Swal.fire({
      icon: "warning",
      title: "Missing Fields",
      text: "Please fill all fields",
    });
  }
}

signupForm && signupForm.addEventListener("submit", signup);

//---------Login authentication
let loginForm = document.getElementById("login-form");

let loginEmail = document.getElementById("email");
let loginPassword = document.getElementById("password");

//---------Sign-up authentication
async function login(e) {
  e.preventDefault();

  if (loginEmail.value && loginPassword.value) {
    showLoader();
    try {
      const { data, error } = await client.auth.signInWithPassword({
        email: loginEmail.value,
        password: loginPassword.value,
      });
      if (error) throw error;

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });

      Toast.fire({
        icon: "success",
        title: "Login successful!",
      });

      setTimeout(() => {
        window.location.href = "home.html";
      }, 1500);
    } catch (error) {
      console.error(error);
      if (loginEmail.value === "" || loginPassword.value === "") {
        Swal.fire({
          icon: "warning",
          title: "Missing Fields",
          text: "Please fill all fields",
        });
      }else {
        Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Something went wrong 😢",
      });
      }
    } finally {
      hideLoader();
    }
  } else {
    Swal.fire({
      icon: "warning",
      title: "Missing Fields",
      text: "Please fill all fields",
    });
  }
}

loginForm && loginForm.addEventListener("submit", login);
