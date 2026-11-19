/* Страница Win-2.pro — лента «Всё для создания контента».
   ≥1200: секция закреплена, прокрутка листает ленту по одной карточке (4 положения:
   6 карточек, 3 целиком в кадре 902 px), полоска прогресса = положение / 4.
   <1200: с классом .cf-tools--scroll (Win-2.pro) — так же по прокрутке, шаг и число
   карточек в кадре считаются от ширины экрана; без него (AI Panda, Habibi) — нативный
   свайп со снапом, полоска показывает долю пройденной ленты. */
(function () {
  "use strict";
  var sec = document.querySelector(".cf-tools");
  if (!sec) return;
  var desktop = window.matchMedia("(min-width: 1200px)");
  var view = sec.querySelector(".cf-tools-view");
  var track = sec.querySelector(".cf-tools-track");
  var cards = track.children;
  var bar = sec.querySelector(".cf-progress i");
  var scrollAll = sec.classList.contains("cf-tools--scroll");
  var VISIBLE = 3, STOPS = cards.length - VISIBLE + 1;
  var last = -1;

  function pinned() { return desktop.matches || scrollAll; }

  // Ниже 1200 (режим прокрутки): шаг = карточка + зазор, в кадре — сколько влезает целиком.
  // Высота секции — экран плюс пробег на каждое положение.
  function measure() {
    if (desktop.matches) {
      VISIBLE = 3;
      track.style.removeProperty("--cf-step");
      if (scrollAll) sec.style.height = "";
    } else if (scrollAll) {
      var cs = getComputedStyle(view);
      var inner = view.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      var gap = parseFloat(getComputedStyle(track).columnGap) || 12;
      var step = cards[0].offsetWidth + gap;
      VISIBLE = Math.max(1, Math.floor((inner + gap + 1) / step));
      track.style.setProperty("--cf-step", step + "px");
    }
    STOPS = Math.max(1, cards.length - VISIBLE + 1);
    if (scrollAll && !desktop.matches) sec.style.height = "calc(100vh + " + (STOPS * 45) + "vh)";
  }

  function setStop(i) {
    if (i === last) return;
    last = i;
    track.style.setProperty("--cf-i", String(i));
    bar.style.width = ((i + 1) / STOPS * 100) + "%";
    for (var k = 0; k < cards.length; k++) {
      cards[k].classList.toggle("is-out", k < i);
      cards[k].classList.toggle("is-next", k === i + VISIBLE);
      cards[k].classList.toggle("is-far", k > i + VISIBLE);
    }
  }

  function onDesktop() {
    var r = sec.getBoundingClientRect();
    var pin = sec.firstElementChild.getBoundingClientRect();
    var span = r.height - pin.height;
    var p = span > 0 ? Math.min(Math.max(-r.top / span, 0), 1) : 0;
    // последние 15% пробега держат финальное положение на экране
    setStop(Math.min(STOPS - 1, Math.floor(Math.min(p / 0.85, 0.9999) * STOPS)));
  }

  function onSwipe() {
    var max = view.scrollWidth - view.clientWidth;
    var share = view.clientWidth / view.scrollWidth;
    var p = max > 0 ? view.scrollLeft / max : 1;
    bar.style.width = ((share + (1 - share) * p) * 100) + "%";
  }

  var queued = false;
  function update() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () {
      queued = false;
      if (pinned()) onDesktop(); else onSwipe();
    });
  }

  function reset() {
    last = -1;
    measure();
    if (pinned()) { view.scrollLeft = 0; onDesktop(); return; }
    track.style.removeProperty("--cf-i");
    for (var k = 0; k < cards.length; k++) cards[k].classList.remove("is-out", "is-next", "is-far");
    onSwipe();
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", scrollAll ? reset : update);
  view.addEventListener("scroll", update, { passive: true });
  desktop.addEventListener("change", reset);
  reset();
})();

/* Каналы публикации: заголовок закреплён по центру экрана, пока секция прокручивается,
   а плитки уезжают вверх мимо него — каждая со своей скоростью (лёгкий параллакс).
   top для sticky считается здесь: на ≥1200 корень .wz под zoom, и CSS-проценты/vh
   поехали бы. */
(function () {
  "use strict";
  var sec = document.querySelector(".cf-ch");
  if (!sec) return;
  var title = sec.querySelector(".cf-ch-title");
  var items = sec.querySelectorAll(".cf-ch-item");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  // Доля дополнительного сдвига вверх относительно прокрутки (порядок как в разметке:
  // TG, VK, YT, IG, Дзен, TikTok, OK). Верхние плитки быстрее нижних — так они
  // расходятся, а не наезжают друг на друга.
  var SPEED = [0.26, 0.3, 0.24, 0.18, 0.12, 0.14, 0.08];

  var pinTop = 0;
  function zoom() {
    // zoom висит на корне .wz, у самой секции computed zoom = 1
    var root = sec.closest(".wz") || sec;
    var z = parseFloat(getComputedStyle(root).zoom);
    return z > 0 ? z : 1;
  }
  function pin() {
    var z = zoom();
    var h = title.getBoundingClientRect().height;
    pinTop = Math.max(0, (window.innerHeight - h) / 2 / z);
    title.style.top = pinTop + "px";
  }
  function move() {
    if (reduce.matches) {
      for (var k = 0; k < items.length; k++) items[k].style.transform = "";
      return;
    }
    // Пока заголовок не закрепился, плитки стоят как в макете; сдвиг копится только
    // с момента, когда заголовок встал по центру (его верх в потоке дошёл до pinTop).
    var z = zoom();
    // offsetTop у sticky отдаёт уже «прилипшее» положение, поэтому берём отступ из CSS
    var natural = (sec.getBoundingClientRect().top / z) + (parseFloat(getComputedStyle(title).marginTop) || 0);
    var passed = pinTop - natural;
    for (var i = 0; i < items.length; i++) {
      var dy = -Math.max(0, passed) * SPEED[i % SPEED.length];
      items[i].style.transform = "translate3d(0," + dy.toFixed(1) + "px,0)";
    }
  }

  var queued = false;
  function update() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; move(); });
  }
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", function () { pin(); update(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(pin);
  pin();
  move();
})();
