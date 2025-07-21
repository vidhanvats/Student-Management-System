document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const role = document.getElementById("role").value;

    if (!username || !password || !role) {
        document.getElementById("registerErr").innerText = "All fields are required.";
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password, role })
        });

        if (response.ok) {
            document.getElementById("registerMsg").innerText = "Registered successfully! Redirecting to login...";
            document.getElementById("registerForm").reset();
            document.getElementById("registerErr").innerText = "";

            // ⏳ Wait for 1.5 seconds before redirecting to login page
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        } else {
            const errorText = await response.text();
            document.getElementById("registerErr").innerText = errorText;
        }
    } catch (err) {
        console.error("Error:", err);
        document.getElementById("registerErr").innerText = "Server error.";
    }
});
