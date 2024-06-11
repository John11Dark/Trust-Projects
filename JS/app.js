"use strict";

import {
  fetchJsonData,
  sleep,
  setDay,
  redirect,
  setTheme,
} from "./functions.js";

const lightThemeColors = {
  "--background-color": "#fcf6db",
  "--theme-shadow": "#b9b5ab8a",
  "--surface-light": "#c9c2a6",
  "--surface-gray": "#b4b3b1",
  "--surface-grayish": "#131212",
  "--surface-dark": "#928c86",
  "--primary-color-dark": "#fcf6db",
  "--primary-color-light": "#11100e",
  "--opacity-dark-100": "#11100ed7",
  "--opacity-light-100": "#141212c4",
};

const darkThemeColors = {
  "--background-color": "#171311",
  "--theme-shadow": "#b9b5ab8a",
  "--surface-light": "#e5dfc6",
  "--surface-gray": "#b4b3b1",
  "--surface-grayish": "#d8d6d1",
  "--surface-dark": "#928c86",
  "--primary-color-dark": "#11100e",
  "--primary-color-light": "#fcf6db",
  "--opacity-dark-100": "#11100ed7",
  "--opacity-light-100": "#ffffff26",
};
// ? * --> Variables
const platform = navigator.platform;
let cached = false;
const ipInfo = await fetchJsonData("https://ipinfo.io?token=3c805bf213b675");
const userModePreference = window.matchMedia("(prefers-color-scheme: Dark)");
const ColorSchemeMetaTag = document.querySelector("meta[name=color-scheme]");
const today = new Date();
const config = { rootMargin: "0px 0px 100px 0px" };
const topObserverConfig = { rootMargin: "0px 0px 0px 0px" };
let beforeScrollTop = 0;
const accentColor = "#313636";
let tileColor = "#313636";

// ? * --> DOM Elements
const header = document.querySelector("header");
const menu = document.querySelector("#mainMenu");
const tileColorList = document.querySelectorAll("meta[tile-control]");
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

// themeButton.addEventListener("pointerdown", () => {
//   const THEME = localStorage.getItem("theme")
//     ? localStorage.getItem("theme")
//     : userModePreference.matches
//     ? "dark"
//     : "light";
//   setTheme(
//     THEME,
//     themeButton,
//     darkThemeColors,
//     lightThemeColors,
//     ColorSchemeMetaTag,
//     tileColor
//   );
//   header.style = ` transition: all 0.75s ease-in-out;`;
// });

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

contactForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const data = validateForm(formData);
  if (!data) alert("Please fill in all fields");
  else {
    // reset form
    contactForm.reset();
    if (inputFields) {
      inputFields.forEach((inputField) => {
        inputField.setAttribute("hasContent", false);
      });
    }

    if (messageInputField) messageInputField.setAttribute("hasContent", false);
  }
  // const response = await fetch("https://formspree.io/f/mnqoqzqz", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // });

  // if (response.ok) {
  //   contactForm.reset();
  //   alert("Message sent successfully");
  // } else {
  //   alert("Message not sent, please try again");
  // }
});

async function validateForm(formData) {
  const data = Object.fromEntries(formData);
  const { name, email, number, message } = data;
  console.log(data);
  if (name.length <= 0) {
    alert("Please enter your name");
    return null;
  }
  if (email.length <= 0) {
    alert("Please enter your email");
    return null;
  }
  if (message.length <= 0) {
    alert("Please enter your message");
    return null;
  }
  const newNumber = data.number.replace("+", "");
  if (number.length <= 0 || isNaN(newNumber)) {
    alert("Please enter your number");
    return null;
  }

  return data;
}

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

const keys = {
  ak: "s564k-s128e-ey78a",
  av: "49128f-AM73-8cd1",
  bk: "a787m-h778e-key45df",
  bv: "b17d278c-cd1Ce-4602",
  nk: "DFS5S_S5JEF-445EG",
  ck: "AMD5S_SJDEF-45DSF",
  cv: "fc2AM-GB-78f2b5",
};

const IN_LOCAL_IP_ADDRESS = "172.16.0.14";
// const OUT_LOCAL_IP_ADDRESS = "192.168.1.104";
const IP_ADDRESS = IN_LOCAL_IP_ADDRESS;

const PORT = "8000";

async function clientFetch() {
  try {
    const response = await fetch(`http://172.16.0.14:8000/test`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      mode: "cors",
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

// const data = await clientFetch();
// console.log("data", data);

// mapboxgl.accessToken ="";
// const MapBoxInstance = new mapboxgl.Map({
//   container: "map",
//   // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
//   style: "mapbox://styles/mapbox/dark-v11",
//   center: [35.92435628878943, 14.395761987151309],
//   zoom: 10,
//   pitch: 45,
//   bearing: -17.6,
//   accentColor: accentColor,
// });

// const MarkerPopUp = new mapboxgl.Popup({ offset: 25 }).setText(
//   "Trust Projects"
// );

// // Create a default Marker and add it to the map.
// const TrustProjectsMarker = new mapboxgl.Marker()
//   .setLngLat([35.9090783095469, 14.42816235462325])
//   .setPopup(MarkerPopUp)
//   .addTo(MapBoxInstance);
