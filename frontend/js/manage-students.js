// Modal control
function openModal() {
    document.getElementById("addStudentModal").style.display = "block";
}

function closeModal() {
    document.getElementById("addStudentModal").style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("addStudentModal");
    if (event.target === modal) {
        closeModal();
    }
};

// Form submission ( Handle Add Student form submission)
function openModal() {
  document.getElementById("addStudentModal").style.display = "block";
}

function closeModal() {
  document.getElementById("addStudentModal").style.display = "none";
}
document.getElementById("addStudentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const student = {
    name: document.getElementById("studentName").value,
    email: document.getElementById("studentEmail").value,
    course: document.getElementById("studentCourse").value,
    phone: document.getElementById("studentPhone").value,
  };

  fetch("http://localhost:8080/api/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  })
    .then((response) => {
      if (!response.ok) throw new Error("Failed to add student");
      return response.json();
    })
    .then((data) => {
      alert("Student added successfully!");
      closeModal();
      document.getElementById("addStudentForm").reset();
      fetchStudents(); // ✅ Refresh
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error adding student. Please try again.");
    });
});

// Search function
function searchStudents() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    const rows = document.querySelectorAll("#studentTableBody tr");

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(keyword) ? "" : "none";
    });
}

// Load all students
function fetchStudents() {
  fetch("http://localhost:8080/api/students")
    .then(res => res.json())
    .then(data => {
      displayStudents(data);
    })
    .catch(error => console.error("Error fetching students:", error));
}


// Delete student
function deleteStudent(id) {
    if (confirm("Are you sure you want to delete this student?")) {
        fetch(`http://localhost:8080/api/students/${id}`, { method: "DELETE" })
            .then(res => {
                if (res.ok) {
                    alert("Student deleted successfully.");
                    fetchStudents();
                } else {
                    alert("Failed to delete student.");
                }
            });
    }
}
// Add this function if it's not present
function fetchStudents() {
  fetch("http://localhost:8080/api/students")
    .then(res => res.json())
    .then(data => {
      displayStudents(data);
    })
    .catch(error => console.error("Error fetching students:", error));
}

// Call this after adding a student
function addStudent() {
    const name = document.getElementById("studentName").value;
    const email = document.getElementById("studentEmail").value;
    const course = document.getElementById("studentCourse").value;
    const phone = document.getElementById("studentPhone").value;

    const student = { name, email, course, phone };

    fetch("http://localhost:8080/api/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Failed to add student");
        }
        return response.json();
    })
    .then((data) => {
        console.log("Student added:", data);
        closeModal();                // Close the modal
        clearForm();                 // Clear form fields
        fetchStudents();             // Refresh the list
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

function clearForm() {
    document.getElementById("studentName").value = "";
    document.getElementById("studentEmail").value = "";
    document.getElementById("studentCourse").value = "";
    document.getElementById("studentPhone").value = "";
}


//saved
document.getElementById("searchButton").addEventListener("click", () => {
  const keyword = document.getElementById("searchInput").value.trim();

  if (keyword === "") {
    fetchStudents(); // Show all students if search is cleared
    return;
  }

  fetch(`http://localhost:8080/api/students/search?keyword=${encodeURIComponent(keyword)}`)
    .then(res => res.json())
    .then(data => displayStudents(data))
    .catch(error => console.error("Search failed:", error));
});
//js for edit modal
function openEditModal(student) {
  document.getElementById("editStudentId").value = student.id;
  document.getElementById("editStudentName").value = student.name;
  document.getElementById("editStudentEmail").value = student.email;
  document.getElementById("editStudentCourse").value = student.course;
  document.getElementById("editStudentPhone").value = student.phone;

  document.getElementById("editStudentModal").style.display = "block";
}

function closeEditModal() {
  document.getElementById("editStudentModal").style.display = "none";
}

document.getElementById("editStudentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("editStudentId").value;

  const updatedStudent = {
    name: document.getElementById("editStudentName").value,
    email: document.getElementById("editStudentEmail").value,
    course: document.getElementById("editStudentCourse").value,
    phone: document.getElementById("editStudentPhone").value
  };

  fetch(`http://localhost:8080/api/students/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedStudent)
  })
    .then(res => res.json())
    .then(data => {
      closeEditModal();
      fetchStudents();  // refresh list
      alert("Student updated successfully!");
    })
    .catch(err => {
      console.error("Update failed:", err);
      alert("Failed to update student.");
    });
});

//display students
function displayStudents(students) {
  const tbody = document.getElementById("studentTableBody");
  tbody.innerHTML = "";

  students.forEach(student => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.course}</td>
      <td>${student.phone}</td>
      <td>
        <button onclick='openEditModal(${JSON.stringify(student)})'>Edit</button>
        <button onclick='deleteStudent(${student.id})'>Delete</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}
// render student function
function renderStudents(data) {
  const table = document.getElementById("studentList");
  table.innerHTML = "";
  data.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.email}</td>
      <td>${student.course}</td>
      <td>${student.phone}</td>
      <td>
        <button class="edit-btn" data-id="${student.id}">Edit</button>
        <button onclick="deleteStudent(${student.id})">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}


// Initial load
document.addEventListener("DOMContentLoaded", () => {
    fetchStudents();
});
