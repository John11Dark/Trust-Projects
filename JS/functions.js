// export const URL_STRING = "https://trust-projects-server.onrender.com";
export const URL_STRING = "http://172.16.0.14:8000";
export const KEY = "Um6NSSwMAVWXG7-eRF1BdNr3S55wCYC-Uv55SShz8tK1UW";
export function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export function setDay(day) {
  if (day >= 11 && day <= 13) {
    return day + "th";
  } else {
    switch (day % 10) {
      case 1:
        return day + "st";
      case 2:
        return day + "nd";
      case 3:
        return day + "rd";
      default:
        return day + "th";
    }
  }
}

export function redirect(url) {
  window.location.href = `${window.origin}${url.slice(1)}`;
}

/**
 * Fetches JSON data from the given URL.
 * @param {string} url - The URL to fetch the JSON data from.
 * @param {function} [callback] - An optional function to call with the fetched JSON data.
 * @returns {Promise<object|null>} - A Promise that resolves to the fetched JSON data or null if the response is not OK.
 */
export async function fetchJsonData(url, callback) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      return null;
    }

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      throw new TypeError("Response is not JSON");
    }

    const jsonData = await response.json();

    if (callback) {
      callback(jsonData);
    }

    return jsonData;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Changes the theme of the page based on the provided theme and color options.
 * Updates the `ColorSchemeMetaTag` and `localStorage` to reflect the new theme.
 * @param {string} theme - The current theme. If null or undefined, the `theme` attribute of `themeButton` will be used.
 * @param {HTMLElement} themeButton - The HTML button that triggered the theme change. Holds the current theme value as an attribute called `theme`.
 * @param {Object} darkThemeColors - An object of CSS variables and their corresponding color values for the "dark" theme.
 * @param {Object} lightThemeColors - An object of CSS variables and their corresponding color values for the "light" theme.
 * @param {HTMLMetaElement} ColorSchemeMetaTag - The HTML meta tag that displays the current color scheme of the page.
 * @param {string} tileColor - The color value for the browser navigation bar or browser color.
 */
export function setTheme(
  theme,
  themeButton,
  darkThemeColors,
  lightThemeColors,
  ColorSchemeMetaTag,
  tileColor
) {
  const currentTheme = theme || themeButton.getAttribute("theme");
  let newTheme = "";

  if (currentTheme === "light") {
    newTheme = "dark";
    updateCSSVariables(darkThemeColors);
    tileColor = darkThemeColors.tileColor;
  } else if (currentTheme === "dark") {
    newTheme = "light";
    updateCSSVariables(lightThemeColors);
    tileColor = lightThemeColors.tileColor;
  } else {
    console.error(`Invalid theme: ${currentTheme}`);
    return;
  }

  // Update the `ColorSchemeMetaTag` and `localStorage` with the new theme.
  ColorSchemeMetaTag.setAttribute("content", `${newTheme} light`);
  document.body.style.colorScheme = `${newTheme} light`;
  localStorage.setItem("theme", newTheme);

  // Update the `themeButton` with the new theme.
  themeButton.setAttribute("theme", newTheme);

  // Set the browser navigation bar or browser color.
  setTileColor(tileColor);

  /**
   * Updates the CSS variables on the `root` element with the provided `colors`.
   * @param {Object} colors - An object of CSS variables and their corresponding color values.
   */
  function updateCSSVariables(colors) {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(colors)) {
      root.style.setProperty(key, value);
    }
  }

  /**
   * Sets the color of the browser navigation bar or browser color to the provided `color`.
   * @param {string} color - The color value to set.
   */
  function setTileColor(color) {
    document
      .querySelector('meta[name="theme-color"]')
      .setAttribute("content", color);
  }

  /*
{
      // themeIcon.setAttribute("xlink:href", "#LIGHT-MODE-ICON");
    // logos.forEach((logo) => {
    //   logo.src = `/Assets/DarkEnginesLibraryLogoDark.png`;
    // });
   // logos.forEach((logo) => {
    //   logo.src = `/Assets/DarkEnginesLibraryLogoLight.png`;
    // });
    // themeIcon.setAttribute("xlink:href", "#DARK-MODE-ICON");
  // if (!userModePreference.matches) {
  //   linkIcon.href = "/Assets/DarkEnginesLibraryLogoDark.png";
  // } else {
  //   linkIcon.href = "/Assets/DarkEnginesLibraryLogoLight.png";
  // }

  // const path = document.querySelector("#themeIconPath");
  // const SUN_SVG_PATH = "M32.5,0A32.5,32.5,0,1,1,0,32.5,32.5,32.5,0,0,1,32.5,0Z";

  // const MOON_SVG_PATH =
  //   "M32.5,0c17.949,0-20.258,10.871-8.048,38.881S50.449,65,32.5,65a32.5,32.5,0,0,1,0-65Z";
  // themeSwitch.addEventListener("pointerover", () => {
  //   if (path.getAttribute("theme") === "dark") {
  //     path.setAttribute("d", SUN_SVG_PATH);
  //     path.setAttribute("theme", "light");
  //   } else {
  //     path.setAttribute("d", MOON_SVG_PATH);
  //     path.setAttribute("theme", "dark");
  //   }
  // });
}*/
}

export function addToCalendar() {
  const event = {
    title: "Meet with John",
    description: "My Event Description",
    location: "My Event Location",
    url: "",
    startDateTime: new Date("2023-03-10T12:00:00Z"),
    endDateTime: new Date("2023-03-10T13:00:00Z"),
  };

  const calendarLink = createCalendarLink(event);
  const link = document.createElement("a");
  link.href =
    "data:text/calendar;charset=utf-8," + encodeURIComponent(calendarLink);
  link.download = `meeting with John On ${event.startDateTime}.ics"`;
  link.click();
}

function createCalendarLink(event) {
  const startTime = formatDateTime(event.startDateTime);
  const endTime = formatDateTime(event.endDateTime);

  return `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
DTSTART:${startTime}
DTEND:${endTime}
END:VEVENT
END:VCALENDAR`;
}

function formatDateTime(date) {
  const year = date.getUTCFullYear();
  const month = padZero(date.getUTCMonth() + 1);
  const day = padZero(date.getUTCDate());
  const hour = padZero(date.getUTCHours());
  const minute = padZero(date.getUTCMinutes());
  const second = padZero(date.getUTCSeconds());

  return `${year}${month}${day}T${hour}${minute}${second}Z`;
}

function padZero(num) {
  return num.toString().padStart(2, "0");
}
