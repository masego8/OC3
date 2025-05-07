async function loadContent(file) {
    const container = document.getElementById("page-content");
    if (!container) return;

    try {
        console.log("📦 Loading file:", file);
        const res = await fetch(file);

        if (!res.ok) {
            throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }

        const html = await res.text();
        container.innerHTML = html.trim() || `
        <section class="no-content">
        <h2>⚠️ No content available for this page.</h2>
        <p>The page you tried to open does is still being created.</p>
        </section>
        `

        // Only proceed to change sidebar if content loaded successfully
        const role = localStorage.getItem("userRole");
        let sidebarKey = "";

        if (role === "admin") {
            sidebarKey = "admin_general";

            if (file.includes("doctor")) {
                sidebarKey = "admin_doctor";
            } else if (file.includes("patient")) {
                sidebarKey = "admin_patient";
            }

        } else if (role === "doctor") {
            sidebarKey = "doctor_main";
        } else if (role === "patient") {
            sidebarKey = "patient_main";
        }

        const sidebarContainer = document.getElementById("sidebar-placeholder");
        console.log("🧭 Final sidebarKey:", sidebarKey);

        if (sidebarContainer && sidebars[sidebarKey]) {
            sidebarContainer.innerHTML = sidebars[sidebarKey];
        }

    } catch (err) {
        console.error(`❌ Failed to load content from ${file}`, err);
        container.innerHTML = `
            <section class="error-message">
                <h2>404 - Page not found</h2>
                <p>The page you tried to open does not exist or is still being created.</p>
            </section>
        `;
    }
}


async function loadComponent(id, file) {
    const container = document.getElementById(id);
    if (!container) return;

    try {
        const res = await fetch(file);
        if (!res.ok) throw new Error(`Failed to load ${file}`);
        const html = await res.text();
        container.innerHTML = html;
    } catch (err) {
        console.error(`Error loading component into #${id}:`, err);
    }
}
