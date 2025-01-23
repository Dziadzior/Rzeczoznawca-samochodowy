// Zmiana wyglądu nagłówka przy przewijaniu
const header = document.querySelector(".header");

window.addEventListener("scroll", function () {
  if (header) {
    if (window.scrollY > 50) {
      header.classList.add("scroll");
    } else {
      header.classList.remove("scroll");
    }
  }
});

// Obsługa menu hamburgerowego (poza eventem scroll, by uniknąć ponownej deklaracji)
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", function () {
    nav.classList.toggle("active");
    this.classList.toggle("open");
  });
}

// Dodanie animacji do przycisków
const buttons = document.querySelectorAll(".btn");

if (buttons.length > 0) {
  buttons.forEach((btn) => {
    btn.addEventListener("mouseover", () => {
      btn.style.transform = "scale(1.05)";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1)";
    });
  });
}

// Dynamiczny tekst w sekcji hero
const dynamicText = document.querySelector(".dynamic-text");
const words = ["Ekspertyzy", "Wyceny", "Doradztwo"];
let index = 0;

if (dynamicText) {
  function changeText() {
    dynamicText.textContent = words[index];
    index = (index + 1) % words.length;
  }
  setInterval(changeText, 4000);
}

// Animacja liczników
const counters = document.querySelectorAll(".counter");
let countersStarted = false;

function animateCounters() {
  counters.forEach((counter) => {
    let target = parseInt(counter.getAttribute("data-count"));
    let start = 0;
    let increment = Math.ceil(target / 100);

    function updateCount() {
      let current = parseInt(counter.innerText);
      if (current < target) {
        counter.innerText = current + increment;
        setTimeout(updateCount, 50);
      } else {
        counter.innerText = target;
      }
    }

    counter.innerText = start; // Ustawienie początkowej wartości licznika
    updateCount();
  });
}

// Sprawdzenie, czy sekcja z licznikami jest widoczna w oknie przeglądarki
function checkScrollPosition() {
  const heroStatsSection = document.querySelector(".hero-stats");
  if (heroStatsSection && counters.length > 0) {
    const sectionPosition = heroStatsSection.getBoundingClientRect().top;
    if (sectionPosition < window.innerHeight && !countersStarted) {
      animateCounters();
      countersStarted = true;
    }
  }
}

// Dodanie nasłuchiwania na przewijanie
window.addEventListener("load", checkScrollPosition);

const heroStatsSection = document.querySelector(".hero-stats");

if (heroStatsSection) {
  window.addEventListener("scroll", () => {
    if (
      !countersStarted &&
      heroStatsSection.getBoundingClientRect().top < window.innerHeight
    ) {
      animateCounters();
      countersStarted = true;
    }
  });
}

const testimonials = document.querySelectorAll(".testimonial");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
let currentIndex = 0;

// Funkcja do pokazywania opinii
function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.remove("active");
  });

  testimonials[index].classList.add("active");
}

// Obsługa przycisków nawigacyjnych
nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currentIndex);
});

// Automatyczne przewijanie co 6 sekund
setInterval(() => {
  currentIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(currentIndex);
}, 6000);

// Ustawienie pierwszej opinii jako aktywnej
showTestimonial(currentIndex);
