import client from "./config.js";

let signupForm = document.getElementById("signup-form");

let signName = document.getElementById("username");
let signPhone = document.getElementById("phone");
let signEmail = document.getElementById("email");
let signPassword = document.getElementById("password");

const loader = document.getElementById("loader-overlay");

function showLoader() {
    loader.style.display = 'flex';
};
function hideLoader() {
    loader.style.display = 'none';
};

//---------Sign-up authentication
async function signup(e) {
  e.preventDefault();

  if (signEmail.value && signName.value && signPhone.value && signPassword.value) {
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
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message || "Something went wrong 😢",
      });
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

signupForm && signupForm.addEventListener('submit', signup);
