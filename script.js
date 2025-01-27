document.addEventListener("DOMContentLoaded", () => {
  // Inicjalizacja AOS
  AOS.init({
    duration: 1000,
    once: true,
  });

  let lastScrollTop = 0;
  const header = document.getElementById("main-header");
  const headerContactMobile = document.querySelector(".header-contact-mobile");
  const menuToggle = document.getElementById("menu-toggle");
  const closeContact = document.getElementById("close-contact");

  if (menuToggle && closeContact && headerContactMobile) {
    // Kliknięcie przycisku Kontakt
    menuToggle.addEventListener("click", () => {
      if (headerContactMobile.classList.contains("visible")) {
        // Zamknij header-contact-mobile
        headerContactMobile.classList.remove("visible");
        headerContactMobile.classList.add("hidden");
        menuToggle.textContent = "Kontakt";
      } else {
        // Otwórz header-contact-mobile
        headerContactMobile.classList.add("visible");
        headerContactMobile.classList.remove("hidden");
        menuToggle.textContent = "X";
      }
    });

    // Kliknięcie przycisku X
    closeContact.addEventListener("click", () => {
      headerContactMobile.classList.remove("visible");
      headerContactMobile.classList.add("hidden");
      menuToggle.textContent = "Kontakt";
    });
  }

  // Obsługa przewijania
  window.addEventListener("scroll", () => {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop && currentScroll > 50) {
      // Przewijanie w dół
      header.classList.add("hidden");

      if (headerContactMobile.classList.contains("visible")) {
        headerContactMobile.classList.add("scroll-hidden");
        headerContactMobile.classList.remove("visible");
      }
    } else {
      // Przewijanie w górę
      header.classList.remove("hidden");

      if (headerContactMobile.classList.contains("scroll-hidden")) {
        headerContactMobile.classList.add("visible");
        headerContactMobile.classList.remove("scroll-hidden");
      }
    }

    lastScrollTop = currentScroll;
  });
});

document.addEventListener("DOMContentLoaded", function () {});

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
