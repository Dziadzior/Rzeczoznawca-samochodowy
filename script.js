document.addEventListener("DOMContentLoaded", () => {
  const mobileContact = document.getElementById("h-cm");
  const menuToggle = document.getElementById("menu-toggle");
  const closeContact = document.getElementById("close-contact");
  const logoTitle = document.getElementById("logo-title");

  let isMenuOpen = false;

  menuToggle.addEventListener("click", (e) => {
    e.preventDefault();
    toggleMenu();
  });

  closeContact.addEventListener("click", (e) => {
    e.preventDefault();
    closeMenu();
  });

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    mobileContact.classList.toggle("active", isMenuOpen);
    menuToggle.classList.toggle("hidden", isMenuOpen);
    closeContact.classList.toggle("hidden", !isMenuOpen);

    if (isMenuOpen) {
      logoTitle.classList.add("center");
    } else {
      logoTitle.classList.remove("center");
    }
  }

  function closeMenu() {
    isMenuOpen = false;
    mobileContact.classList.remove("active");
    menuToggle.classList.remove("hidden");
    closeContact.classList.add("hidden");
    logoTitle.classList.remove("center");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  AOS.init({
    duration: 1000,
    once: true,
  });

  // Pobranie liczników
  const counters = document.querySelectorAll(".counter");
  let counterStarted = false;

  function startCounter() {
    counters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-count");
        const count = +counter.innerText;

        const increment = target / 100;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  }

  // Sprawdzanie, czy użytkownik przewinął do sekcji Hero
  function handleScroll() {
    const sectionHero = document.querySelector(".hero-stats");
    const sectionPos = sectionHero.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.2;

    if (sectionPos < screenPos && !counterStarted) {
      startCounter();
      counterStarted = true;
    }
  }

  window.addEventListener("scroll", handleScroll);

  // Efekt przycisków najechania w Hero
  document.querySelectorAll(".hero-buttons .btn").forEach((btn) => {
    btn.addEventListener("mouseover", () => {
      btn.style.transform = "scale(1.05)";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1)";
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Sprawdzamy, czy sekcja About istnieje przed przypisaniem eventu
  const aboutSection = document.querySelector(".about");
  const aboutContent = document.querySelector(".about-content");
  const aboutItems = document.querySelectorAll(".about-list li");

  if (aboutSection && aboutContent) {
    function revealAbout() {
      const sectionPos = aboutSection.getBoundingClientRect().top;
      const screenPos = window.innerHeight / 1.3;

      if (sectionPos < screenPos) {
        aboutContent.classList.add("fade-in");
        aboutItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("fade-in");
          }, index * 150);
        });

        // Usuwamy event po aktywacji animacji, aby nie powtarzać
        window.removeEventListener("scroll", revealAbout);
      }
    }

    window.addEventListener("scroll", revealAbout);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const serviceCards = document.querySelectorAll(".service-card");

  // Efekt hover na kartach usług
  serviceCards.forEach((card) => {
    card.addEventListener("mouseover", () => {
      card.style.transform = "translateY(-5px)";
      card.style.boxShadow = "0 10px 20px rgba(255, 0, 0, 0.3)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "0 0 30px rgba(255, 0, 0, 0.1)";
    });
  });

  // Podświetlanie aktywnej sekcji
  function highlightActiveSection() {
    const sections = document.querySelectorAll("section");
    const scrollPos = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 50;
      const sectionHeight = section.offsetHeight;
      const sectionID = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionID}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightActiveSection);
});
