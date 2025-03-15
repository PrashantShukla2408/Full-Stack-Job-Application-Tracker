document.addEventListener("DOMContentLoaded", () => {
  const careerGoalsAndProfileInfoForm = document.getElementById(
    "careerGoalsAndProfileInfoForm"
  );

  careerGoalsAndProfileInfoForm.addEventListener("submit", handleFormSubmit);

  async function handleFormSubmit() {
    event.preventDefault();
    const profileInfo = document.getElementById("profileInfo").value;
    const careerGoals = document.getElementById("careerGoals").value;

    const data = {
      profileInfo: profileInfo,
      careerGoals: careerGoals,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        "http://localhost:5000/users/profile",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      alert("Profile updated successfully");
      winndow.location.href = "../views/dashboard.html";
      careerGoalsAndProfileInfoForm.reset();
    } catch (error) {
      console.error(error);
    }
  }
});
