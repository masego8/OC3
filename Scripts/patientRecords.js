// patientRecords.js

function setupPatientRecords() {
  const patients = [
    {
      id: "FZJXKBND",
      name: "Skyler Chichgar",
      dob: "1985-04-12",
      phone: "107 609 4159",
      insurance: "49125477",
      records: [
        { date: "2025-05-14", diagnosis: "Seasonal allergies", notes: "Prescribed antihistamines." },
        { date: "2025-04-02", diagnosis: "Migraine", notes: "Advised to track triggers, prescribed ibuprofen." }
      ]
    },
    {
      id: "ABC12345",
      name: "John Doe",
      dob: "1990-07-08",
      phone: "555 123 4567",
      insurance: "82345612",
      records: [
        { date: "2025-06-01", diagnosis: "Back pain", notes: "Recommended physiotherapy." }
      ]
    }
  ];

  const select = document.getElementById('patient-select');
  const info = document.getElementById('patient-info');
  const recordList = document.getElementById('record-list');
  const form = document.getElementById('add-record-form');

  function populatePatientSelect() {
    select.innerHTML = '<option value="">-- Select --</option>';
    patients.forEach(p => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = `${p.name} (${p.id})`;
      select.appendChild(opt);
    });
  }

  function displayPatientData(patient) {
    info.innerHTML = `
      <p><strong>Name:</strong> ${patient.name}</p>
      <p><strong>Patient ID:</strong> ${patient.id}</p>
      <p><strong>DOB:</strong> ${patient.dob}</p>
      <p><strong>Phone:</strong> ${patient.phone}</p>
      <p><strong>Insurance ID:</strong> ${patient.insurance}</p>
    `;

    recordList.innerHTML = '';
    patient.records.forEach(rec => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>Date:</strong> ${rec.date}<br><strong>Diagnosis:</strong> ${rec.diagnosis}<br><strong>Notes:</strong> ${rec.notes}`;
      recordList.appendChild(li);
    });
  }

  select.addEventListener('change', () => {
    const selected = patients.find(p => p.id === select.value);
    if (selected) {
      displayPatientData(selected);
    } else {
      info.innerHTML = '';
      recordList.innerHTML = '';
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const selected = patients.find(p => p.id === select.value);
    if (!selected) {
      alert("Please select a patient first.");
      return;
    }

    const newRecord = {
      date: document.getElementById('record-date').value,
      diagnosis: document.getElementById('diagnosis').value,
      notes: document.getElementById('notes').value
    };

    selected.records.push(newRecord);
    displayPatientData(selected);
    form.reset();
  });

  populatePatientSelect();
}
