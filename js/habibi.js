/* Страница Habibi Pay — карта в блоке «Одна карта для разных платежей».
   Повторяет 3D-карту с habibi-pay.com: там плоская модель в three.js поворачивается
   из положения «лежит, наклонена назад на 0.35π» в фас и растёт в 1.4 раза за первые 200 px
   прокрутки, сглаживая движение пружиной. Здесь то же самое делает CSS 3D: прогресс
   считается от положения карты в окне (верх на 85% высоты → центр на середине окна),
   сглаживается затуханием и уходит в переменную --hb-p (0 — лежит, 1 — в фас). */
(function () {
  "use strict";
  var card = document.querySelector(".hb-card");
  if (!card) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // остаётся в фас

  var target = 0, current = 0, running = false;

  function measure() {
    var r = card.getBoundingClientRect();
    var vh = window.innerHeight;
    if (!r.height) return;                       // скрыта (мобильный) — считать нечего
    // старт — когда над нижним краем окна видна верхняя полоска карты (верх на 85% высоты),
    // финиш — центр карты на середине окна
    var start = vh * 0.85;
    var end = vh * 0.5 - r.height / 2;
    var p = (start - r.top) / Math.max(start - end, 1);
    target = Math.min(Math.max(p, 0), 1);
    if (!running) { running = true; requestAnimationFrame(tick); }
  }

  function tick() {
    // затухание вместо пружины three.js: тот же «мягкий доезд» без перелёта
    current += (target - current) * 0.12;
    if (Math.abs(target - current) < 0.001) current = target;
    card.style.setProperty("--hb-p", current.toFixed(4));
    if (current !== target) requestAnimationFrame(tick); else running = false;
  }

  card.style.setProperty("--hb-p", "0");
  window.addEventListener("scroll", measure, { passive: true });
  window.addEventListener("resize", measure);
  measure();
})();
