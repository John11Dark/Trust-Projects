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
const accentColor = "#eaa244";
let tileColor = "#171311";

// ? * --> DOM Elements
const header = document.querySelector("header");
const menu = document.querySelector("#mainMenu");
const themeButton = document.querySelector("#themeButton");
const tileColorList = document.querySelectorAll("meta[tile-control]");
const logo = document.querySelector("#mainLogo");
const body = document.body;
const navSvgButton = document.querySelector(".navSvgButton");
const sideNavigation = document.querySelector(".sideNavigation");
const themeIcon = document.querySelector("#themeIconLink");
const scrollDownButton = document.querySelector(".scrollIcon");
const logos = document.querySelectorAll(".Logo");
const heroSection = document.querySelector("#heroSection");
const redirectButtons = document.querySelectorAll("button[href]");
const goToTopButton = document.querySelector("[go-top-button]");
const navButton = document.querySelector("#navButton");
const navLinks = document.querySelectorAll(".link");
const contactForm = document.querySelector("#form");

const contactFormButton = document.querySelector("#showContactForm");

const abbreviationsList = document.querySelectorAll("abbr");

const messageInputField = document.querySelector("#message");
const inputFields = document.querySelectorAll("input");

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
    menu.setAttribute("visible", true);
    menu.setAttribute("aria-expanded", true);
    document.body.setAttribute("isObserving", false);
    tileColorList.forEach((content) => {
      content.setAttribute("content", accentColor);
    });
  } else if (isExpanded === "true") {
    navButton.setAttribute("isToggled", false);
    menu.setAttribute("visible", false);
    menu.setAttribute("aria-expanded", false);
    document.body.setAttribute("isObserving", true);
    tileColorList.forEach((content) => {
      content.setAttribute("content", tileColor);
    });
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

if (contactFormButton) {
  contactFormButton.addEventListener("pointerdown", () => {
    const visible = contactForm.getAttribute("visible") === "true";
    contactForm.setAttribute("visible", !visible);
    cosIllustrations.setAttribute("visible", visible);
    appointmentPickerForm.setAttribute("visible", false);
  });
}
