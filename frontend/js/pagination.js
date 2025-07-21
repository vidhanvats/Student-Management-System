export function createPaginator({
  data = [],
  pageSize = 5,
  onPageChange = () => {},
  paginationContainerId = "pagination",
}) {
  let currentPage = 1;
  const totalPages = Math.ceil(data.length / pageSize);

  function renderControls() {
    const container = document.getElementById(paginationContainerId);
    container.innerHTML = `
      <button id="prevPage">Previous</button>
      <span id="pageInfo">Page ${currentPage} of ${totalPages}</span>
      <button id="nextPage">Next</button>
    `;

    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage === totalPages;

    document.getElementById("prevPage").addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        update();
      }
    });

    document.getElementById("nextPage").addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        update();
      }
    });
  }

  function update() {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    onPageChange(data.slice(start, end), currentPage, totalPages);
    renderControls();
  }

  // Initial render
  update();

  // Return a method to reset or update data
  return {
    updateData(newData) {
      data = newData;
      currentPage = 1;
      update();
    },
    goToPage(page) {
      if (page >= 1 && page <= totalPages) {
        currentPage = page;
        update();
      }
    },
  };
}
