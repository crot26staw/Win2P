/* Страница Wintime — hero с покадровой прокруткой и круговая карусель подарков. */
(function () {
  "use strict";
  var isNear = window.W2P.isNear;

  /* ---------- hero: покадровая прокрутка ----------
     Исходник — mp4 2560×1440; перемотка по кадрам шла ~3 fps, поэтому ролик заранее
     разложен на 72 JPEG 1280×720 (assets/wintime-frames/). Все кадры предзагружаются,
     затем рисуются в <canvas> — скраб стоит один drawImage, держит 60 fps и никогда
     не спотыкается о декодирование. Пин высотой 300vh; позиция внутри него
     отображается в индекс кадра, значение каждый кадр подтягивается к цели. */
  var FRAME_COUNT = 72;
  // Блок «Роль токена» появляется снизу на 75% пина (margin-top −50vh у
  // .w2p-section--overhero при пине 300vh: 1 − 50/200). К кадру 55 (мишка отвернулся
  // влево) блок уже поднялся и заголовок виден внизу экрана — это P_SEEN. После этого
  // ролик гаснет, пока блок поднимается дальше.
  var BLOCK_IN = 0.75, FRAME_SEEN = 55, P_SEEN = 0.88, FADE_FROM = 0.88, FADE_LEN = 0.12;

  /* На мобильном блок «Модель начисления» наезжает на пин с 70% прокрутки, а ролик
     по исходной раскладке доигрывал до 100% — кадры продолжали меняться уже под
     содержимым секции, и последний кадр гас в черноту. Поэтому на узких экранах
     ролик укладывается в первые 60% пина, а дальше держится последний кадр:
     мишка остаётся стоять фоном за тарифами. */
  var mqMobile = window.matchMedia("(max-width: 767px)");

  function initVideoHero() {
    var wrap = document.querySelector(".w2p-vhero");
    if (!wrap) return;
    var canvas = wrap.querySelector(".w2p-vhero-canvas");
    var copy = wrap.querySelector(".w2p-vhero-copy");
    var note = wrap.querySelector(".w2p-vhero-note");
    var ctx = canvas.getContext("2d");
    var target = 0, current = 0, lastDrawn = -1;

    function fit() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
      lastDrawn = -1;
      draw(Math.round(current));
    }

    /* Первый кадр (или статичную картинку) показываем, как только декодируется ОН.
       Постер f000.jpg на пине нужен только до этого момента: если его оставить, то,
       когда ролик гаснет в конце, медведь проступает из постера за блоком «Роль токена». */
    function shown() {
      canvas.style.opacity = "1"; lastDrawn = -1; draw(Math.round(current));
      canvas.parentNode.style.backgroundImage = "none";
    }

    var frames = [];
    function loadFrames() {
      if (frames.length) return;
      for (var i = 0; i < FRAME_COUNT; i++) {
        var img = new Image();
        img.decoding = "sync";
        img.src = "assets/wintime-frames/f" + String(i).padStart(3, "0") + ".jpg";
        if (i === 0) { img.onload = shown; img.onerror = function () { canvas.style.opacity = "1"; }; }
        frames.push(img);
      }
    }

    /* Портретный планшет и мобильный: в кадрах ролика голова медведя срезана (крупный
       план), а в макете на 768/375 стоит отдельный статичный рендер с медведем целиком —
       рисуем его вместо ролика. Кадрирование снято с imageTransform макета: ширина
       картинки = ширина экрана / k, сдвиг влево = dx·ширина, низ — по низу экрана
       (768: k 0.5714, dx 0.162; 375: k 0.3166, dx 0.2677). Сверху остаётся тёмная полоса
       под текст. Альбомная ориентация остаётся на ролике. */
    var mqStill = window.matchMedia("(max-width: 1200px) and (orientation: portrait)");
    var still = null;
    function loadStill() {
      if (still) return;
      still = new Image();
      still.decoding = "sync";
      still.onload = shown;
      still.src = "assets/wintime-hero.webp";
    }
    function loadSource() { if (mqStill.matches) loadStill(); else loadFrames(); }

    function draw(idx) {
      if (mqStill.matches) {
        if (!still || !still.naturalWidth) return;
        var k = mqMobile.matches ? [0.3166, 0.2677] : [0.5714, 0.162];
        var sw = canvas.width / k[0], sh = sw * still.naturalHeight / still.naturalWidth;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(still, -k[1] * sw, canvas.height - sh, sw, sh);
        lastDrawn = idx;
        return;
      }
      var img = frames[idx];
      if (!img || !img.naturalWidth) return;
      var s = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      var w = img.naturalWidth * s, h = img.naturalHeight * s;
      ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
      lastDrawn = idx;
    }
    // Порог фона шапки (data-threshold) рассчитан на пин 300vh; без пина — обычный.
    var shell = document.querySelector(".w2p-header-fix");
    var threshold = shell && shell.getAttribute("data-threshold");
    function syncHeader() {
      if (!threshold) return;
      if (mqStill.matches) shell.removeAttribute("data-threshold");
      else shell.setAttribute("data-threshold", threshold);
    }
    loadSource(); syncHeader();
    mqStill.addEventListener("change", function () {
      loadSource(); syncHeader(); lastDrawn = -1; draw(Math.round(current));
    });

    function apply() {
      // Циклы rAF крутятся постоянно; если блок далеко за экраном — пропускаем кадр.
      // Портретные планшет/мобильный: hero — обычный блок без пина (css/site.css),
      // статичная картинка, текст не уезжает; второй блок просто идёт следом.
      if (mqStill.matches) {
        if (lastDrawn < 0) draw(0);
        canvas.style.opacity = 1;
        if (copy) { copy.style.transform = ""; copy.style.opacity = ""; }
        if (note) { note.style.transform = ""; note.style.opacity = ""; }
        return;
      }
      if (!isNear(wrap)) return;
      var span = wrap.offsetHeight - window.innerHeight;
      var p = Math.min(Math.max((window.scrollY - wrap.offsetTop) / Math.max(span, 1), 0), 1);
      var mobile = mqMobile.matches;
      // Доля пина, за которую ролик доигрывает: на десктопе и планшете подогнана
      // так, чтобы кадр FRAME_SEEN стоял на экране при P_SEEN.
      var runway = mobile ? 0.6 : P_SEEN * (FRAME_COUNT - 1) / FRAME_SEEN;
      target = Math.min(p / runway, 1) * (FRAME_COUNT - 1);
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.02) current = target;
      var idx = Math.round(current);
      if (idx !== lastDrawn) draw(idx);
      canvas.style.opacity = (mobile || p < FADE_FROM) ? 1 : Math.max(1 - (p - FADE_FROM) / FADE_LEN, 0);
      if (copy) {
        copy.style.transform = "translate3d(0, " + (-p * 150) + "%, 0)";
        copy.style.opacity = Math.max(1 - p * 1.8, 0);
      }
      if (note) {
        note.style.transform = "translate3d(0, " + (-p * 280) + "%, 0)";
        note.style.opacity = Math.max(1 - p * 2.1, 0);
      }
    }

    fit();
    window.addEventListener("resize", fit);
    (function tick() { apply(); requestAnimationFrame(tick); })();
    // rAF тормозится, когда кадр не отрисовывается; пассивный слушатель скролла
    // держит скраб верным и в этом случае.
    window.addEventListener("scroll", apply, { passive: true });
  }

  /* ---------- карусель подарков ----------
     Плитки едут по пологой дуге: главная стоит прямо, в полный размер и с подписью,
     соседи слева и справа — уменьшенные, повёрнутые по касательной и полупрозрачные.
     Раскладка соседей снята с макета (плитка 383, соседи 200×200 под 30° и 60°,
     прозрачность 0.5; на мобильном 289 и соседи 114 под 60° у краёв экрана) и задана
     в долях плитки, поэтому масштабируется вместе с ней. Кольцо замкнуто: перед первым
     подарком видны последние, как в макете. */
  // [|d| слотов от верха]: смещение x, y (доли плитки), поворот (°), масштаб, прозрачность
  var ORBIT_KEYS = [
    [0, 0, 0, 1, 1],
    [0.862, 0.253, 30, 0.522, 0.5],
    [1.274, 0.705, 60, 0.522, 0.5],
    [1.62, 1.25, 90, 0.522, 0]
  ];
  var ORBIT_KEYS_MOBILE = [
    [0, 0, 0, 1, 1],
    [0.964, 0.343, 60, 0.394, 0.5],
    [1.5, 0.9, 90, 0.394, 0]
  ];

  function orbitPose(keys, ad) {
    var last = keys.length - 1;
    if (ad >= last) return keys[last];
    var k = Math.floor(ad), t = ad - k, a = keys[k], b = keys[k + 1], out = [];
    for (var j = 0; j < 5; j++) out.push(a[j] + (b[j] - a[j]) * t);
    return out;
  }

  function initGiftOrbit() {
    var wrap = document.querySelector(".w2p-gifts");
    if (!wrap) return;
    var items = Array.prototype.slice.call(wrap.querySelectorAll(".w2p-orbit-item"));
    var caption = wrap.querySelector(".w2p-orbit-caption");
    var title = wrap.querySelector(".w2p-gifts-title");
    var N = items.length;
    if (!N) return;
    var progress = 0, shown = -1;

    // Плитка стоит сразу под заголовком (в макете без зазора), а число строк заголовка
    // зависит от ширины — поэтому низ заголовка меряем, а не считаем в CSS.
    function measure() {
      if (title) wrap.style.setProperty("--gt-bottom", (title.offsetTop + title.offsetHeight) + "px");
    }
    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);

    // Пагинация (планшет и мобильный): по точке на подарок, активная — та плитка,
    // что сейчас на верху кольца. Клик прокручивает к её слоту.
    var dotsWrap = wrap.querySelector(".w2p-orbit-dots");
    var dots = [];
    if (dotsWrap) {
      items.forEach(function (it, i) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "w2p-orbit-dot";
        b.setAttribute("aria-label", it.dataset.title || String(i + 1));
        b.addEventListener("click", function () {
          var span = wrap.offsetHeight - window.innerHeight;
          var top = wrap.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: top + span * i / Math.max(N - 1, 1), behavior: "smooth" });
        });
        dotsWrap.appendChild(b);
        dots.push(b);
      });
    }

    function apply() {
      // Циклы rAF крутятся постоянно; если блок далеко за экраном — пропускаем кадр.
      if (!isNear(wrap)) return;
      var span = wrap.offsetHeight - window.innerHeight;
      var p = Math.min(Math.max((window.scrollY - wrap.offsetTop) / Math.max(span, 1), 0), 1);
      // Задержка: каждая плитка держит верх кольца бо́льшую часть своего слота и потом
      // быстро передаёт эстафету, поэтому всегда есть главный подарок, а не вечное
      // промежуточное состояние.
      var raw = p * (N - 1);
      var slot = Math.floor(raw);
      var f = raw - slot;
      var k = Math.min(Math.max((f - 0.34) / 0.42, 0), 1);
      var targetProgress = slot + k * k * (3 - 2 * k);
      progress += (targetProgress - progress) * 0.13;

      var keys = mqMobile.matches ? ORBIT_KEYS_MOBILE : ORBIT_KEYS;
      var T = items[0].offsetWidth;
      var best = 0, bestD = 99;
      for (var i = 0; i < N; i++) {
        var d = i - progress;                       // слотов от верха кольца
        d = ((d + N / 2) % N + N) % N - N / 2;      // кольцо замкнуто
        var ad = Math.abs(d), sg = d < 0 ? -1 : 1;
        if (ad < bestD) { bestD = ad; best = i; }
        var pose = orbitPose(keys, ad);
        var node = items[i];
        node.style.transform = "translate3d(calc(-50% + " + (sg * pose[0] * T) + "px), calc(-50% + "
          + (pose[1] * T) + "px), 0) rotate(" + (sg * pose[2]) + "deg) scale(" + pose[3] + ")";
        node.style.opacity = String(pose[4]);
        node.style.zIndex = String(100 - Math.round(ad * 10));
      }
      if (best !== shown) {
        shown = best;
        caption.textContent = items[best].dataset.title || "";
        dots.forEach(function (d, j) {
          d.classList.toggle("is-active", j === best);
          if (j === best) d.setAttribute("aria-current", "true"); else d.removeAttribute("aria-current");
        });
      }
      // Подпись принадлежит плитке на верху кольца: гаснет, пока кольцо в движении,
      // и проявляется уже на следующем подарке.
      caption.style.opacity = String(Math.max(0, 1 - bestD * 2.6));
    }

    // Высота пина: по одному экрану с запасом на подарок.
    wrap.style.height = (N * 90 + 100) + "vh";
    (function tick() { apply(); requestAnimationFrame(tick); })();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
  }

  initVideoHero();
  initGiftOrbit();
})();
