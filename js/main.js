/* Главная страница — диск hero.
   При скролле диск ужимается до 55%, и чернота следующей секции его «проглатывает».
   Масштаб ставится в requestAnimationFrame из пассивного слушателя скролла. */
(function () {
  "use strict";
  var disc = document.querySelector(".w2p-hero-disc");
  if (!disc) return;
  // Высота hero меряется один раз на кадр размера, а не на каждый скролл: иначе
  // чтение offsetHeight заставляло бы браузер пересчитывать вёрстку при прокрутке.
  var heroH = 1;
  function measure() { heroH = disc.parentElement.offsetHeight || 1; apply(); }
  function apply() {
    var t = Math.min(Math.max((window.scrollY || 0) / heroH, 0), 1);
    disc.style.transform = "translateX(-50%) scale(" + (1 - t * 0.45) + ")";
  }
  measure();
  window.addEventListener("scroll", apply, { passive: true });
  window.addEventListener("resize", measure);
})();
