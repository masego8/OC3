document.addEventListener("DOMContentLoaded", function () {
  const timeDropdown = document.getElementById("time");
  const startTime = 9; // 9:00 AM
  const endTime = 17; // 5:00 PM

  for (let hour = startTime; hour <= endTime; hour++) {
    const option = document.createElement("option");
    const formattedTime = hour.toString().padStart(2, "0") + ":00";
    option.value = formattedTime;
    option.textContent = formattedTime;
    timeDropdown.appendChild(option);
  }
});