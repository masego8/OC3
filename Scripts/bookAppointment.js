function setupAppointmentForm() {
  const appointmentForm = document.querySelector('.appointment-form');
  if (!appointmentForm) return;

  appointmentForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const doctorName = document.getElementById('doctor').selectedOptions[0].text;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const reason = document.getElementById('reason').value;

    alert(`Appointment booked with ${doctorName} on ${date} at ${time}.\nReason: ${reason}`);
    console.log('Appointment form submitted successfully!');
    appointmentForm.reset();
  });
}
