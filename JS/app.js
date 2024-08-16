"use strict";
import { redirect, URL_STRING, KEY } from "./functions.js";

// ? * --> Variables
const config = { rootMargin: "0px 0px 100px 0px" };

// ? * --> DOM Elements
const header = document.querySelector("header");
const menu = document.querySelector("#mainMenu");
const logo = document.querySelector("#mainLogo");
const body = document.body;
const heroSection = document.querySelector("#heroSection");
const redirectButtons = document.querySelectorAll("button[href]");
const goToTopButton = document.querySelector("[go-top-button]");
const navButton = document.querySelector("#navButton");
const navLinks = document.querySelectorAll(".link");
const contactForm = document.querySelector("#form");
const contactPageButton = document.querySelector("#contact-view");
const contactPage = document.querySelector("#contactPage");
const contactFormButton = document.querySelector("#showContactForm");
const closeContactPageButton = document.querySelector("#closeContactPage");
const abbreviationsList = document.querySelectorAll("abbr");

const messageInputField = document.querySelector("#message");
const inputFields = document.querySelectorAll("input");

const switchButtons = document.querySelectorAll(".switch");
// ? * --> Functions

function inputControls(inputField, fieldLabel) {
  if (inputField.value.length <= 0)
    fieldLabel.setAttribute("hasContent", false);
  if (inputField.value.length >= 1) fieldLabel.setAttribute("hasContent", true);
}

// ? * --> Instance
const observerConfig = { rootMargin: "0px 0px 0px 0px" };

const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      header.setAttribute("isInteracting", false);
      if (goToTopButton) goToTopButton.setAttribute("go-top-button", false);
      return;
    }

    header.setAttribute("isInteracting", true);
    if (goToTopButton) goToTopButton.setAttribute("go-top-button", true);
  });
}, observerConfig);

const choosingUsListParent = document.querySelector(
  ".choosing-us-content-container"
);
const ChoosingUsIndicatorsList = document.querySelectorAll(
  ".choosing-card-indicator"
);

const ChoosingUsListElements = document.querySelectorAll(".choosing-content");

const observer = new IntersectionObserver((e) => {
  e.forEach(({ isIntersecting, target }) => {
    isSlideObserving(
      isIntersecting,
      target,
      "choosing-content",
      ChoosingUsIndicatorsList
    );
  });
}, config);

const weDoObserver = new IntersectionObserver((e) => {
  e.forEach(({ isIntersecting, target }) => {
    isSlideObserving(
      isIntersecting,
      target,
      "we-do-content",
      weDoIndicatorsList
    );
  });
}, config);

/**
 * Brief description about is slide observing.
 * @summary ...
 * @param {Boolean} isIntersecting
 * @param {Int} index
 * @param {String} elementName
 * @param {Array} indicatorsList
 * @returns {Boolean}
 */
function isSlideObserving(isIntersecting, target, elementName, indicatorsList) {
  const isObserving = target.getAttribute("isObserving");
  const currentSlide = document.querySelector(
    `.${elementName}[isObserving="true"]`
  );
  const activeIndicator = parseInt(currentSlide.getAttribute("index"));
  if (isObserving === "true") return;
  else if (isIntersecting === true && isObserving === "false") {
    const targetIndex = parseInt(target.getAttribute("index"));
    currentSlide.setAttribute("isObserving", false);
    target.setAttribute("isObserving", true);
    indicatorsList[activeIndicator].setAttribute("active", false);
    indicatorsList[targetIndex].setAttribute("active", true);
  }
}

function tabListIndicators(indicator, index, list) {
  {
    const isActive = indicator.getAttribute("active");

    if (isActive === "true") return;
    else {
      list[index].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }
}

ChoosingUsIndicatorsList.forEach((indicator, index) => {
  indicator.addEventListener("pointerdown", () =>
    tabListIndicators(indicator, index, ChoosingUsListElements)
  );
});

if (choosingUsListParent) {
  choosingUsListParent.addEventListener("scroll", () => {
    ChoosingUsListElements.forEach((element) => {
      observer.observe(element);
    });
  });
}

const weDoListParent = document.querySelector(".we-do-content-container");
const weDoListElements = document.querySelectorAll(".we-do-content");
const weDoIndicatorsList = document.querySelectorAll(".we-do-card-indicator");

weDoIndicatorsList.forEach((indicator, index) => {
  indicator.addEventListener("pointerdown", () =>
    tabListIndicators(indicator, index, weDoListElements)
  );
});

if (weDoListParent) {
  weDoListParent.addEventListener("scroll", () => {
    weDoListElements.forEach((element) => {
      weDoObserver.observe(element);
    });
  });
}

// ? * --> Event Listeners

// * -->  setup
const root = document.documentElement;
const navigationHight = header.offsetHeight;
root.style.setProperty(
  "----scrollPadding",
  Math.round(navigationHight - 1) + "px"
);

if (heroSection != null) headerObserver.observe(heroSection);

//  * -->  Input

if (inputFields) {
  inputFields.forEach((inputField) => {
    inputField.addEventListener("input", () =>
      inputControls(inputField, inputField.labels[0])
    );
  });
}

if (messageInputField)
  messageInputField.addEventListener("input", () =>
    inputControls(messageInputField, messageInputField.labels[0])
  );

//  * --> Pointerdown (Click)

abbreviationsList.forEach((abbr) => {
  abbr.addEventListener("pointerdown", () => {
    abbr.classList.add("visible");
  });
});

redirectButtons.forEach((button) => {
  button.addEventListener("pointerdown", () => {
    redirect(button.getAttribute("href"));
  });
});

logo.addEventListener("pointerdown", () => redirect("./index.html"));

navButton.addEventListener("pointerdown", () => {
  const isExpanded = navButton.getAttribute("isToggled");
  if (isExpanded === "false") {
    navButton.setAttribute("isToggled", true);
    menu.setAttribute("data-visible", true);
    menu.setAttribute("aria-expanded", true);
  } else if (isExpanded === "true") {
    navButton.setAttribute("isToggled", false);
    menu.setAttribute("data-visible", false);
    menu.setAttribute("aria-expanded", false);
  }
  // navigation Links animation

  navLinks.forEach((link, index) => {
    link.setAttribute("animation", true);
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinksFadeAnim 0.5s  forwards ${
        index / 3 + 1.5
      }s`;
      link.style.animationDelay = `${index / 3 + 0.5}s`;
    }
  });
});

switchButtons.forEach((button) => {
  button.addEventListener("pointerdown", () => {
    const controls = button.getAttribute("aria-controls");
    const target = document.querySelector(`#${controls}`);
    button.setAttribute("active", true);
    target.setAttribute("visible", true);
    target.setAttribute("aria-expanded", true);
    target.setAttribute("aria-hidden", false);

    switchButtons.forEach((switchButton) => {
      if (switchButton !== button) {
        switchButton.setAttribute("active", false);
        const controls = switchButton.getAttribute("aria-controls");
        const target = document.querySelector(`#${controls}`);
        target.setAttribute("aria-expanded", false);
        target.setAttribute("visible", false);
        target.setAttribute("aria-hidden", true);
        switchButton.setAttribute("active", false);
      }
    });
  });
});

if (contactFormButton) {
  contactFormButton.addEventListener("pointerdown", () => {
    const visible = contactForm.getAttribute("visible") === "true";
    contactForm.setAttribute("visible", !visible);
    cosIllustrations.setAttribute("visible", visible);
    appointmentPickerForm.setAttribute("visible", false);
  });
}

if (contactPageButton) {
  contactPageButton.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    const expanded = contactPage.getAttribute("aria-expanded") === "true";
    contactPage.setAttribute("aria-expanded", !expanded);
    body.setAttribute("isObserving", expanded);
  });
}

if (closeContactPageButton) {
  closeContactPageButton.addEventListener("pointerdown", () => {
    contactPage.setAttribute("aria-expanded", false);
    body.setAttribute("isObserving", true);
  });
}

// * ? --> Contact Page

const map = document.querySelector("#map");
const contactButton = document.querySelector("#sendMessageBtn");
const locationButton = document.querySelector("#mapButton");

locationButton?.addEventListener("pointerdown", () => {
  contactForm.setAttribute("visible", false);
  map.setAttribute("visible", true);
  map.removeAttribute("hidden");
  map.setAttribute("aria-hidden", false);
});

contactButton?.addEventListener("pointerdown", () => {
  map.setAttribute("visible", false);
  contactForm.setAttribute("visible", true);
  contactForm.removeAttribute("hidden");
  contactForm.setAttribute("aria-hidden", false);
});

function setPhoneNumber(value) {
  value = value.replace("+", "");
  console.log(value);
  const regex = /^\d{1,3} \d{8,10}$/;
  if (regex.test(value)) {
    return {
      code: value.split(" ")[0],
      number: value.split(" ")[1],
    };
  }
  return {
    code: "",
    number: "",
  };
}

async function validateForm(fields) {
  let isValid = true;
  let data = {};
  fields.forEach((field) => {
    if (field.value.length <= 0) {
      field.setAttribute("error", true);
      isValid = false;
    } else {
      field.removeAttribute("error");

      data[field.id] = field.value;
    }
  });
  return { isValid, data };
}

if (contactForm)
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailField = document.querySelector("#email");
    const nameField = document.querySelector("#name");
    const numberField = document.querySelector("#number");
    const messageField = document.querySelector("#message");

    const { isValid, data } = await validateForm([
      emailField,
      nameField,
      messageField,
    ]);

    const phone = setPhoneNumber(numberField.value);
    const input = {
      ...data,
      phone,
    };
    if (isValid) {
      const response = await fetch(`${URL_STRING}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          tspdk: KEY,
          public: "true",
        },
        body: JSON.stringify(input),
      });

      if (response.ok) {
        contactForm.reset();
        alert("Message sent successfully");
      } else {
        alert("Message not sent, please try again");
      }
    }
  });

const numericInputs = document.querySelectorAll("[inputmode='numeric']");

numericInputs.forEach((input) => {
  validateInput(input);
});

function validateInput(el) {
  el.addEventListener("beforeinput", function (e) {
    let beforeValue = el.value;
    e.target.addEventListener(
      "input",
      function () {
        if (el.validity.patternMismatch) {
          el.value = beforeValue;
        }
      },
      { once: true }
    );
  });
}

const video = document.querySelector("video");
const title = document.querySelector(".hero-title");
video.addEventListener("timeupdate", () => {
  // Check if the current time is within the last 10 seconds of the video
  if (video.duration - video.currentTime <= 8) {
    title.setAttribute("animation", "end");
    title.addEventListener("animationend", () => {
      title.style.display = "none";
    });
  } else {
    title.removeAttribute("animation");
    if (video.currentTime <= 0.5) {
      title.style.display = "block";
      title.setAttribute("animation", "start");
    }
  }
});

const sliderLeftController = document.querySelector("#slide-left");
const sliderRightController = document.querySelector("#slide-right");
const slider = document.querySelector("#slider");
const sliderItems = document.querySelectorAll(".slider-item");

let currentSlide = 0;
let nextSlide = 1;
let previousSlide = sliderItems.length - 1;

if (sliderLeftController != null)
  sliderLeftController.addEventListener("pointerdown", () => {
    if (currentSlide === 0) {
      currentSlide = sliderItems.length - 1;
      nextSlide = 0;
      previousSlide = sliderItems.length - 2;
    } else {
      currentSlide--;
      nextSlide = currentSlide + 1;
      previousSlide = currentSlide - 1;
    }
    sliderItems.forEach((slide) => {
      slide.setAttribute("active", false);
    });
    sliderItems[currentSlide].setAttribute("active", true);
    sliderItems[nextSlide].setAttribute("next", true);
    sliderItems[previousSlide].setAttribute("previous", true);
  });

if (sliderRightController != null)
  sliderRightController?.addEventListener("pointerdown", () => {
    if (currentSlide === sliderItems.length - 1) {
      currentSlide = 0;
      nextSlide = 1;
      previousSlide = sliderItems.length - 1;
    } else {
      currentSlide++;
      nextSlide = currentSlide + 1;
      previousSlide = currentSlide - 1;
    }
    sliderItems.forEach((slide) => {
      slide.setAttribute("active", false);
    });
    sliderItems[currentSlide].setAttribute("active", true);
    sliderItems[nextSlide].setAttribute("next", true);
    sliderItems[previousSlide].setAttribute("previous", true);
  });

const projects = await fetch(`${URL_STRING}/projects`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    tspdk: KEY,
    public: "true",
  },
});

const projectsData = await projects.json();
console.log(projectsData);
const projectsContainer = document.querySelector("[data-projects]");
/*
<article class="_project" data-project="proj-1">
          <div class="_project-typography">
            <h2 class="_project-title">holiday Inn Express </h2>
            <p class="_project-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
              fringilla
              nunc. Nullam
            </p>
            <button class="_project-button | pressable | outline | margin-block-300" aria-label="View project"
              title="View project" data-project="proj-1">View
              Project</button>
          </div>
          <div class="slider-wrapper">
            <!-- <button class="slider-controller" aria-controls="Carousel-List" id="slide-left" title="Slide left"
              type="button"> <- </button> -->
            <div id="Carousel-List" class="_project-images | slider" id="slider">
              <img class="_project-image | slider-item"
                src="../assets/projects/Project 1/PHOTO-2024-06-29-14-52-23 2.jpg" alt="intercontinental hotel malta">
            </div>
            <!-- <button class="slider-controller" aria-controls="Carousel-List" id="slide-right" title="Slide right"
                  type="button"> -> </button> -->
          </div>
        </article>


        <article class="_project | reverse" data-project="proj-2">
          <div class="_project-typography">
            <h2 class="_project-title">intercontinental hotel malta</h2>
            <p class="_project-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec
              fringilla
              nunc. Nullam
            </p>
            <button class="_project-button | pressable | outline | margin-block-300" aria-label="View project"
              title="View project" data-project="proj-2">View
              Project</button>
          </div>
          <div class="slider-wrapper">
            <!-- <button class="slider-controller" aria-controls="Carousel-List" id="slide-left" title="Slide left"
              type="button"> <- </button> -->
            <div id="Carousel-List" class="_project-images | slider" id="slider">
              <img class="_project-image | slider-item"
                src="../assets/projects/Project 2/PHOTO-2024-07-01-14-51-04 4.jpg" alt="intercontinental hotel malta">
            </div>
            <!-- <button class="slider-controller" aria-controls="Carousel-List" id="slide-right" title="Slide right"
                  type="button"> -> </button> -->
          </div>
        </article>
         */

if (projectsContainer != null) {
  if (projectsData.length === 0) {
    const message = document.createElement("h2");
    message.textContent = "No projects available";
    projectsContainer.appendChild(message);
  }

  projectsData.forEach((project, index) => {
    const article = document.createElement("article");
    article.classList.add("_project");
    article.classList.add(index % 2 === 0 ? "reverse" : "aa");
    article.setAttribute("data-project", project._id);

    const typography = document.createElement("div");
    typography.classList.add("_project-typography");

    const title = document.createElement("h2");
    title.classList.add("_project-title");
    title.textContent = project.name;

    const description = document.createElement("p");
    description.classList.add("_project-description");
    description.textContent = project.description;

    const button = document.createElement("button");
    button.classList.add(
      "_project-button",
      "pressable",
      "outline",
      "margin-block-300"
    );
    button.setAttribute("aria-label", "View project");
    button.setAttribute("title", "View project");
    button.setAttribute("data-project", project._id);
    button.textContent = "View Project";

    typography.appendChild(title);
    typography.appendChild(description);
    typography.appendChild(button);

    article.appendChild(typography);

    const sliderWrapper = document.createElement("div");
    sliderWrapper.classList.add("slider-wrapper");

    const slider = document.createElement("div");
    slider.classList.add("_project-images", "slider");
    slider.setAttribute("id", "slider");

    const image = document.createElement("img");
    image.classList.add("_project-image", "slider-item");
    image.setAttribute("src", project.files[0].secure_url);
    image.setAttribute("alt", project.name);

    slider.appendChild(image);
    sliderWrapper.appendChild(slider);
    article.appendChild(sliderWrapper);

    projectsContainer.appendChild(article);
  });
}

fetch(`${URL_STRING}/`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    tspdk: KEY,
    public: "true",
  },
});
