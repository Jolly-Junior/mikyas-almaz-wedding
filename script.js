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
    daysElement.textContent = "000";
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

  daysElement.textContent = pad(days, 3);
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
window.addEventListener("load", updateGalleryDots);
window.addEventListener("resize", updateGalleryDots);
