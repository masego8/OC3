function setupPrescriptions() {
  // ALL prescriptions by Dr. Smith
  const prescriptions = [
    { patient: "Skyler Chichgar", drug: "Ibuprofen", dosage: "400mg", frequency: "Twice a day", doctor: "Dr. Smith", date: "2025-05-20" },
    { patient: "Skyler Chichgar", drug: "Paracetamol", dosage: "500mg", frequency: "As needed", doctor: "Dr. Smith", date: "2025-05-18" },
    { patient: "John Doe", drug: "Amoxicillin", dosage: "500mg", frequency: "Three times a day", doctor: "Dr. Smith", date: "2025-05-15" },
    { patient: "John Doe", drug: "Codeine", dosage: "30mg", frequency: "Every 6 hours", doctor: "Dr. Smith", date: "2025-05-10" },
    { patient: "Jane Roe", drug: "Sertraline", dosage: "50mg", frequency: "Once daily", doctor: "Dr. Smith", date: "2025-05-21" },
    { patient: "Jane Roe", drug: "Metformin", dosage: "850mg", frequency: "Twice daily", doctor: "Dr. Smith", date: "2025-05-19" }
  ];

  let filteredData = [];
  const tbody = document.getElementById("prescription-body");
  const pagination = document.getElementById("prescription-pagination");
  const searchInput = document.getElementById("prescription-search");
  const itemsPerPage = 5;
  let currentPage = 1;

  function renderTable() {
    tbody.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const pageItems = filteredData.slice(start, start + itemsPerPage);

    pageItems.forEach(p => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.patient}</td>
        <td>${p.drug}</td>
        <td>${p.dosage}</td>
        <td>${p.frequency}</td>
        <td>${p.doctor}</td>
        <td>${p.date}</td>
      `;
      tbody.appendChild(row);
    });

    // Show/hide table section
    document.querySelector(".table-container").style.display = pageItems.length > 0 ? "block" : "none";
    pagination.style.display = pageItems.length > 0 ? "block" : "none";
  }

  function renderPagination() {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      if (i === currentPage) btn.style.backgroundColor = "#0056b3";
      btn.addEventListener("click", () => {
        currentPage = i;
        renderTable();
        renderPagination();
      });
      pagination.appendChild(btn);
    }
  }

  function applySearch(term) {
  term = term.toLowerCase().trim();

  if (term === "") {
    filteredData = [];
    renderTable();
    renderPagination();
    return;
  }

  filteredData = prescriptions.filter(p =>
    p.patient.toLowerCase().includes(term) || p.drug.toLowerCase().includes(term)
  );

  currentPage = 1;
  renderTable();
  renderPagination();
}


  searchInput.addEventListener("input", () => {
    applySearch(searchInput.value);
  });

  // Add new prescription
  document.getElementById("new-prescription-form").addEventListener("submit", e => {
    e.preventDefault();

    const newEntry = {
      patient: document.getElementById("new-patient-name").value,
      drug: document.getElementById("new-drug").value,
      dosage: document.getElementById("new-dosage").value,
      frequency: document.getElementById("new-frequency").value,
      doctor: "Dr. Smith", // Always Dr. Smith
      date: document.getElementById("new-date").value
    };

    prescriptions.unshift(newEntry);
    applySearch(searchInput.value);
    e.target.reset();
    alert("Prescription added successfully!");
  });

  // Hide table on load
  document.querySelector(".table-container").style.display = "none";
  pagination.style.display = "none";
}
