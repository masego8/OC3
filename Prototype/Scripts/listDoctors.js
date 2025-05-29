const mockDoctors = [
  { id: "D001", name: "Masego", surname: "Mathibako", email: "masego@hospital.com", phone: "07123456789", type: "General" },
  { id: "D002", name: "Lebo", surname: "Mokoena", email: "lebo@hospital.com", phone: "07123456788", type: "Specialist" },
  { id: "D003", name: "Amir", surname: "Patel", email: "amir@hospital.com", phone: "07123456787", type: "General" },
  { id: "D004", name: "Aisha", surname: "Khan", email: "aisha@hospital.com", phone: "07123456786", type: "Specialist" },
  { id: "D005", name: "Thabo", surname: "Nkosi", email: "thabo@hospital.com", phone: "07123456785", type: "General" },
  { id: "D006", name: "Fatima", surname: "Hassan", email: "fatima@hospital.com", phone: "07123456784", type: "Specialist" }
];

let editingDoctorId = null;


let currentDoctors = [...mockDoctors];

function renderTable(doctors) {
  const body = document.getElementById('doctor-table-body');
  if (!body) return;

  body.innerHTML = "";

  if (doctors.length === 0) {
    body.innerHTML = `<tr><td colspan="7" style="text-align:center;">No doctors found</td></tr>`;
    return;
  }

 doctors.forEach(doc => {
  const isEditing = editingDoctorId === doc.id;

  const row = `
    <tr>
      <td>${doc.id}</td>
      <td>${isEditing ? `<input type="text" value="${doc.name}" class="edit-input">` : doc.name}</td>
      <td>${isEditing ? `<input type="text" value="${doc.surname}" class="edit-input">` : doc.surname}</td>
      <td>${doc.email}</td>
      <td>${isEditing ? `<input type="text" value="${doc.phone}" class="edit-input">` : doc.phone}</td>
      <td>
        ${
          isEditing
            ? `<select class="edit-input">
                <option value="General" ${doc.type === "General" ? "selected" : ""}>General</option>
                <option value="Specialist" ${doc.type === "Specialist" ? "selected" : ""}>Specialist</option>
              </select>`
            : doc.type
        }
      </td>
      <td>
        ${
          isEditing
            ? `
              <button class="btn action-btn btn-save" data-id="${doc.id}"><i class="fas fa-save"></i> Save</button>
              <button class="btn action-btn btn-cancel" data-id="${doc.id}"><i class="fas fa-times"></i> Cancel</button>
            `
            : `
              <button class="btn action-btn btn-edit" data-id="${doc.id}"><i class="fas fa-edit"></i> Edit</button>
              <button class="btn action-btn btn-remove" data-id="${doc.id}"><i class="fas fa-trash"></i> Remove</button>
            `
        }
      </td>
    </tr>
  `;
  body.innerHTML += row;
});


  setupEditButtons(); // Attach edit handlers
}


function applySearch() {
  const term = document.getElementById('search').value.toLowerCase().trim();
  const filtered = currentDoctors.filter(doc =>
    doc.name.toLowerCase().includes(term) || doc.surname.toLowerCase().includes(term)
  );
  renderTable(filtered);
}

function loadDoctors(type) {
  currentDoctors = mockDoctors.filter(doc => doc.type.toLowerCase() === type);
  renderTable(currentDoctors);
}

function removeDoctor(id) {
  if (confirm("Are you sure you want to remove this doctor?")) {
    currentDoctors = currentDoctors.filter(doc => doc.id !== id);
    renderTable(currentDoctors);
  }
}

function setupEditButtons() {
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
        row.dataset.originalPhone = cells[4].innerText;
        row.dataset.originalType = cells[5].innerText;

        // Convert to input fields
        cells[1].innerHTML = `<input type="text" value="${cells[1].innerText}" class="edit-input">`;
        cells[2].innerHTML = `<input type="text" value="${cells[2].innerText}" class="edit-input">`;
        cells[4].innerHTML = `<input type="text" value="${cells[4].innerText}" class="edit-input">`;
        cells[5].innerHTML = `
          <select class="edit-input">
            <option value="General" ${cells[5].innerText === "General" ? "selected" : ""}>General</option>
            <option value="Specialist" ${cells[5].innerText === "Specialist" ? "selected" : ""}>Specialist</option>
          </select>
        `;

        // Change buttons
        btn.innerHTML = '<i class="fas fa-save"></i> Save';
        removeBtn.innerHTML = '<i class="fas fa-times"></i> Cancel';
        removeBtn.classList.remove("btn-remove");
        removeBtn.classList.add("btn-cancel");

        // Cancel handler
        removeBtn.onclick = () => {
          cells[1].innerText = row.dataset.originalName;
          cells[2].innerText = row.dataset.originalSurname;
          cells[4].innerText = row.dataset.originalPhone;
          cells[5].innerText = row.dataset.originalType;

          // Reset buttons
          btn.innerHTML = '<i class="fas fa-edit"></i> Edit';
          removeBtn.innerHTML = '<i class="fas fa-trash"></i> Remove';
          removeBtn.classList.remove("btn-cancel");
          removeBtn.classList.add("btn-remove");
          removeBtn.onclick = () => removeDoctor(cells[0].innerText);
        };
      } else {
        // Save updated values
        const name = cells[1].querySelector("input").value.trim();
        const surname = cells[2].querySelector("input").value.trim();
        const phone = cells[4].querySelector("input").value.trim();
        const type = cells[5].querySelector("select").value;

        // Update display
        cells[1].innerText = name;
        cells[2].innerText = surname;
        cells[4].innerText = phone;
        cells[5].innerText = type;

        // Update data
        const id = cells[0].innerText;
        const doctor = currentDoctors.find(d => d.id === id);
        if (doctor) {
          doctor.name = name;
          doctor.surname = surname;
          doctor.phone = phone;
          doctor.type = type;
        }

        alert("Doctor updated successfully!");

        // Reset buttons
        btn.innerHTML = '<i class="fas fa-edit"></i> Edit';
        removeBtn.innerHTML = '<i class="fas fa-trash"></i> Remove';
        removeBtn.classList.remove("btn-cancel");
        removeBtn.classList.add("btn-remove");
        removeBtn.onclick = () => removeDoctor(id);
      }
    });
  });
}





// Load all on initial render
document.addEventListener("DOMContentLoaded", () => {
  renderTable(currentDoctors);
});
