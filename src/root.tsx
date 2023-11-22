import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import "@fontsource/nunito-sans/300.css";
import "@fontsource/nunito-sans/600.css";
import "@fontsource/nunito-sans/800.css";

import "./global.css";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
        <script
          dangerouslySetInnerHTML={`
        (function() {

if (
  window.matchMedia("(prefers-color-scheme: dark)").matches &&
  localStorage.getItem("theme") === undefined
) {
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
} else {
  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
})();
window.addEventListener('load', function() {
        }
        );
        `}
        ></script>
      </head>
      <body
        lang="en"
        class="-z-30 bg-light-gray font-nunito dark:bg-very-dark-blue  dark:text-[white]"
      >
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
