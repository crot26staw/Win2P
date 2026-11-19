/* Страница Pando — дуга «Всё для разговора и совместной работы».
   Работает так же, как карусель подарков на странице WinTime: блок закреплён,
   и прокрутка плавно ведёт плитки по дуге (на всех ширинах). Главная плитка
   стоит сверху, прямо и в полный размер, с подписью; соседи уменьшены, наклонены
   по касательной и полупрозрачны. Кольцо замкнуто: плитка уходит за край дуги
   прозрачной и выходит с другой стороны, а не пролетает через весь экран.
   Точки, клик по соседней плитке и свайп прокручивают страницу к нужному слоту. */
(function () {
  "use strict";
  var sec = document.querySelector(".pd-calls");
  if (!sec) return;
  var ring = sec.querySelector(".pd-ring");
  var tiles = Array.prototype.slice.call(ring.querySelectorAll(".pd-tile"));
  var caps = tiles.map(function (t) { return t.querySelector("figcaption"); });
  var dotsWrap = sec.querySelector(".pd-dots");
  var N = tiles.length;
  if (!N) return;

  var mqMobile = window.matchMedia("(max-width: 767px)");
  var isNear = (window.W2P && window.W2P.isNear) || function () { return true; };

  // [|d| слотов от верха]: смещение x, y (доли плитки), поворот (°), масштаб, прозрачность.
  // Десктоп снят с макета (плитка 383, соседи 200×200 на 330/97 и 488/270 под 30° и 60°),
  // мобильный — та же раскладка, что у подарков WinTime.
  var KEYS = [
    [0, 0, 0, 1, 1],
    [0.862, 0.253, 30, 0.522, 0.5],
    [1.274, 0.705, 60, 0.522, 0.5],
    [1.62, 1.25, 90, 0.522, 0]
  ];
  var KEYS_MOBILE = [
    [0, 0, 0, 1, 1],
    [0.964, 0.343, 60, 0.394, 0.5],
    [1.5, 0.9, 90, 0.394, 0]
  ];

  function pose(keys, ad) {
    var last = keys.length - 1;
    if (ad >= last) return keys[last];
    var k = Math.floor(ad), t = ad - k, a = keys[k], b = keys[k + 1], out = [];
    for (var j = 0; j < 5; j++) out.push(a[j] + (b[j] - a[j]) * t);
    return out;
  }

  // Прокрутка страницы к слоту i (верх кольца — плитка i).
  function scrollToSlot(i) {
    var span = sec.offsetHeight - sec.firstElementChild.offsetHeight;
    var r = sec.getBoundingClientRect();
    var kz = sec.offsetHeight ? r.height / sec.offsetHeight : 1;   // zoom корня .wz на десктопе
    var top = r.top + window.scrollY;
    window.scrollTo({ top: top + span * kz * i / Math.max(N - 1, 1), behavior: "smooth" });
  }

  var dots = [];
  tiles.forEach(function (tile, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-label", String(i + 1));
    b.addEventListener("click", function () { scrollToSlot(i); });
    dotsWrap.appendChild(b);
    dots.push(b);
    tile.addEventListener("click", function () {
      if (swiped || i === shown) return;
      scrollToSlot(i);
    });
  });

  var progress = 0, shown = -1;

  function targetProgress() {
    var r = sec.getBoundingClientRect();
    var pin = sec.firstElementChild.getBoundingClientRect();
    var span = r.height - pin.height;
    var p = span > 0 ? Math.min(Math.max(-r.top / span, 0), 1) : 0;
    // Как у подарков WinTime: плитка держит верх кольца бо́льшую часть своего слота
    // и быстро передаёт эстафету — всегда есть главная плитка.
    var raw = p * (N - 1);
    var slot = Math.floor(raw);
    var f = raw - slot;
    var k = Math.min(Math.max((f - 0.34) / 0.42, 0), 1);
    return slot + k * k * (3 - 2 * k);
  }

  function apply() {
    if (!isNear(sec)) return;
    progress += (targetProgress() - progress) * 0.13;

    var keys = mqMobile.matches ? KEYS_MOBILE : KEYS;
    var T = tiles[0].offsetWidth;
    var best = 0, bestD = 99;
    for (var i = 0; i < N; i++) {
      var d = i - progress;
      d = ((d + N / 2) % N + N) % N - N / 2;        // кольцо замкнуто
      var ad = Math.abs(d), sg = d < 0 ? -1 : 1;
      if (ad < bestD) { bestD = ad; best = i; }
      var ps = pose(keys, ad);
      var t = tiles[i];
      t.style.transform = "translate3d(" + (sg * ps[0] * T) + "px," + (ps[1] * T) + "px,0) rotate("
        + (sg * ps[2]) + "deg) scale(" + ps[3] + ")";
      t.style.opacity = String(ps[4]);
      t.style.zIndex = String(100 - Math.round(ad * 10));
      // подпись гаснет, пока плитка уходит с верха кольца
      if (caps[i]) caps[i].style.opacity = String(Math.max(0, 1 - ad * 2.6));
    }
    if (best !== shown) {
      shown = best;
      for (var j = 0; j < N; j++) {
        tiles[j].classList.toggle("is-active", j === best);
        tiles[j].setAttribute("aria-hidden", j === best ? "false" : "true");
        dots[j].setAttribute("aria-selected", j === best ? "true" : "false");
      }
    }
  }

  /* ---------- свайп: листает к соседнему слоту ---------- */
  var startX = null, startY = 0, swiped = false;
  ring.addEventListener("pointerdown", function (e) {
    startX = e.clientX; startY = e.clientY; swiped = false;
  });
  ring.addEventListener("pointerup", function (e) {
    if (startX === null) return;
    var dx = e.clientX - startX, dy = e.clientY - startY;
    startX = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      swiped = true;
      setTimeout(function () { swiped = false; }, 0);
      scrollToSlot(Math.min(Math.max(shown + (dx < 0 ? 1 : -1), 0), N - 1));
    }
  });
  ring.addEventListener("pointercancel", function () { startX = null; });

  progress = targetProgress();
  (function tick() { apply(); requestAnimationFrame(tick); })();
  // rAF тормозится, когда кадр не отрисовывается — скролл держит кольцо верным
  window.addEventListener("scroll", apply, { passive: true });
  window.addEventListener("resize", apply);
})();
