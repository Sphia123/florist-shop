

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const links = document.querySelectorAll('.nav-links a');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
  }

  let current = window.location.pathname.split('/').pop();
  if (current === '') {
    current = 'index.html';
  }
  links.forEach(link => {
    const href = link.getAttribute('href');
    const page = href.split('/').pop();
    if (page === current) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});