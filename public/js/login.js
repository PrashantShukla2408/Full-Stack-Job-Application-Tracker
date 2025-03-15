document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginStatus = document.getElementById("loginStatus");
  loginForm.addEventListener("submit", handleFormSubmit);

  const backendURL = "http://localhost:5000";

  async function handleFormSubmit(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const loginData = {
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        `${backendURL}/users/login`,
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("User logged in successfully");
      loginStatus.innerHTML = `<p>${response.data.message}</p>`;
      localStorage.setItem("token", response.data.token);
      window.location.href = "../views/dashboard.html";
      loginForm.reset();
    } catch (error) {
      alert("Invalid credentials");
      console.error(
        "Error during login:",
        error.response ? error.response.data.message : error.message
      );
      loginStatus.innerHTML = `<p>${
        error.response ? error.response.data.message : "Internal server error"
      }</p>`;
    }
  }
});
