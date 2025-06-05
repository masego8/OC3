    // Sidebar variations based on role + page context
    const sidebars = {
        admin_general: `
            <aside class="sidebar">
                <ul class="nav">
                    <li><a href="#" class="btn nav-btn" onclick="loadContent('../Templates/Admin/doctors.html')"><i class="fas fa-user-md"></i>Doctors</a></li>
                    <li><a href="#" class="btn nav-btn" onclick="loadContent('../Templates/Admin/patients.html')"><i class="fas fa-user-injured"></i>Patients</a></li>
                    <li><a href="#" class="btn nav-btn" onclick="loadContent('../Templates/Admin/visits.html')"><i class="fas fa-chart-line"></i>Visits</a></li>
                    <li><a href="#" class="btn nav-btn" onclick="loadContent('../Templates/Doctors/prescriptions.html')"><i class="fas fa-chart-line"></i>Prescriptions</a></li>
                    <li><a href="#" onclick="logout()" class="btn nav-btn logout-btn">Logout</a></li>
                </ul>
            </aside>
        `,
        admin_doctor: `
            <aside class="sidebar">
                <ul class="nav">
                    <li><a href="#" class="btn nav-btn" onclick="loadContent('/Templates/Admin/dashboard.html')"><i class="fas fa-arrow-left"></i></a></li>
                    <li><a href="#" class="btn nav-btn" onclick="loadContent('/Templates/Admin/doctorList.html')"><i class="fas fa-list"></i> Doctor List</a></li>
                    <li><a href="#" class="btn nav-btn" onclick="loadContent('/Templates/Admin/doctorAdd.html')"><i class="fas fa-user-plus"></i> Add Doctor</a></li>
                    <li><a href="#" onclick="logout()" class="btn nav-btn logout-btn">Logout</a></li>
                </ul>
            </aside>
        `,
        admin_patient: `
            <aside class="sidebar">
                <ul class="nav">
                    <li><a href="#" class="btn nav-btn" onclick="loadContent('/Templates/Admin/dashboard.html')"><i class="fas fa-arrow-left"></i></a></li>
                    <li><a href="#" class="btn nav-btn" onclick="loadContent('/Templates/Admin/patientList.html')"><i class="fas fa-list"></i> Patient List</a></li>
                    <li><a href="#" class="btn nav-btn" onclick="loadContent('/Templates/Admin/patientAdd.html')"><i class="fas fa-user-plus"></i> Add Patient</a></li>
                    <li><a href="#" onclick="logout()" class="btn nav-btn logout-btn">Logout</a></li>
                </ul>
            </aside>
        `,
        doctor_main: `
            <aside class="sidebar">
                <ul class="nav">
                    <li><a href="#" class="btn nav-btn" onclick="loadContent('/Templates/Doctors/schedule.html')"><i class="fas fa-clock"></i> Schedule</a></li>
                    <li><a href="#" class="btn nav-btn" onclick="loadContent('/Templates/Doctors/patientRecords.html')"><i class="fas fa-folder-open"></i> Patient Records</a></li>
                    <li><a href="#" class="btn nav-btn" onclick="loadContent('/Templates/Doctors/prescriptions.html')"><i class="fas fa-prescription-bottle-alt"></i> Prescriptions</a></li>
                    <li><a href="#" class="btn nav-btn" onclick="loadContent('/Templates/Doctors/viewDrugs.html')"><i class="fas fa-pills"></i> Drugs</a></li>
                    <li><a href="#" onclick="logout()" class="btn nav-btn logout-btn">Logout</a></li>
                </ul>
            </aside>
        `,
        patient_main: `
            <aside class="sidebar">
                <ul class="nav">
                    <li><a href="#" class="btn nav-btn" onclick="loadContent('/Templates/Patients/bookAppointment.html')"><i class="fas fa-calendar-check"></i> Book Appointment</a></li>
                    <li><a href="#" class="btn nav-btn" onclick="loadContent('/Templates/Patients/personalDetails.html')"><i class="fas fa-id-card"></i> Personal Details</a></li>
                    <li><a href="#" class="btn nav-btn" onclick="loadContent('/Templates/Patients/visits.html')"><i class="fas fa-notes-medical"></i> Visits</a></li>
                    <li><a href="#" class="btn nav-btn" onclick="loadContent('/Templates/Patients/prescriptions.html')"><i class="fas fa-prescription-bottle-alt"></i> Prescriptions</a></li>
                    <li><a href="#" onclick="logout()" class="btn nav-btn logout-btn">Logout</a></li>
                </ul>
            </aside>
        `
    };
    

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf("/") + 1).toLowerCase();

    // Skip if on login page
    if (page === "login.html") return;

    // Redirect if not logged in
    if (localStorage.getItem("loggedIn") !== "true") {
        window.location.href = "login.html";
        return;
    }

    const role = localStorage.getItem("userRole");
    const sidebarContainer = document.getElementById("sidebar-placeholder");

    if (!sidebarContainer) {
        console.warn("Sidebar placeholder not found.");
        return;
    }



    // Determine which sidebar to use
    let key = "";
    if (role === "admin") {
        if (page.includes("doctor")) key = "admin_doctor";
        else if (page.includes("patient")) key = "admin_patient";
        else key = "admin_general";
    } else if (role === "doctor") {
        key = "doctor_main";
    } else if (role === "patient") {
        key = "patient_main";
    }

    // Render sidebar
    sidebarContainer.innerHTML = sidebars[key] || "";
});

// Logout function
function logout() {
    localStorage.clear();
    window.location.href = "../login.html";
}
