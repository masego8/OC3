function generateMockSchedule(startDateStr, endDateStr) {
  const eventTypes = ["appointment", "training", "meeting"];
  const timeSlots = [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "11:30", "12:00", "13:00", "13:30", "14:00",
    "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
  ];

  const schedule = {};
  let currentDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  while (currentDate <= endDate) {
    const iso = currentDate.toISOString().split("T")[0];

    // Only schedule events on weekdays (Mon–Fri)
    const day = currentDate.getDay(); // 0 = Sun, 6 = Sat
    if (day >= 1 && day <= 5) {
      const numEvents = Math.floor(Math.random() * 4); // 0–3 events
      const events = [];

      const usedSlots = new Set();

      for (let i = 0; i < numEvents; i++) {
        let time;
        do {
          time = timeSlots[Math.floor(Math.random() * timeSlots.length)];
        } while (usedSlots.has(time));
        usedSlots.add(time);

        const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
        events.push({ type, time });
      }

      if (events.length > 0) {
        schedule[iso] = events;
      }
    }

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedule;
}

// Generate 6 weeks of mock data
const mockEvents = generateMockSchedule("2025-01-26", "2025-12-07");


function setupDoctorSchedule() {
  const scheduleGrid = document.getElementById('schedule-grid');
  const weekRangeLabel = document.getElementById('week-range');
  const prevBtn = document.getElementById('prev-week');
  const nextBtn = document.getElementById('next-week');

  let currentDate = new Date(); // Today





  const iconMap = {
  appointment: "fas fa-user-md",
  training: "fas fa-chalkboard-teacher",
  meeting: "fas fa-handshake"
  };


  function getStartOfWeek(date) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday as start
    return new Date(d.setDate(diff));
  }

  function formatDate(date) {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short'
    });
  }

  function toISODate(date) {
    return date.toISOString().split("T")[0];
  }

  function renderSchedule(weekStart) {
    scheduleGrid.innerHTML = '';
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    weekRangeLabel.textContent = `${formatDate(weekStart)} - ${formatDate(weekEnd)}`;

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(weekStart);
      dayDate.setDate(dayDate.getDate() + i);

      const iso = toISODate(dayDate);
      const events = mockEvents[iso] || [];

      let eventHTML = "";

    if (events.length) {
        eventHTML = events.map(event => {
            return `
            <div class="event-item">
                <i class="${iconMap[event.type]}" title="${event.type}"></i>
                <span class="event-time">${event.time}</span>
            </div>
            `;
        }).join("");
        } else {
        eventHTML = "<span style='font-size: 0.8rem; color: #888;'>No events</span>";
    }


      const dayCard = document.createElement('div');
      dayCard.classList.add('day-card');

      dayCard.innerHTML = `
        <h3>${dayNames[i]}</h3>
        <small>${formatDate(dayDate)}</small>
        <div class="events">${eventHTML}</div>
        `;


      scheduleGrid.appendChild(dayCard);
    }
  }

  function shiftWeek(direction) {
    currentDate.setDate(currentDate.getDate() + direction * 7);
    renderSchedule(getStartOfWeek(currentDate));
  }

  prevBtn.addEventListener('click', () => shiftWeek(-1));
  nextBtn.addEventListener('click', () => shiftWeek(1));

  renderSchedule(getStartOfWeek(currentDate));
}
