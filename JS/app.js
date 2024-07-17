"use strict";
import { fetchJsonData, redirect } from "./functions.js";

const keys = {
  ak: "s564k-s128e-ey78a",
  av: "49128f-AM73-8cd1",
  bk: "a787m-h778e-key45df",
  bv: "b17d278c-cd1Ce-4602",
  nk: "DFS5S_S5JEF-445EG",
  ck: "AMD5S_SJDEF-45DSF",
  cv: "fc2AM-GB-78f2b5",
};
const URL_STRING = "https://trust-projects-server.onrender.com";
const KEY = "Um6NSSwMAVWXG7-eRF1BdNr3S55wCYC-Uv55SShz8tK1UW";

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

// function headerObserver() {
//   let currentScrollTop = window.scrollY || document.documentElement.scrollTop;
//   header.setAttribute("isIntersecting", true);
//   if (beforeScrollTop < currentScrollTop) {
//     header.style = `opacity: 0.3; height : 2vh;`;
//   } else {
//     header.style = `opacity: 1; height : 10vh;`;
//   }
//   console.log(beforeScrollTop);
//   console.log(currentScrollTop);
//   beforeScrollTop = currentScrollTop;
//   if (beforeScrollTop <= 0 && currentScrollTop <= 0) {
//     header.setAttribute("isIntersecting", false);
//   }
// }

// tab indicator
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
  const regex = /^\+\d{1,3} \d{8,10}$/;
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
