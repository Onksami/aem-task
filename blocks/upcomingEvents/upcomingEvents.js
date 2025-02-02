import { createOptimizedPicture } from "../../scripts/aem.js";

export default function decorate(block) {
  // Create wrapper for slider
  const sliderWrapper = document.createElement("div");
  sliderWrapper.className = "upcomingEvents-outer-container";

  // Create slider container
  const sliderContainer = document.createElement("div");
  sliderContainer.className = "upcomingEvents-container";

  // Create slider track
  const sliderTrack = document.createElement("div");
  sliderTrack.className = "upcomingEvents-track";

  // Convert existing content to slider items
  [...block.children].forEach((row) => {
    const eventCard = document.createElement("div");
    eventCard.className = "upcomingEvents-card";

    // Extract and structure the content
    const date = row.children[0]?.querySelector("p")?.textContent || "";
    const description = row.children[1]?.querySelector("p")?.textContent || "";
    const speaker = row.children[2]?.querySelector("p")?.textContent || "";
    const buttonCount = row.children[3]?.querySelector("p")?.textContent || "2";

    // Create card content structure
    const dateDiv = document.createElement("div");
    dateDiv.className = "upcomingEvents-date";
    dateDiv.textContent = date;

    const descriptionDiv = document.createElement("div");
    descriptionDiv.className = "upcomingEvents-description";
    descriptionDiv.textContent = description;

    const speakerDiv = document.createElement("div");
    speakerDiv.className = "upcomingEvents-speaker";
    speakerDiv.textContent = speaker;

    // Create buttons container
    const buttonsDiv = document.createElement("div");
    buttonsDiv.className =
      buttonCount === "2"
        ? "upcomingEvents-buttons two-buttons"
        : "upcomingEvents-buttons single-button";

    // Add buttons based on count
    if (buttonCount === "2") {
      const registerBtn = document.createElement("button");
      registerBtn.className = "upcomingEvents-register";
      registerBtn.textContent = "REGISTER";

      const calendarBtn = document.createElement("button");
      calendarBtn.className = "upcomingEvents-calendar";
      calendarBtn.textContent = "ADD TO CALENDAR";

      buttonsDiv.appendChild(registerBtn);
      buttonsDiv.appendChild(calendarBtn);
    } else {
      const detailsBtn = document.createElement("button");
      detailsBtn.className = "upcomingEvents-details";
      detailsBtn.textContent = "MORE DETAILS COMING SOON";
      buttonsDiv.appendChild(detailsBtn);
    }

    // Append all elements to card
    eventCard.appendChild(dateDiv);
    eventCard.appendChild(descriptionDiv);
    eventCard.appendChild(speakerDiv);
    eventCard.appendChild(buttonsDiv);

    sliderTrack.appendChild(eventCard);
  });

  // Create navigation buttons
  const prevButton = document.createElement("button");
  prevButton.className = "upcomingEvents-nav upcomingEvents-prev";
  prevButton.innerHTML = "←";

  const nextButton = document.createElement("button");
  nextButton.className = "upcomingEvents-nav upcomingEvents-next";
  nextButton.innerHTML = "→";

  // Add everything to the DOM
  sliderContainer.appendChild(sliderTrack);
  sliderWrapper.appendChild(prevButton);
  sliderWrapper.appendChild(sliderContainer);
  sliderWrapper.appendChild(nextButton);

  // Clear original content and append new structure
  block.textContent = "";
  block.appendChild(sliderWrapper);

  // Initialize slider functionality
  let currentPosition = 0;
  const cardWidth = 300; // Width of each card + gap
  const totalCards = sliderTrack.children.length;

  function updateSliderPosition() {
    sliderTrack.style.transform = `translateX(${currentPosition}px)`;
  }

  function updateNavigationButtons() {
    prevButton.disabled = currentPosition >= 0;
    nextButton.disabled = currentPosition <= -(totalCards - 3) * cardWidth;
  }

  // Add click handlers for navigation
  prevButton.addEventListener("click", () => {
    if (currentPosition < 0) {
      currentPosition += cardWidth;
      updateSliderPosition();
      updateNavigationButtons();
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentPosition > -(totalCards - 3) * cardWidth) {
      currentPosition -= cardWidth;
      updateSliderPosition();
      updateNavigationButtons();
    }
  });

  // Initial button state
  updateNavigationButtons();
}
