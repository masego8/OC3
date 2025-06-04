function setupPatientsPage() {
    // All the patient management code goes inside here...

    const mockPatients = [
  { id: "P001", name: "Masego", surname: "Mathibako", dob: "1985-04-12", phone: "07123456789", insurance: "49125477" },
  { id: "P002", name: "Lebo", surname: "Mokoena", dob: "1990-07-08", phone: "07123456788", insurance: "82345612" },
  { id: "P003", name: "Amir", surname: "Patel", dob: "1982-03-15", phone: "07123456787", insurance: "23456789" }
];

let editingPatientId = null;
let currentPatients = [...mockPatients];

function renderPatientTable(patients) {
  const body = document.getElementById('patient-table-body');
  if (!body) return;

  body.innerHTML = "";

  if (patients.length === 0) {
    body.innerHTML = `<tr><td colspan="7" style="text-align:center;">No patients found</td></tr>`;
    return;
  }

  patients.forEach(pat => {
    const isEditing = editingPatientId === pat.id;

    const row = `
      <tr>
        <td>${pat.id}</td>
        <td>${isEditing ? `<input type="text" value="${pat.name}" class="edit-input">` : pat.name}</td>
        <td>${isEditing ? `<input type="text" value="${pat.surname}" class="edit-input">` : pat.surname}</td>
        <td>${isEditing ? `<input type="text" value="${pat.dob}" class="edit-input">` : pat.dob}</td>
        <td>${isEditing ? `<input type="text" value="${pat.phone}" class="edit-input">` : pat.phone}</td>
        <td>${isEditing ? `<input type="text" value="${pat.insurance}" class="edit-input">` : pat.insurance}</td>
        <td>
          ${
            isEditing
              ? `
                <button class="btn action-btn btn-save" data-id="${pat.id}"><i class="fas fa-save"></i> Save</button>
                <button class="btn action-btn btn-cancel" data-id="${pat.id}"><i class="fas fa-times"></i> Cancel</button>
              `
              : `
                <button class="btn action-btn btn-edit" data-id="${pat.id}"><i class="fas fa-edit"></i> Edit</button>
                <button class="btn action-btn btn-remove" data-id="${pat.id}"><i class="fas fa-trash"></i> Remove</button>
              `
          }
        </td>
      </tr>
    `;
    body.innerHTML += row;
  });

  setupPatientEditButtons();
}

function applyPatientSearch() {
  const term = document.getElementById('search').value.toLowerCase().trim();
  const filtered = currentPatients.filter(pat =>
    pat.name.toLowerCase().includes(term) || pat.surname.toLowerCase().includes(term)
  );
  renderPatientTable(filtered);
}

function removePatient(id) {
  if (confirm("Are you sure you want to remove this patient?")) {
    currentPatients = currentPatients.filter(pat => pat.id !== id);
    renderPatientTable(currentPatients);
  }
}

function setupPatientEditButtons() {
  const editButtons = document.querySelectorAll(".btn-edit");

  editButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const row = btn.closest("tr");
      const cells = row.querySelectorAll("td");
      const removeBtn = row.querySelector(".btn-remove");

      if (btn.innerText.trim() === "Edit") {
        // Store original values
        row.dataset.originalName = cells[1].innerText;
        row.dataset.originalSurname = cells[2].innerText;
        row.dataset.originalDob = cells[3].innerText;
        row.dataset.originalPhone = cells[4].innerText;
        row.dataset.originalInsurance = cells[5].innerText;

        // Convert to input fields
        cells[1].innerHTML = `<input type="text" value="${cells[1].innerText}" class="edit-input">`;
        cells[2].innerHTML = `<input type="text" value="${cells[2].innerText}" class="edit-input">`;
        cells[3].innerHTML = `<input type="text" value="${cells[3].innerText}" class="edit-input">`;
        cells[4].innerHTML = `<input type="text" value="${cells[4].innerText}" class="edit-input">`;
        cells[5].innerHTML = `<input type="text" value="${cells[5].innerText}" class="edit-input">`;

        // Change buttons
        btn.innerHTML = '<i class="fas fa-save"></i> Save';
        removeBtn.innerHTML = '<i class="fas fa-times"></i> Cancel';
        removeBtn.classList.remove("btn-remove");
        removeBtn.classList.add("btn-cancel");

        // Cancel handler
        removeBtn.onclick = () => {
          cells[1].innerText = row.dataset.originalName;
          cells[2].innerText = row.dataset.originalSurname;
          cells[3].innerText = row.dataset.originalDob;
          cells[4].innerText = row.dataset.originalPhone;
          cells[5].innerText = row.dataset.originalInsurance;

          btn.innerHTML = '<i class="fas fa-edit"></i> Edit';
          removeBtn.innerHTML = '<i class="fas fa-trash"></i> Remove';
          removeBtn.classList.remove("btn-cancel");
          removeBtn.classList.add("btn-remove");
          removeBtn.onclick = () => removePatient(cells[0].innerText);
        };
      } else {
        // Save updates
        const name = cells[1].querySelector("input").value.trim();
        const surname = cells[2].querySelector("input").value.trim();
        const dob = cells[3].querySelector("input").value.trim();
        const phone = cells[4].querySelector("input").value.trim();
        const insurance = cells[5].querySelector("input").value.trim();

        cells[1].innerText = name;
        cells[2].innerText = surname;
        cells[3].innerText = dob;
        cells[4].innerText = phone;
        cells[5].innerText = insurance;

        const id = cells[0].innerText;
        const patient = currentPatients.find(p => p.id === id);
        if (patient) {
          patient.name = name;
          patient.surname = surname;
          patient.dob = dob;
          patient.phone = phone;
          patient.insurance = insurance;
        }

        alert("Patient updated successfully!");

        btn.innerHTML = '<i class="fas fa-edit"></i> Edit';
        removeBtn.innerHTML = '<i class="fas fa-trash"></i> Remove';
        removeBtn.classList.remove("btn-cancel");
        removeBtn.classList.add("btn-remove");
        removeBtn.onclick = () => removePatient(id);
      }
    });
  });
}

// Load all patients on initial render
renderPatientTable(currentPatients);

// Expose search function globally
window.applyPatientSearch = function () {
  const term = document.getElementById('search').value.toLowerCase().trim();
  const filtered = currentPatients.filter(pat =>
    pat.name.toLowerCase().includes(term) || pat.surname.toLowerCase().includes(term)
  );
  renderPatientTable(filtered);
}



}


