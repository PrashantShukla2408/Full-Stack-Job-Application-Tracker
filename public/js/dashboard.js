document.addEventListener("DOMContentLoaded", async () => {
  const backendURL = "http://localhost:5000";

  const profileNavLink = document.getElementById("profileNavLink");
  profileNavLink.addEventListener("click", () => {
    window.location.href = "../views/profile.html";
  });

  const companyNavLink = document.getElementById("companyNavLink");
  companyNavLink.addEventListener("click", () => {
    window.location.href = "../views/company.html";
  });

  const trackerNavLink = document.getElementById("trackerNavLink");
  trackerNavLink.addEventListener("click", () => {
    window.location.href = "../views/tracker.html";
  });

  const nameContainer = document.getElementById("nameContainer");
  const profileContainer = document.getElementById("profileContainer");
  const careerGoalsContainer = document.getElementById("careerGoalsContainer");

  async function getUserDetails() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`${backendURL}/users/getUserDetails`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const userDetails = response.data;
      nameContainer.innerHTML = `<h2>Welcome ${userDetails.name}</h2>`;
      profileContainer.innerHTML = `
      <h5>Profile Info</h5>
      <p>${userDetails.profileInfo}</p>
      `;
      careerGoalsContainer.innerHTML = `
        <h5>Career Goals</h5>
        <p>${userDetails.careerGoals}</p>
      `;
      console.log(userDetails);
    } catch (error) {
      console.log(error);
    }
  }

  getUserDetails();
});
