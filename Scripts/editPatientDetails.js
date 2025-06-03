function setupEditPatientDetails() {
  const editBtn = document.getElementById('edit-btn');
  const row = document.getElementById('patient-row');
  if (!editBtn || !row) return;

  editBtn.addEventListener('click', () => {
    const cells = row.querySelectorAll('td');

    if (editBtn.innerText.trim() === 'Edit') {
      // Turn editable cells into inputs (Name, Surname, Address, Email, Phone)
      for (let i = 1; i <= 5; i++) {
        const currentValue = cells[i].innerText;
        cells[i].innerHTML = `<input type="text" value="${currentValue}" class="edit-input">`;
      }

      // Change button to Save
      editBtn.innerHTML = '<i class="fas fa-save"></i> Save';
    } else {
      // Save updated values and revert to plain text
      for (let i = 1; i <= 5; i++) {
        const newValue = cells[i].querySelector('input').value.trim();
        cells[i].innerText = newValue;
      }

      console.log('✅ Patient details updated:', {
        name: cells[1].innerText,
        surname: cells[2].innerText,
        address: cells[3].innerText,
        email: cells[4].innerText,
        phone: cells[5].innerText,
      });

      alert('Patient details updated successfully!');
      editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit';

      // Optionally: send updated data to your backend here
    }
  });
}
