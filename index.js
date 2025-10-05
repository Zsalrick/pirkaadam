const scrollBtn = document.getElementById("scrollTopBtn");

window.onscroll = function() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
  
  revealCards();
  setActiveNavLink();
};

scrollBtn.addEventListener("click", function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const cards = document.querySelectorAll('.card');

function revealCards() {
  const windowHeight = window.innerHeight;
  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    if (cardTop < windowHeight - 50) {
      card.classList.add('show');
    }
  });
}

window.addEventListener('load', revealCards);

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  question.addEventListener('click', () => {
    item.classList.toggle('active');
    answer.classList.toggle('open');
  });
});

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.main-nav ul');
const navLinks = document.querySelectorAll('.main-nav a');
const mainNav = document.querySelector('.main-nav');
const header = document.querySelector('header');
let headerEnd = 0; // Később kerül beállításra a DOMContentLoaded-ben

document.addEventListener('DOMContentLoaded', (event) => {
  // E-mail cím cserélve Kiss Ádám EV-ről Pirka Ádámra (korábban feltételezett linkhez)
  const email = 'pirkaadam@gmail.com'; 
  const emailLink = document.querySelector('a[data-email]');

  if (emailLink) {
    emailLink.setAttribute('href', 'mailto:' + email);
    emailLink.querySelector('strong').textContent = email;
  }
  
  // Header magasságának beállítása:
  const headerElement = document.querySelector('header');
  if (headerElement) {
      // 50px-el korábban induljon a scrolled hatás a fejlécről
      headerEnd = headerElement.offsetHeight - 50; 
  }
});

// A menünyitás/becsukás logikája
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navMenu.classList.toggle('open');
    
    // Menünyitáskor MINDIG add hozzá a 'scrolled'-et, hogy a logó látszódjon (CSS-ben definiált)
    if (navMenu.classList.contains('open')) {
      mainNav.classList.add('scrolled');
    } else {
      // Menü becsukásakor csak akkor távolítjuk el, ha NEM görgettünk még el a fejlécen
      if (window.scrollY < headerEnd) {
        mainNav.classList.remove('scrolled');
      }
    }
  });
}

// Menüpontra kattintva bezárja a menüt
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      navToggle.classList.remove('open');
      navMenu.classList.remove('open');
      
      if (window.scrollY < headerEnd) {
        mainNav.classList.remove('scrolled');
      }
    }
  });
});

const sections = document.querySelectorAll('section, .comparison-section, .faq-container');

function setActiveNavLink() {
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= (sectionTop - 200)) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === currentSection) {
      link.classList.add('active');
    }
  });
}

// A görgetéskor történő .scrolled osztály kezelése (ami a logó láthatóságáért felel)
window.addEventListener('scroll', () => {
  // Mobilon: max-width: 900px alatt
  if (window.matchMedia('(max-width: 900px)').matches) {
    if (window.scrollY >= headerEnd) {
      // Ha túlmentünk a fejlécen, látszódjon a logó
      mainNav.classList.add('scrolled');
    } else {
      // Ha a fejléc felett vagyunk, és a menü be van csukva, rejtse el a logót
      if (!navMenu.classList.contains('open')) {
        mainNav.classList.remove('scrolled');
      }
    }
  } else {
    // Asztali nézet
    if (window.scrollY >= headerEnd) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  }

  setActiveNavLink();
});

setActiveNavLink();