document.addEventListener("DOMContentLoaded", async () => {
  const backendURL = "http://localhost:5000";
  const jobsTableBody = document.getElementById("jobsTableBody");
  const statusFilter = document.getElementById("statusFilter");
  const addJobButton = document.getElementById("addJobButton");
  const searchInput = document.getElementById("searchInput");

  let allJobs = [];

  addJobButton.addEventListener("click", () => {
    window.location.href = "../views/addJob.html";
  });

  async function getAllJobs() {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${backendURL}/jobs/getAllJobs`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const jobs = response.data.jobs;
    allJobs = jobs;
    displayJobs(jobs);
  }

  function displayJobs(jobs) {
    const token = localStorage.getItem("token");
    jobsTableBody.innerHTML = "";
    jobs.forEach((job) => {
      const jobRow = document.createElement("tr");
      jobRow.innerHTML = `
          <td>${job.jobTitle}</td>
          <td>${job.companyName}</td>
          <td>${job.location}</td>
          <td>${job.applicationDate}</td>
          <td>
            <select data-id="${job.id}" class="statusInput">
              <option value="Applied" ${
                job.status === "Applied" ? "selected" : ""
              }>Applied</option>
              <option value="Interview" ${
                job.status === "Interview" ? "selected" : ""
              }>Interview</option>
              <option value="Offer" ${
                job.status === "Offer" ? "selected" : ""
              }>Offer</option>
              <option value="Rejected" ${
                job.status === "Rejected" ? "selected" : ""
              }>Rejected</option>
            </select>
          </td>
          <td>${job.salary}</td>
          <td><input type="date" value="${job.followUpDate}" data-id="${
        job.id
      }" class="followUpDateInput"></td>
          <td><textarea data-id="${job.id}" class="notesInput">${
        job.notes
      }</textarea></td>
          <td><button data-id="${job.id}" class="saveButton">Save</button></td>
        `;
      jobsTableBody.appendChild(jobRow);
    });

    document.querySelectorAll(".saveButton").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const jobId = event.target.getAttribute("data-id");
        const status = document.querySelector(
          `.statusInput[data-id="${jobId}"]`
        ).value;
        const followUpDate = document.querySelector(
          `.followUpDateInput[data-id="${jobId}"]`
        ).value;
        const notes = document.querySelector(
          `.notesInput[data-id="${jobId}"]`
        ).value;

        try {
          const response = await axios.put(
            `${backendURL}/jobs/updateJob/${jobId}`,
            { status, followUpDate, notes },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(response.data);
          alert("Job updated successfully");
        } catch (error) {
          console.error(error);
        }
      });
    });
  }

  statusFilter.addEventListener("change", async () => {
    const token = localStorage.getItem("token");
    const selectedStatus = statusFilter.value;
    console.log("selected status: ", selectedStatus);

    const response = await axios.get(`${backendURL}/jobs/getAllJobs`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const jobs = response.data.jobs;
    console.log("All jobs: ", jobs);

    if (selectedStatus) {
      const filteredJobs = jobs.filter(
        (job) => job.status.trim().toLowerCase() === selectedStatus
      );
      console.log("Filtered jobs: ", filteredJobs);
      displayJobs(filteredJobs);
    } else {
      displayJobs(jobs);
    }
  });

  searchInput.addEventListener("keydown", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    console.log("search term:", searchTerm);
    if (searchTerm) {
      const searchedJobs = allJobs.filter(
        (job) =>
          job.jobTitle.trim().toLowerCase().includes(searchTerm) ||
          job.companyName.trim().toLowerCase().includes(searchTerm) ||
          job.location.trim().toLowerCase().includes(searchTerm)
      );
      console.log("searched jobs:", searchedJobs);
      displayJobs(searchedJobs);
    } else {
      displayJobs(allJobs);
    }
  });

  getAllJobs();
});
