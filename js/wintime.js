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

    var frames = [];
    for (var i = 0; i < FRAME_COUNT; i++) {
      var img = new Image();
      img.decoding = "sync";
      img.src = "assets/wintime-frames/f" + String(i).padStart(3, "0") + ".jpg";
      // Первый кадр показываем, как только декодируется ОН: ожидание всех 72 оставляло
      // hero пустым до первого скролла. Остальные догружаются позади скраба.
      if (i === 0) {
        img.onload = function () { canvas.style.opacity = "1"; draw(0); };
        img.onerror = function () { canvas.style.opacity = "1"; };
      }
      frames.push(img);
    }

    function draw(idx) {
      var img = frames[idx];
      if (!img || !img.naturalWidth) return;
      var s = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      var w = img.naturalWidth * s, h = img.naturalHeight * s;
      ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
      lastDrawn = idx;
    }

    function apply() {
      // Циклы rAF крутятся постоянно; если блок далеко за экраном — пропускаем кадр.
      if (!isNear(wrap)) return;
      var span = wrap.offsetHeight - window.innerHeight;
      var p = Math.min(Math.max((window.scrollY - wrap.offsetTop) / Math.max(span, 1), 0), 1);
      var mobile = mqMobile.matches;
      // Доля пина, за которую ролик успевает доиграть.
      var runway = mobile ? 0.6 : 1;
      target = Math.min(p / runway, 1) * (FRAME_COUNT - 1);
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.02) current = target;
      var idx = Math.round(current);
      if (idx !== lastDrawn) draw(idx);
      // Блок модели начисления наезжает на пин примерно с 74%, поэтому к его приходу
      // ролик уже погашен — секция появляется раньше, чем закончится клип.
      canvas.style.opacity = (mobile || p < 0.7) ? 1 : Math.max(1 - (p - 0.7) / 0.22, 0);
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
     Плитки едут по периметру одной очень большой окружности, центр которой лежит
     сильно ниже вьюпорта, поэтому дуга в видимой полосе пологая — именно это выносит
     соседние плитки влево и вправо от главной карточки, а не наверх. Скролл вращает
     кольцо; та плитка, что доходит до верха окружности, стоит прямо, в полный размер
     и с подписью. Остальные уменьшаются, наклоняются по касательной и гаснут.
     Угловой шаг 24°, как в макете. */
  var STEP = 24 * Math.PI / 180;

  function initGiftOrbit() {
    var wrap = document.querySelector(".w2p-gifts");
    if (!wrap) return;
    var items = Array.prototype.slice.call(wrap.querySelectorAll(".w2p-orbit-item"));
    var caption = wrap.querySelector(".w2p-orbit-caption");
    var N = items.length;
    if (!N) return;
    var progress = 0, shown = -1;

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

      var vh = window.innerHeight, vw = window.innerWidth;
      var R = Math.max(vh, vw * 0.52) * 1.06;
      var best = 0, bestD = 99;
      for (var i = 0; i < N; i++) {
        var d = i - progress;                       // слотов от верха кольца
        var ad = Math.abs(d);
        if (ad < bestD) { bestD = ad; best = i; }
        var angle = d * STEP;                       // 0 = верх окружности
        var x = Math.sin(angle) * R;
        var y = R - Math.cos(angle) * R;            // уход вниз от верхней точки дуги
        var scale = 1 / (1 + 0.88 * ad);
        var opacity = ad <= 1 ? 1 - 0.2 * ad : Math.max(0, 0.8 - (ad - 1) * 0.3);
        var node = items[i];
        node.style.transform = "translate3d(calc(-50% + " + x + "px), calc(-50% + " + y + "px), 0) rotate("
          + (angle * 0.8) + "rad) scale(" + scale + ")";
        node.style.opacity = String(opacity);
        node.style.zIndex = String(100 - Math.round(ad * 10));
      }
      if (best !== shown) { shown = best; caption.textContent = items[best].dataset.title || ""; }
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
