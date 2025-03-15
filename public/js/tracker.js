document.addEventListener("DOMContentLoaded", async () => {
  const backendURL = "http://localhost:5000";

  const addJobButton = document.getElementById("addJobButton");
  addJobButton.addEventListener("click", () => {
    window.location.href = "../views/addJob.html";
  });
});
