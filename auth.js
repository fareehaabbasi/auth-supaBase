import client from "./config.js";

// ---------------Loader functions
const loader = document.getElementById("loader-overlay");
function showLoader() {
  loader.style.display = "flex";
}
function hideLoader() {
  loader.style.display = "none";
}


//------------Toggle eye button
const passwordInput = document.getElementById('password');
const toggleBtn = document.getElementById('togglePassword');

toggleBtn.addEventListener('click', () =>  {
  let isPassword = passwordInput.type === 'password';
  passwordInput.type = isPassword ? 'text' : 'password';

  //create elements
  toggleBtn.classList.toggle("fa-eye");
  toggleBtn.classList.toggle("fa-eye-slash");
})



//------------user profile functionality
async function userProfile() {
  try {
    const response = await client.auth.getUser()
    let user = response.data.user;
    let error = response.error;
    console.log(user);
    console.log(error);
    console.log(response);
    

    if (error) throw error;

    // Agar user mil gaya (matlab user logged in hai)
    if(user) {
      console.log("User Profile:", user);
      let profileName = document.getElementById("profile-name");
      // let profileEmail = document.getElementById("profile-email");
      // let profilePhone = document.getElementById("profile-phone");

      if(profileName){
        profileName.textContent = user.user_metadata.Name || "User";
      }

      // Agar user index page par hai to home page par bhej do
      if (window.location.pathname.includes("index.html")) {
        window.location.href = "home.html";
      }
      
    }else {
      console.log("User not found, redirecting...");
      if (!window.location.pathname.includes("index.html") && !window.location.pathname.includes("login.html") && !window.location.pathname.includes("signup.html")) {
        window.location.href = "index.html";
      }
    }
  }catch (error) {
    console.log(error);
    // Error aane par bhi redirect kar do
    if (!window.location.pathname.includes("index.html") && !window.location.pathname.includes("login.html") && !window.location.pathname.includes("signup.html")) {
      window.location.href = "index.html";
    }
  }
}

//---------Sign-up authentication
let signupForm = document.getElementById("signup-form");

let signName = document.getElementById("username");
let signPhone = document.getElementById("phone");
let signEmail = document.getElementById("email");
let signPassword = document.getElementById("password");

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

// ----------------- PAGE LOAD EVENT -----------------
document.addEventListener("DOMContentLoaded", async () => {
//   // Agar Google OAuth ke baad redirect hua hai (access_token mila)
  if (window.location.hash.includes("access_token")) {
    const { data: { session } } = await client.auth.getSession();

    // Agar session mila to home page par bhej do
    if (session) {
      window.location.href = "home.html";
      return;
    }
  }

  // Agar page index.html ya login.html nahi hai
  // to userProfile() function call karo (check user login)
  const currentPage = window.location.pathname;
  if (!currentPage.includes("index.html") && !currentPage.includes("login.html")) {
    userProfile();
  }
});

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

//----------------logout functionality
let logoutBtn = document.getElementById('logout-btn');

async function logout() {
  try {
    const { error } = await client.auth.signOut()

    if(!error) {
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
        title: "Logout successful!",
      });

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    }
  }catch (error) {
    console.log(error);
    Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error.message || "Something went wrong 😢",
      });
  }
}

logoutBtn && logoutBtn.addEventListener('click', logout)
