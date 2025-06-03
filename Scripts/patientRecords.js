function setupPatientRecords() {
  const form = document.getElementById("add-record-form");
  const recordList = document.getElementById("record-list");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const date = document.getElementById("record-date").value;
    const diagnosis = document.getElementById("diagnosis").value;
    const notes = document.getElementById("notes").value;

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>Date:</strong> ${date}<br>
      <strong>Diagnosis:</strong> ${diagnosis}<br>
      <strong>Notes:</strong> ${notes}
    `;

    recordList.prepend(li);
    form.reset();
    alert("New record added!");
  });
}
