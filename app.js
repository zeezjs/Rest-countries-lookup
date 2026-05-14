// Shared variables and functions
const displayBtn = document.querySelectorAll(".theme-toggler");
const htmlele = document.querySelector(".html");

// Theme toggling event
displayBtn.forEach(btn => {
  btn.addEventListener('click', e => {
    if(htmlele.getAttribute('data-bs-theme') === 'dark'){
      htmlele.setAttribute('data-bs-theme', 'light');
      btn.innerHTML = `<i class="bi bi-brightness-high-fill"></i> Light Mode`;
    } else {
      htmlele.setAttribute('data-bs-theme', 'dark');
      btn.innerHTML = `<i class="bi bi-moon-fill"></i> Dark Mode`;
    }
  });
});