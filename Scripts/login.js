function login(event) {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = [
        { username: "admin", password: "admin123", role: "admin" },
        { username: "drsmith", password: "docpass", role: "doctor" },
        { username: "patient01", password: "pat123", role: "patient" }
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
