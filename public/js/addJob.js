document.addEventListener("DOMContentLoaded", () => {
  const backendURL = "http://localhost:5000";

  const jobTitle = document.getElementById("jobTitle").value;
  const companyName = document.getElementById("companyName").value;
  const location = document.getElementById("location").value;
  const applicationDate = document.getElementById("applicationDate").value;
  const status = document.getElementById("status").value;
  const salary = document.getElementById("salary").value;
  const followUpDate = document.getElementById("followUpDate").value;
  const notes = document.getElementById("notes").value;
  const resume = document.getElementById("resume").value;

  addJobForm.addEventListener("submit", handleFormSubmit);

  async function handleFormSubmit(event) {
    event.preventDefault();

    const jobData = {
      jobTitle: jobTitle,
      companyName: companyName,
      location: location,
      applicationDate: applicationDate,
      status: status,
      salary: salary,
      followUpDate: followUpDate,
      notes: notes,
      resume: resume,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${backendURL}/job/addJob`, jobData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      alert("Job added successfully");
    } catch (error) {
      console.error(error);
    }
  }
});
