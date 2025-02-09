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

  function handleScroll() {
    const header = document.getElementById("main-header");
    if (window.scrollY > 50) {
      header.classList.add("header-scrolled");
    } else {
      header.classList.remove("header-scrolled");
    }
  }

  // Nasłuchiwanie scrollowania
  document.addEventListener("scroll", handleScroll);
});

// Efekt przycisków najechania w Hero
document.querySelectorAll(".hero-buttons .btn").forEach((btn) => {
  btn.addEventListener("mouseover", () => {
    btn.style.transform = "scale(1.05)";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
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
  const certificatesData = [
    { src: "certyfikaty/uprawnienie.jpg" },
    { src: "certyfikaty/cert1.jpg" },
    { src: "certyfikaty/cert2.jpg" },
    { src: "certyfikaty/cert3.jpg" },
    { src: "certyfikaty/cert4.jpg" },
    { src: "certyfikaty/cert5.jpg" },
    { src: "certyfikaty/cert6.jpg" },
    { src: "certyfikaty/cert7.jpg" },
    { src: "certyfikaty/cert8.jpg" },
  ];

  const grid = document.querySelector(".certificates-grid");
  let currentIndex = 0;

  function renderCertificates() {
    grid.innerHTML = "";
    certificatesData.forEach((cert, index) => {
      const item = document.createElement("div");
      item.classList.add("certificate-item");
      item.innerHTML = `<img src="${cert.src}" alt="Certyfikat" loading="lazy">`;
      item.addEventListener("click", () => openModal(index));
      grid.appendChild(item);
    });
  }

  renderCertificates();

  function openModal(index) {
    currentIndex = index;
    const modal = document.getElementById("certificate-modal");
    document.getElementById("modal-img").src =
      certificatesData[currentIndex].src;
    modal.style.display = "flex";
  }

  function closeModal() {
    document.getElementById("certificate-modal").style.display = "none";
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % certificatesData.length;
    document.getElementById("modal-img").src =
      certificatesData[currentIndex].src;
  }

  function prevImage() {
    currentIndex =
      (currentIndex - 1 + certificatesData.length) % certificatesData.length;
    document.getElementById("modal-img").src =
      certificatesData[currentIndex].src;
  }

  document.querySelector(".close").addEventListener("click", closeModal);
  document.querySelector(".modal-next").addEventListener("click", nextImage);
  document.querySelector(".modal-prev").addEventListener("click", prevImage);
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

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("hero-form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Zapobiega przeładowaniu strony

    const formData = new FormData(form);

    try {
      const response = await fetch("send_email.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.text();
      alert(result); // Powiadomienie użytkownika o wyniku
    } catch (error) {
      alert("Błąd wysyłania formularza. Spróbuj ponownie.");
    }
  });
});
