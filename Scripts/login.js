function login(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = [
        { username: "julie@admin.com", password: "Password123", role: "admin" },
        { username: "jsmith@outlook.com", password: "Password123", role: "doctor" },
        { username: "schichgar", password: "Password123", role: "patient" }
    ];

    const foundUser = users.find(
        user => user.username === username && user.password === password
    );

    if (foundUser) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("userRole", foundUser.role);
        localStorage.setItem("username", foundUser.username);
        window.location.href = "../index.html";
    } else {
        alert("Invalid username or password.");
    }
}
