/* Страница WinZu — масштаб фиксированной сетки 1440 (как на лицензиях и стейкинге).
   Остальное поведение (появление блоков, шапка, язык) — в common.js, hover карточек — в CSS. */
(function () {
  "use strict";
  var root = document.querySelector(".wz");
  if (!root) return;
  function fit() {
    var w = document.documentElement.clientWidth;
    // рост ограничен 1.333, чтобы на 2560 композиция не раздувалась
    root.style.setProperty("--wz-zoom", String(w >= 1200 ? Math.min(w / 1440, 1.3333) : 1));
  }
  fit();
  window.addEventListener("resize", fit);
})();
