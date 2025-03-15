document.addEventListener("DOMContentLoaded", async () => {
  const backendURL = "http://localhost:5000";

  const addCompanyForm = document.getElementById("addCompanyForm");

  addCompanyForm.addEventListener("submit", handleFormSubmit);

  async function handleFormSubmit(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const location = document.getElementById("location").value;
    const industry = document.getElementById("industry").value;
    const website = document.getElementById("website").value;
    const type = document.getElementById("type").value;
    const size = document.getElementById("size").value;
    const notes = document.getElementById("notes").value;

    const companyData = {
      name: name,
      location: location,
      industry: industry,
      website: website,
      type: type,
      size: size,
      notes: notes,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${backendURL}/company/addCompany`,
        companyData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      alert("Company added successfully");
      addCompanyForm.reset();
      window.location.href = `../views/company.html`;
    } catch (error) {
      console.error(error);
    }
  }
});
