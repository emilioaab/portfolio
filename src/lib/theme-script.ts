/**
 * Runs before hydration to set data-theme synchronously, avoiding a
 * flash of the wrong theme. Kept as a plain string (not JSON.stringify'd
 * user input) so it's safe to inline via dangerouslySetInnerHTML.
 */
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme =
      stored === "light" || stored === "dark"
        ? stored
        : window.matchMedia("(prefers-color-scheme: light)").matches
          ? "light"
          : "dark";
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;
