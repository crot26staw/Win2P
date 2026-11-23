/* Страницы Lite / Pro License — масштабирование сетки 1440, параллакс hero и
   четыре блока, управляемые скроллом. */
(function () {
  "use strict";
  var root = document.querySelector(".lic");
  if (!root) return;
  var reduceMotion = window.W2P && window.W2P.reduceMotion;
  // Циклы rAF крутятся постоянно; если блок далеко за экраном — пропускаем кадр.
  var isNear = window.W2P.isNear;

  /* ---------- масштаб фиксированной сетки ----------
     Страница нарисована на жёсткой сетке 1440 и масштабируется целиком. Коэффициент
     должен быть безразмерным числом, а CSS не умеет вычислить его из 100vw, поэтому
     он считается здесь и читается обратно как zoom: var(--lic-zoom). */
  function fit() {
    var w = document.documentElement.clientWidth;
    // Рост ограничен так же, как лестница clamp() на главной и Wintime: после ~1920
    // композиция перестаёт раздуваться и страница просто центрируется, чтобы на
    // экране 2560 не было текста в 1.8×.
    var z = w >= 1200 ? Math.min(w / 1440, 1.3333) : 1;
    root.style.setProperty("--lic-zoom", String(z));
    // Сцена высотой 974 должна поместиться в пин 100vh, иначе нижний ряд обрежется;
    // недостача растёт вместе с зумом страницы, поэтому оба учтены.
    // Оставляем место под фиксированную шапку плюс воздух, затем делим на зум
    // страницы, чтобы сцена мерялась в тех же единицах, в которых рисуется.
    var avail = (window.innerHeight - 24 - 16) / z;
    // В Lite уровни сидят в панели под иллюстрацией, и сцена кончается ниже (~956 − 60).
    var need = root.querySelector(".lic-split-pin--net") ? 900 : 846;
    root.style.setProperty("--lic-fit", String(Math.min(1, avail / need)));
    // Планшет: блок «Куда идут» закреплён, как на десктопе. Если окно ниже
    // блока, он прилипает с отрицательным отступом, чтобы низ панели сети
    // оставался на экране. На телефоне блок не закреплён.
    var splitInner = root.querySelector(".lic-split-pin .lic-pin-inner");
    if (splitInner) {
      var stick = 0;
      if (w >= 768 && w < 1200) stick = Math.min(0, window.innerHeight - splitInner.offsetHeight);
      splitInner.style.setProperty("--lic-stick", stick + "px");
    }
    // Планшет: дерево перелива — десктопная схема 990 px, ужатая до ширины колонки.
    var treeSec = root.querySelector(".lic-tree-sec");
    if (treeSec && w >= 768 && w < 1200) {
      var cs = getComputedStyle(treeSec);
      var inner = treeSec.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      treeSec.style.setProperty("--lic-tree-z", String(Math.min(1, inner / 990)));
    }
  }
  fit();
  window.addEventListener("load", fit);
  window.addEventListener("resize", fit);

  /* Прогресс прокрутки внутри закреплённой секции: 0, когда её верх дошёл до верха
     вьюпорта, 1 — когда достигнут последний экран.
     Ниже 1200 закрепления нет и секция может быть короче экрана — тогда запаса
     прокрутки внутри неё не остаётся, прогресс прыгал бы сразу в единицу. В этом
     случае считаем его по проходу блока через вьюпорт, и сцена отыгрывается так же
     плавно, как на десктопе. */
  function progressOf(el) {
    var r = el.getBoundingClientRect();
    var vh = window.innerHeight;
    var span = r.height - vh;
    if (span > 40) return Math.min(Math.max(-r.top / span, 0), 1);
    // Блок короче экрана: отсчёт от момента, когда его верх заходит снизу, до
    // момента, когда блок встал по центру экрана. Раньше единица достигалась
    // только после того, как блок целиком уехал вверх, и сцена доигрывала уже
    // за пределами видимости.
    return Math.min(Math.max((vh - r.top) / ((vh + r.height) / 2), 0), 1);
  }

  /* ---------- 1. параллакс плашек за героем ---------- */
  (function heroParallax() {
    var layer = root.querySelector(".lic-hero-objects");
    if (!layer || reduceMotion) return;
    var tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener("pointermove", function (e) {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });
    (function tick() {
      if (!isNear(layer)) { requestAnimationFrame(tick); return; }
      cx += (tx - cx) * 0.11; cy += (ty - cy) * 0.11;
      var nodes = layer.children;
      for (var i = 0; i < nodes.length; i++) {
        var d = Number(nodes[i].dataset.depth);
        if (!d) continue;
        nodes[i].style.transform = "translate3d(" + (-cx * 78 * d).toFixed(2) + "px, "
          + (-cy * 50 * d).toFixed(2) + "px, 0)";
      }
      requestAnimationFrame(tick);
    })();
  })();

  /* ---------- 2. куда идёт взнос: 7 шагов по скроллу ---------- */
  /* rAF тормозится, пока кадр не рисуется; пассивный слушатель скролла страхует
     обе скролл-сцены, как это уже сделано на странице Wintime. */
  var scrollHooks = [];

  /* Запуск один раз, когда блок появился на экране. IntersectionObserver — основной
     путь, проверка по скроллу — страховка: в фоновой вкладке наблюдатель молчит, и
     без неё анимация не стартовала бы даже после возврата к блоку. */
  function whenVisible(el, ratio, run) {
    var started = false;
    function start() {
      if (started) return;
      started = true;
      run();
    }
    function inView() {
      var r = el.getBoundingClientRect();
      var vh = window.innerHeight;
      var shown = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      return shown > 0 && shown >= Math.min(r.height, vh) * ratio;
    }
    if (typeof IntersectionObserver !== "undefined") {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { io.disconnect(); start(); }
      }, { threshold: ratio });
      io.observe(el);
    }
    scrollHooks.push(function () { if (!started && inView()) start(); });
    if (inView()) start();
  }
  window.addEventListener("scroll", function () {
    for (var i = 0; i < scrollHooks.length; i++) scrollHooks[i]();
  }, { passive: true });

  (function splitSection() {
    var pin = root.querySelector(".lic-split-pin");
    if (!pin) return;
    var art = pin.querySelectorAll(".lic-levelart img");
    var partners = pin.querySelectorAll(".lic-partner");
    var chain = pin.querySelector(".lic-net-chain");
    var last = -1;
    var mqPhone = window.matchMedia("(max-width: 767px)");
    // Телефон: блок не закреплён, уровень = партнёр, до которого долистали ленту
    // свайпом (горизонтальный скролл не зависит от прокрутки страницы).
    // Планшет и десктоп: уровень по прокрутке закреплённого пина.
    function currentStep() {
      if (chain && mqPhone.matches) {
        if (partners.length < 2) return 1;
        // Последний уровень активен у правого края, даже если не дошёл до точки привязки.
        var maxScroll = chain.scrollWidth - chain.clientWidth;
        if (maxScroll > 0 && chain.scrollLeft >= maxScroll - 1) return partners.length;
        var stride = partners[1].offsetLeft - partners[0].offsetLeft;
        return Math.round(chain.scrollLeft / (stride || 1)) + 1;
      }
      return Math.floor(progressOf(pin) * 7) + 1;
    }
    function apply() {
      var step = Math.min(7, Math.max(1, currentStep()));
      if (step === last) return;
      last = step;
      for (var i = 0; i < art.length; i++) art[i].classList.toggle("is-on", i + 1 === step);
      for (var j = 0; j < partners.length; j++) partners[j].classList.toggle("is-on", j < step);
      // Планшет: оранжевая нить ленты дорастает до текущего уровня через --lic-step.
      if (chain) chain.style.setProperty("--lic-step", String(step - 1));
    }
    (function tick() {
      if (isNear(pin)) apply();
      requestAnimationFrame(tick);
    })();
    scrollHooks.push(apply);
    if (chain) chain.addEventListener("scroll", apply, { passive: true });
    mqPhone.addEventListener && mqPhone.addEventListener("change", function () { last = -1; apply(); });
  })();

  /* ---------- 3. график дохода ---------- */
  /* «$126 952.5» — пробел в разрядах, точка в дробной части, без хвостового .0.
     Написано руками, а не через toLocaleString, который в ru-RU даёт запятую. */
  function money(n) {
    var fixed = Math.round(n * 10) / 10;
    var parts = String(fixed).split(".");
    return "$" + parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (parts[1] ? "." + parts[1] : "");
  }
  function count(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }

  (function graphSection() {
    var pin = root.querySelector(".lic-graph-pin");
    if (!pin) return;
    var stats = pin.querySelector(".lic-graph-stats");
    var income = JSON.parse(stats.dataset.income);
    var people = JSON.parse(stats.dataset.people);
    var elLevel = stats.querySelector("[data-stat='level'] .num");
    var elMoney = stats.querySelector("[data-stat='money'] .num");
    var elPeople = stats.querySelector("[data-stat='people'] .num");
    var final = pin.querySelector(".lic-final");
    var line = pin.querySelector(".lic-graph-line");
    var path = line && line.querySelector("path");
    var len = path ? path.getTotalLength() : 0;
    if (path) { line.style.strokeDasharray = len; line.style.strokeDashoffset = len; line.style.visibility = "visible"; }
    var lastStep = -1, lastDone = null;

    // Доля прокрутки, за которую отыгрывается сцена. На закреплённом десктопном
    // пине запас большой, на узких экранах его нет — там сцена должна успеть
    // закончиться, пока блок ещё на экране.
    function runway() {
      return pin.offsetHeight - window.innerHeight > 40 ? 0.62 : 0.8;
    }
    function apply() {
      var p = progressOf(pin);
      var RUNWAY = runway();
      var step = Math.min(7, Math.max(1, Math.floor(p / RUNWAY * 7) + 1));
      var done = p > RUNWAY + 0.06;
      if (step !== lastStep) {
        lastStep = step;
        elLevel.textContent = String(step);
        elMoney.textContent = money(income[step - 1]);
        elPeople.textContent = count(people[step - 1]);
      }
      if (done !== lastDone) {
        lastDone = done;
        final.classList.toggle("is-on", done);
        var cells = stats.querySelectorAll(".lic-stat");
        for (var i = 0; i < cells.length; i++) cells[i].style.opacity = done ? 0 : 1;
      }
      // Линия прочерчивается от левого нижнего угла к правому верхнему, пока блок
      // заезжает на экран, и к первому шагу уже целая — в макете она полная на всех шагах.
      if (path) {
        var r = pin.getBoundingClientRect();
        var vh = window.innerHeight;
        var enter = Math.min(Math.max((vh - r.top) / (vh * 0.85), 0), 1);
        line.style.strokeDashoffset = String(len * (1 - enter));
      }
    }
    (function tick() {
      if (isNear(pin)) apply();
      requestAnimationFrame(tick);
    })();
    scrollHooks.push(apply);
  })();

  /* ---------- 4. бонус за 72 часа ----------
     Сначала заполняется первая карточка 1→100%, затем вторая, затем прилетают три
     карточки пака. */
  (function bonusSection() {
    var host = root.querySelector(".lic-bonus-sec");
    if (!host) return;
    var cards = host.querySelectorAll(".lic-line-card");
    var packs = host.querySelectorAll(".lic-bonus-card");

    function reveal(i, then) {
      cards[i].classList.add("is-on");
      var fill = cards[i].querySelector(".fill");
      var pct = cards[i].querySelector(".pct");
      if (reduceMotion) { fill.style.width = "100%"; pct.textContent = "100%"; then(); return; }
      var t0 = performance.now();
      (function step() {
        var k = Math.min((performance.now() - t0) / 1100, 1);
        fill.style.width = (k * 100) + "%";
        pct.textContent = Math.round(k * 99) + (k > 0 ? 1 : 0) + "%";
        if (k < 1) requestAnimationFrame(step); else then();
      })();
    }
    function showPacks() {
      for (var i = 0; i < packs.length; i++) {
        packs[i].style.transitionDelay = (i * 110) + "ms";
        packs[i].classList.add("is-on");
      }
    }
    whenVisible(host, 0.3, function () {
      setTimeout(function () {
        reveal(0, function () { setTimeout(function () { reveal(1, showPacks); }, 220); });
      }, 320);
    });
  })();

  /* ---------- 5. подарки за уровни ----------
     Каждая карточка заполняется за 1.1 с, со сдвигом за своим всплытием. */
  (function giftsSection() {
    var host = root.querySelector(".lic-gift-sec");
    if (!host) return;
    var cards = host.querySelectorAll(".lic-gift-card");
    whenVisible(host, 0.25, function () {
      Array.prototype.forEach.call(cards, function (card, i) {
        var bar = card.querySelector(".bar i");
        var pct = card.querySelector(".pct");
        if (reduceMotion) { bar.style.width = "100%"; pct.textContent = "100%"; return; }
        var t0 = performance.now() + 260 + i * 140;
        (function step() {
          var k = Math.min(Math.max((performance.now() - t0) / 1100, 0), 1);
          bar.style.width = (k * 100) + "%";
          pct.textContent = Math.round(k * 100) + "%";
          if (k < 1) requestAnimationFrame(step);
        })();
      });
    });
  })();
})();
