function setupDrugTable() {
  const drugs = [
    { name: "Paracetamol", use: "Pain relief / Fever reducer", avoid: "Alcohol (excessive), other acetaminophen" },
    { name: "Ibuprofen", use: "Anti-inflammatory / Pain", avoid: "Aspirin, blood thinners (e.g., warfarin)" },
    { name: "Amoxicillin", use: "Antibiotic", avoid: "Methotrexate, allopurinol" },
    { name: "Metformin", use: "Type 2 diabetes", avoid: "Alcohol (excess), contrast dyes" },
    { name: "Atorvastatin", use: "Lowers cholesterol", avoid: "Grapefruit, certain antibiotics" },
    { name: "Omeprazole", use: "Acid reflux / Ulcers", avoid: "Clopidogrel, antifungal meds" },
    { name: "Sertraline", use: "Antidepressant (SSRI)", avoid: "MAO inhibitors, St. John's Wort" },
    { name: "Prednisone", use: "Anti-inflammatory steroid", avoid: "NSAIDs, vaccines (live)" },
    { name: "Warfarin", use: "Blood thinner", avoid: "NSAIDs, antibiotics, leafy greens" },
    { name: "Lisinopril", use: "Blood pressure", avoid: "Potassium supplements, NSAIDs" },
    { name: "Simvastatin", use: "Cholesterol", avoid: "Grapefruit, antifungals" },
    { name: "Amlodipine", use: "Blood pressure", avoid: "Simvastatin (high dose)" },
    { name: "Clopidogrel", use: "Prevents blood clots", avoid: "Omeprazole, NSAIDs" },
    { name: "Insulin", use: "Diabetes", avoid: "Beta-blockers, alcohol" },
    { name: "Diazepam", use: "Anxiety / Muscle relaxer", avoid: "Alcohol, opioids" },
    { name: "Codeine", use: "Pain relief", avoid: "Alcohol, sedatives" },
    { name: "Furosemide", use: "Diuretic", avoid: "Lithium, NSAIDs" },
    { name: "Digoxin", use: "Heart failure", avoid: "Diuretics, antacids" },
    { name: "Levothyroxine", use: "Thyroid", avoid: "Calcium, iron supplements" },
    { name: "Hydrochlorothiazide", use: "Blood pressure", avoid: "Lithium, corticosteroids" },
    // Add more as needed...
  ];

  const itemsPerPage = 10;
  let currentPage = 1;
  let filteredDrugs = [...drugs];

  const tbody = document.getElementById("drug-tbody");
  const pagination = document.getElementById("pagination");
  const searchInput = document.getElementById("search-input");

  function renderTable() {
    tbody.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = filteredDrugs.slice(start, end);

    pageItems.forEach(drug => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${drug.name}</td>
        <td>${drug.use}</td>
        <td>${drug.avoid}</td>
      `;
      tbody.appendChild(row);
    });
  }

  function renderPagination() {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(filteredDrugs.length / itemsPerPage);

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

  searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    filteredDrugs = drugs.filter(drug => drug.name.toLowerCase().includes(term));
    currentPage = 1;
    renderTable();
    renderPagination();
  });

  // Initial render
  renderTable();
  renderPagination();
}
