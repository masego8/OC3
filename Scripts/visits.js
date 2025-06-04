// visits.js

function setupVisitsPage() {
  const patients = [
    {
      id: "123456",
      dob: "2025-06-04",
      appointments: [
        { date: "2025-06-10", time: "10:00", purpose: "General Check-up" },
        { date: "2025-07-05", time: "14:30", purpose: "Follow-up Visit" }
      ]
    },
    {
      id: "ABC12345",
      dob: "1990-07-08",
      appointments: [
        { date: "2025-06-15", time: "09:00", purpose: "Consultation" }
      ]
    }
  ];

  const form = document.getElementById('search-form');
  const appointmentsList = document.getElementById('appointments-list');

  function findPatient(id, dob) {
    return patients.find(p => p.id === id && p.dob === dob);
  }

  function displayAppointments(patient) {
    appointmentsList.innerHTML = "";

    if (!patient || patient.appointments.length === 0) {
      appointmentsList.innerHTML = "<p>No appointments found for this patient.</p>";
      return;
    }

    patient.appointments.forEach((appointment, index) => {
      const appointmentDiv = document.createElement('div');
      appointmentDiv.className = 'appointment-item';

      appointmentDiv.innerHTML = `
        <p><strong>Purpose:</strong> ${appointment.purpose}</p>
        <label for="date-${index}">Date:</label>
        <input type="date" id="date-${index}" value="${appointment.date}">
        <label for="time-${index}">Time:</label>
        <input type="time" id="time-${index}" value="${appointment.time}">
        <button class="btn save-btn" data-index="${index}">Save Changes</button>
        <hr>
      `;

      appointmentsList.appendChild(appointmentDiv);
    });

    // Add event listeners to Save buttons
    const saveButtons = document.querySelectorAll('.save-btn');
    saveButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const idx = e.target.dataset.index;
        const newDate = document.getElementById(`date-${idx}`).value;
        const newTime = document.getElementById(`time-${idx}`).value;

        // Update the appointment in the mock data
        patient.appointments[idx].date = newDate;
        patient.appointments[idx].time = newTime;

        alert("Appointment updated successfully!");
      });
    });
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('patient-id').value.trim();
    const dob = document.getElementById('dob').value;

    const patient = findPatient(id, dob);
    displayAppointments(patient);
  });
}
