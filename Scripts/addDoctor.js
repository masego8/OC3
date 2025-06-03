function setupAddDoctorForm() {
  const form = document.getElementById("add-doctor-form");
  const confirmation = document.getElementById("add-doctor-confirmation");
  const previewContainer = document.getElementById("new-doctor-preview");

  if (!form || !confirmation || !previewContainer) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const doctor = {
      fullName: document.getElementById("full-name").value,
      email: document.getElementById("email").value,
      specialization: document.getElementById("specialization").value,
      phone: document.getElementById("phone").value,
      department: document.getElementById("department").value,
    };

    console.log("📋 New doctor data:", doctor);

    // Show confirmation
    confirmation.style.display = "block";

    // Show preview
    previewContainer.innerHTML = `
      <h3>✅ Doctor Added:</h3>
      <p><strong>Name:</strong> ${doctor.fullName}</p>
      <p><strong>Email:</strong> ${doctor.email}</p>
      <p><strong>Specialization:</strong> ${doctor.specialization}</p>
      <p><strong>Phone:</strong> ${doctor.phone}</p>
      <p><strong>Department:</strong> ${doctor.department}</p>
    `;
    previewContainer.style.display = "block";

    // Reset form
    form.reset();

    // Hide confirmation after 3 seconds
    setTimeout(() => {
      confirmation.style.display = "none";
    }, 3000);
  });
}
