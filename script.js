const eventDate = new Date("2026-06-25T00:00:00");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const rsvpForm = document.querySelector(".rsvp-form");
const sectionLinks = document.querySelectorAll("[data-section-link]");
const observedSections = document.querySelectorAll("main section[id]");
const galleryTrack = document.getElementById("gallery-track");
const galleryPrevButton = document.getElementById("gallery-prev");
const galleryNextButton = document.getElementById("gallery-next");
const galleryDots = Array.from(document.querySelectorAll(".gallery-dot"));

function pad(value, length = 2) {
  return String(value).padStart(length, "0");
}

function updateCountdown() {
  const now = new Date();
  const difference = eventDate.getTime() - now.getTime();

  if (difference <= 0) {
    daysElement.textContent = "0";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    return;
  }

  const totalSeconds = Math.floor(difference / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  daysElement.textContent = days;
  hoursElement.textContent = pad(hours);
  minutesElement.textContent = pad(minutes);
  secondsElement.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

rsvpForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  window.alert("This RSVP form is a beautiful placeholder for now. We can connect it next.");
});

// Gallery Autoplay variables
let galleryAutoplayInterval = null;

function startGalleryAutoplay() {
  if (galleryAutoplayInterval) return;
  galleryAutoplayInterval = setInterval(() => {
    if (!galleryTrack) return;
    const maxScrollLeft = galleryTrack.scrollWidth - galleryTrack.clientWidth;
    // If we're at or very close to the end, wrap back to the beginning
    if (galleryTrack.scrollLeft >= maxScrollLeft - 10) {
      galleryTrack.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      scrollGallery(1);
    }
  }, 3000);
}

function stopGalleryAutoplay() {
  if (galleryAutoplayInterval) {
    clearInterval(galleryAutoplayInterval);
    galleryAutoplayInterval = null;
  }
}

if (sectionLinks.length && observedSections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

      if (!visibleEntry) return;

      sectionLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${visibleEntry.target.id}`;
        link.classList.toggle("is-active", isActive);
      });

      // Add 'is-active' class to the current section
      observedSections.forEach((sec) => {
        sec.classList.toggle("is-active", sec.id === visibleEntry.target.id);
      });

      // Auto-slide gallery when in view
      if (visibleEntry.target.id === "gallery") {
        startGalleryAutoplay();
      } else {
        stopGalleryAutoplay();
      }
    },
    {
      threshold: [0.2, 0.4, 0.6],
      rootMargin: "-20% 0px -35% 0px",
    },
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}

function updateGalleryDots() {
  if (!galleryTrack || !galleryDots.length) return;

  const cards = Array.from(galleryTrack.querySelectorAll(".gallery-photo"));
  if (!cards.length) return;

  const trackCenter = galleryTrack.scrollLeft + galleryTrack.clientWidth / 2;
  let activeIndex = 0;
  let smallestDistance = Number.POSITIVE_INFINITY;

  cards.forEach((card, index) => {
    const cardCenter = card.offsetLeft + card.clientWidth / 2;
    const distance = Math.abs(cardCenter - trackCenter);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      activeIndex = index;
    }
  });

  galleryDots.forEach((dot, index) => {
    dot.classList.toggle("is-active", index === activeIndex);
  });
}

function scrollGallery(direction) {
  if (!galleryTrack) return;

  const firstCard = galleryTrack.querySelector(".gallery-photo");
  const step = firstCard ? firstCard.clientWidth + 14 : galleryTrack.clientWidth * 0.8;

  galleryTrack.scrollBy({
    left: direction * step,
    behavior: "smooth",
  });
}

galleryPrevButton?.addEventListener("click", () => scrollGallery(-1));
galleryNextButton?.addEventListener("click", () => scrollGallery(1));
galleryTrack?.addEventListener("scroll", updateGalleryDots, { passive: true });

// Pause autoplay on user interaction
galleryTrack?.addEventListener("mouseenter", stopGalleryAutoplay);
galleryTrack?.addEventListener("mouseleave", () => {
  const gallerySection = document.getElementById("gallery");
  if (gallerySection && gallerySection.classList.contains("is-active")) {
    startGalleryAutoplay();
  }
});

window.addEventListener("load", updateGalleryDots);
window.addEventListener("resize", updateGalleryDots);

// Scroll Reveal Animations
const revealElements = document.querySelectorAll(
  ".section-heading, .glass-card, .timeline-item, .countdown-item, .hero-card, .hero-image-container"
);

revealElements.forEach((el) => {
  el.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }
);

revealElements.forEach((el) => {
  revealObserver.observe(el);
});
