const loader = document.getElementById('loader');
window.addEventListener('load', () => setTimeout(() => loader.classList.add('hide'), 450));

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const petalsWrap = document.querySelector('.petals');
for (let i = 0; i < 26; i++) {
  const petal = document.createElement('span');
  petal.className = 'petal';
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.top = -Math.random() * 100 + 'px';
  petal.style.setProperty('--drift', (Math.random() * 160 - 80) + 'px');
  petal.style.animationDuration = (9 + Math.random() * 10) + 's';
  petal.style.animationDelay = (-Math.random() * 12) + 's';
  petalsWrap.appendChild(petal);
}
const sparklesWrap = document.querySelector('.sparkles');
for (let i = 0; i < 42; i++) {
  const spark = document.createElement('span');
  spark.className = 'spark';
  spark.style.left = Math.random() * 100 + '%';
  spark.style.top = Math.random() * 100 + '%';
  spark.style.animationDuration = (2 + Math.random() * 4) + 's';
  spark.style.animationDelay = (-Math.random() * 4) + 's';
  sparklesWrap.appendChild(spark);
}

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 12;
  const y = (e.clientY / window.innerHeight - 0.5) * 12;
  document.querySelector('.hero-content').style.transform = `translate(${x}px, ${y}px)`;
});

const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      item.classList.toggle('is-hidden', filter !== 'all' && item.dataset.category !== filter);
    });
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.parentElement.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});
function closeLightbox(){
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  setTimeout(() => { lightboxImg.src = ''; }, 200);
}
lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if(e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeLightbox(); });

const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const message = document.getElementById('message').value.trim();
  const text = `Hello Wedding Shedding,%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0ADetails: ${encodeURIComponent(message)}`;
  window.open(`https://wa.me/917503550936?text=${text}`, '_blank', 'noopener');
});
