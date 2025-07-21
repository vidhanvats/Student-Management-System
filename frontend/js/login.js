document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !password) {
        document.getElementById("loginErr").innerText = "Please enter both username and password.";
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const data = await response.json();

            console.log("Login successful, role:", data.role);

            document.getElementById("loginMsg").innerText = data.message;
            document.getElementById("loginErr").innerText = "";

            // Redirect to dashboard based on user role
            if (data.role.toLowerCase() === "admin") {
                window.location.href = "admin-dashboard.html";
            } else if (data.role.toLowerCase() === "student") {
                window.location.href = "student-dashboard.html";
            } else if (data.role.toLowerCase() === "teacher") {
                window.location.href = "teacher-dashboard.html";
            } else {
                // Handle unexpected roles
                document.getElementById("loginErr").innerText = "Unknown user role.";
            }

        } else {
            const errorText = await response.text();
            document.getElementById("loginErr").innerText = errorText;
            document.getElementById("loginMsg").innerText = "";
        }
    } catch (error) {
        console.error("Login error:", error);
        document.getElementById("loginErr").innerText = "Server error. Please try again later.";
        document.getElementById("loginMsg").innerText = "";
    }
});
