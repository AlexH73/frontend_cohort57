fetch("./js/index.js")
  .then((res) => res.text())
  .then((text) => {
    // Экранируем спецсимволы для HTML
    const escaped = text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    document.getElementById(
      "code-block"
    ).innerHTML = `<code>${escaped}</code>`;
  });