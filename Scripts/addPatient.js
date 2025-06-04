function setupAddPatientPage() {
  const form = document.getElementById("add-patient-form");
  const confirmation = document.getElementById("add-patient-confirmation");
  const preview = document.getElementById("new-patient-preview");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Grab form values
    const fullName = document.getElementById("full-name").value.trim();
    const dob = document.getElementById("dob").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();

    // Display confirmation message
    confirmation.style.display = "block";

    // Build and show preview card
    preview.innerHTML = `
      <div class="preview-card">
        <h3>New Patient Summary</h3>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>DOB:</strong> ${dob}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>email:</strong> ${email}</p>
        <p><strong>Address:</strong> ${address}</p>
      </div>
    `;
    preview.style.display = "block";

    // Optional: clear form
    form.reset();
  });
}
