document.addEventListener("DOMContentLoaded", () => {
  const mobileNav = document.querySelector("#mobileNav");
  const navbarToggler = document.querySelector(".navbar-toggler");

  navbarToggler.addEventListener("click", () => {
    mobileNav.classList.toggle("show");
  });

  window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
      header.classList.add("bg-opacity");
    } else {
      header.classList.remove("bg-opacity");
    }
  });
});

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

document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseover", () => {
      card.style.transform = "translateY(-10px)";
      card.style.boxShadow = "0 0 40px rgba(255, 0, 0, 0.5)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 0 30px rgba(255, 0, 0, 0.1)";
    });
  });
});

// Dynamiczny tekst w sekcji hero
const dynamicText = document.querySelector(".text-dangerh");
const words = ["Ekspertyzy", "Wyceny", "Doradztwo"];
let index = 0;

if (dynamicText) {
  function changeText() {
    dynamicText.textContent = words[index];
    index = (index + 1) % words.length;
  }
  setInterval(changeText, 2000);
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
