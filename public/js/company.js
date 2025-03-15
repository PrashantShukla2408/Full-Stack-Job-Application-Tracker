document.addEventListener("DOMContentLoaded", () => {
  const addCompanyButton = document.getElementById("addCompanyButton");

  addCompanyButton.addEventListener("click", () => {
    window.location.href = "../views/addCompany.html";
  });

  const backendURL = "http://localhost:5000";

  const companyTablebody = document.getElementById("companyTableBody");

  async function getCompanies() {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${backendURL}/company/getCompanies`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const companies = response.data.companies;
    companies.forEach((company) => {
      const companyRow = document.createElement("tr");
      companyRow.innerHTML = `
            <td>${company.name}</td>
            <td>${company.location}</td>
            <td>${company.industry}</td>
            <td>${company.website}</td>
            <td>${company.type}</td>
            <td>${company.size}</td>
            <td>${company.notes}</td>
        `;
      companyTablebody.appendChild(companyRow);
    });
  }

  getCompanies();
});
