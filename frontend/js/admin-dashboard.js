document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const descriptionBox = document.getElementById("card-description");

  // Handle card hover and redirection
  cards.forEach(card => {
    const desc = card.getAttribute("data-desc") || "No description available";
    const targetPage = card.getAttribute("data-page");

    // Show description on hover
    card.addEventListener("mouseenter", () => {
      descriptionBox.textContent = desc;
    });

    // Reset description on mouse leave
    card.addEventListener("mouseleave", () => {
      descriptionBox.textContent = "Hover over a card to see details here.";
    });

    // Redirect on click
    card.addEventListener("click", () => {
      if (targetPage) {
        window.location.href = `./${targetPage}`;
      } else {
        alert("Page not found for this option.");
      }
    });
  });

  // Optional: Logout button functionality
  const logoutBtn = document.querySelector(".logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (confirm("Are you sure you want to logout?")) {
        window.location.href = "../html/login.html"; // or your logout page
      }
    });
  }
});
