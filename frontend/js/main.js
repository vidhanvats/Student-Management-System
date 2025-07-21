const apiUrl = "http://localhost:8080/api/students";

document.addEventListener("DOMContentLoaded", () => {
  loadStudents();

  document.getElementById("studentForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value.trim();

    if (!name || !email || !course) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, course }),
      });

      if (!response.ok) {
        throw new Error("Failed to add student.");
      }

      document.getElementById("studentForm").reset();
      await loadStudents();
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add student.");
    }
  });
});

async function loadStudents() {
  try {
    const res = await fetch(apiUrl);
    const students = await res.json();

    const tbody = document.querySelector("#studentTable tbody");
    tbody.innerHTML = "";

    students.forEach((student) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.course}</td>
        <td>
          <button onclick="deleteStudent(${student.id})">Delete</button>
        </td>
      `;

      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error("Error loading students:", error);
  }
}

async function deleteStudent(id) {
  if (!confirm("Are you sure you want to delete this student?")) return;

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete student.");
    }

    await loadStudents();
  } catch (error) {
    console.error("Error deleting student:", error);
    alert("Failed to delete student.");
  }
}
