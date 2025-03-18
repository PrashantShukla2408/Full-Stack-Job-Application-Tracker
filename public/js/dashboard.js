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

  logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", () => {
    window.location.href = "../views/login.html";
    localStorage.removeItem("token");
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

  async function getAllJobs() {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${backendURL}/jobs/getAllJobs`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.jobs;
  }

  function drawChart(jobs) {
    const statusCounts = jobs.reduce((acc, job) => {
      acc[job.status] = (acc[job.status] || 0) + 1;
      return acc;
    }, {});

    const data = new google.visualization.DataTable();
    data.addColumn("string", "Status");
    data.addColumn("number", "Count");
    Object.keys(statusCounts).forEach((status) => {
      data.addRow([status, statusCounts[status]]);
    });

    const options = {
      title: "Job Status ",
      width: 600,
      height: 400,
      bars: "horizontal",
      legend: { position: "none" },
    };

    const chart = new google.visualization.BarChart(
      document.getElementById("jobStatusChart")
    );
    chart.draw(data, options);
  }

  google.charts.load("current", { packages: ["corechart", "bar"] });
  google.charts.setOnLoadCallback(async () => {
    const jobs = await getAllJobs();
    drawChart(jobs);
  });

  getUserDetails();
});
