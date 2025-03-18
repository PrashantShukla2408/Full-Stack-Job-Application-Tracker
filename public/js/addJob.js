document.addEventListener("DOMContentLoaded", () => {
  const backendURL = "http://localhost:5000";

  const addJobForm = document.getElementById("addJobForm");

  addJobForm.addEventListener("submit", handleFormSubmit);

  async function handleFormSubmit(event) {
    event.preventDefault();
    const jobTitle = document.getElementById("jobTitle").value;
    const companyName = document.getElementById("companyName").value;
    const location = document.getElementById("location").value;
    const applicationDate = document.getElementById("applicationDate").value;
    const status = document.getElementById("status").value;
    const salary = document.getElementById("salary").value;
    const followUpDate = document.getElementById("followUpDate").value;
    const notes = document.getElementById("notes").value;

    const resumeInput = document.getElementById("resume");
    const resumeFile = resumeInput.files[0];

    const jobData = new FormData();
    jobData.append("jobTitle", jobTitle);
    jobData.append("companyName", companyName);
    jobData.append("location", location);
    jobData.append("applicationDate", applicationDate);
    jobData.append("status", status);
    jobData.append("salary", salary);
    jobData.append("followUpDate", followUpDate);
    jobData.append("notes", notes);
    jobData.append("resume", resumeFile);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${backendURL}/jobs/addJob`, jobData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      alert("Job added successfully");
      window.location.href = "../views/tracker.html";
    } catch (error) {
      console.error(error);
    }
  }
});
