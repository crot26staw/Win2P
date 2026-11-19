/* Страница USDT Staking — масштаб сетки 1440, дуга «замкнутой системы» по скроллу,
   карусель шагов ниже 1200, калькулятор дохода и аккордеон рангов. */
(function () {
  "use strict";
  var root = document.querySelector(".stk");
  if (!root) return;
  var desktop = window.matchMedia("(min-width: 1200px)");

  /* ---------- масштаб фиксированной сетки ----------
     Так же, как на лицензиях: zoom = ширина / 1440, рост ограничен 1.333, чтобы на
     2560 не было текста в 1.8×. Отдельно сцена «системы» ужимается, чтобы целиком
     влезть в высоту экрана под шапкой. */
  var STAGE_H = 740, PIN_TOP = 90;
  function fit() {
    var w = document.documentElement.clientWidth;
    var z = w >= 1200 ? Math.min(w / 1440, 1.3333) : 1;
    root.style.setProperty("--stk-zoom", String(z));
    var avail = (window.innerHeight - PIN_TOP * z - 16) / (STAGE_H * z);
    root.style.setProperty("--stk-fit", String(Math.max(0.6, Math.min(1, avail))));
  }
  fit();
  window.addEventListener("resize", fit);

  /* ---------- 2. замкнутая система ---------- */
  (function system() {
    var sys = root.querySelector(".stk-sys");
    if (!sys) return;
    var arc = sys.querySelector(".stk-sys-arc");
    var steps = sys.querySelectorAll(".stk-step");

    /* Углы конца дуги (рад, по часовой от оси X) для шагов 1…7 — взяты из arcData
       семи состояний макета. Дуга стартует сверху эллипса. */
    var ANG = [4.71239, 5.31862, 6.24268, 7.26072, 8.02228, 9.20370, 10.99557];
    var CX = 575, CY = 268.5, RX = 574.5, RY = 268;

    function arcPath(a0, a1) {
      var d = "", n = Math.max(2, Math.ceil((a1 - a0) / 0.02));
      for (var i = 0; i <= n; i++) {
        var a = a0 + (a1 - a0) * (i / n);
        d += (i ? "L" : "M") + (CX + RX * Math.cos(a)).toFixed(1) + " " + (CY + RY * Math.sin(a)).toFixed(1);
      }
      return d;
    }

    var lastF = -1;
    function apply() {
      if (!desktop.matches) return;
      var r = sys.getBoundingClientRect();
      var pin = sys.firstElementChild.getBoundingClientRect();
      var span = r.height - pin.height;
      var p = span > 0 ? Math.min(Math.max(-r.top / span, 0), 1) : 1;
      // Сцена стартует в состоянии «шаг 2» (так нарисован первый кадр) и доходит до 7
      // за первые 85% пробега — остаток держит замкнутое кольцо на экране.
      var f = 2 + 5 * Math.min(p / 0.85, 1);
      if (Math.abs(f - lastF) < 0.002) return;
      lastF = f;
      var k = Math.min(Math.floor(f), 6);
      var a1 = ANG[k - 1] + (ANG[k] - ANG[k - 1]) * (f - k);
      if (f >= 7) a1 = ANG[6];
      arc.setAttribute("d", arcPath(ANG[0], a1));
      for (var i = 0; i < steps.length; i++) steps[i].classList.toggle("is-on", f >= i + 1 - 0.02);
    }

    var queued = false;
    function onScroll() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; apply(); });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", function () { lastF = -1; apply(); });
    apply();

    /* Карусель ниже 1200: бесконечная лента. Слева и справа от семи шагов стоят их
       копии; когда лента успокаивается в зоне копий, она без анимации перескакивает
       на тот же шаг в оригинальном наборе — визуально прокрутка не кончается.
       Полоска снизу показывает номер шага, который сейчас первым в кадре. */
    var track = sys.querySelector(".stk-track");
    var prev = sys.querySelector("[data-car='prev']");
    var next = sys.querySelector("[data-car='next']");
    var bar = sys.querySelector(".stk-progress i");
    var N = steps.length;

    function cloneSet() {
      var frag = document.createDocumentFragment();
      for (var i = 0; i < N; i++) {
        var c = steps[i].cloneNode(true);
        c.classList.add("is-clone", "is-on");
        c.setAttribute("aria-hidden", "true");
        frag.appendChild(c);
      }
      return frag;
    }
    track.insertBefore(cloneSet(), track.firstChild);
    track.appendChild(cloneSet());

    function pitch() {
      var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      return steps[0].getBoundingClientRect().width + gap;
    }
    function pos() { return Math.round(track.scrollLeft / pitch()); }
    function jumpTo(i) {
      track.style.scrollSnapType = "none";
      track.scrollLeft = i * pitch();
      track.offsetWidth; // применить позицию до возврата снапа
      track.style.scrollSnapType = "";
    }
    function normalize() {
      if (desktop.matches) return;
      var i = pos();
      if (i < N) jumpTo(i + N);
      else if (i >= 2 * N) jumpTo(i - N);
    }
    function sync() {
      if (desktop.matches) return;
      var real = ((pos() % N) + N) % N;
      bar.style.width = ((real + 1) / N * 100) + "%";
    }
    function go(dir) {
      normalize();
      track.scrollTo({ left: (pos() + dir) * pitch(), behavior: window.W2P.reduceMotion ? "auto" : "smooth" });
    }
    var settle;
    function onTrackScroll() {
      sync();
      clearTimeout(settle);
      settle = setTimeout(normalize, 140);
    }
    prev.addEventListener("click", function () { go(-1); });
    next.addEventListener("click", function () { go(1); });
    track.addEventListener("scroll", onTrackScroll, { passive: true });
    window.addEventListener("resize", function () {
      if (desktop.matches) return;
      jumpTo(N + (((pos() % N) + N) % N));
      sync();
    });
    if (!desktop.matches) { jumpTo(N); sync(); }

    // При переходе через 1200 сбрасываем состояние другой раскладки.
    desktop.addEventListener("change", function () {
      lastF = -1;
      if (desktop.matches) apply();
      else {
        for (var i = 0; i < steps.length; i++) steps[i].classList.add("is-on");
        jumpTo(N);
        sync();
      }
    });
    if (!desktop.matches) for (var j = 0; j < steps.length; j++) steps[j].classList.add("is-on");
  })();

  /* ---------- 3. калькулятор дохода ----------
     Сумма — нижняя граница выбранного тарифа. Простой процент: доход за месяц = сумма ×
     ставка, за год — ×12. Сложный: ежемесячная капитализация, (1 + r)^12 − 1 — отсюда
     подписи 80% … 214% годовых в макете. */
  (function calculator() {
    var calc = root.querySelector(".stk-calc");
    if (!calc) return;
    var sec = calc.closest(".stk-inc") || calc;
    var tiers = calc.querySelectorAll(".stk-tier");
    var sw = calc.querySelector(".stk-switch");
    var outMonth = calc.querySelector("[data-out='month']");
    var outYear = calc.querySelector("[data-out='year']");
    var sel = 0, compound = false;
    var shown = { month: 5, year: 60 };

    function money(n) {
      return "$" + String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    // Короткая прокрутка числа к новому значению — меняется только текст узла.
    function tween(el, key, to) {
      var from = shown[key];
      shown[key] = to;
      if (window.W2P.reduceMotion || from === to) { el.textContent = money(to); return; }
      var t0 = performance.now();
      (function step() {
        var k = Math.min((performance.now() - t0) / 420, 1);
        var e = 1 - Math.pow(1 - k, 3);
        el.textContent = money(from + (to - from) * e);
        if (k < 1 && shown[key] === to) requestAnimationFrame(step);
      })();
    }

    function render() {
      for (var i = 0; i < tiers.length; i++) {
        tiers[i].classList.toggle("is-fill", i <= sel);
        tiers[i].setAttribute("aria-checked", String(i === sel));
        tiers[i].tabIndex = i === sel ? 0 : -1;
      }
      calc.classList.toggle("is-compound", compound);
      sec.classList.toggle("is-compound", compound); // мобильный: компенсирует исчезнувшую строку
      sw.setAttribute("aria-checked", String(compound));
      var amount = Number(tiers[sel].dataset.amount);
      var rate = Number(tiers[sel].dataset.rate);
      var month = amount * rate;
      var year = compound ? amount * (Math.pow(1 + rate, 12) - 1) : month * 12;
      tween(outMonth, "month", month);
      tween(outYear, "year", year);
    }

    Array.prototype.forEach.call(tiers, function (t, i) {
      t.addEventListener("click", function () { sel = i; render(); });
    });
    // Радиогруппа: стрелки двигают выбор, фокус идёт следом.
    calc.querySelector(".stk-tiers").addEventListener("keydown", function (e) {
      var d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      sel = (sel + d + tiers.length) % tiers.length;
      render();
      tiers[sel].focus();
    });
    sw.addEventListener("click", function () { compound = !compound; render(); });
    render();
  })();

  /* ---------- 4. ранги: аккордеон, открыта только одна карточка ---------- */
  root.addEventListener("click", function (e) {
    var btn = e.target.closest(".stk-rank-btn");
    if (!btn) return;
    var item = btn.parentElement;
    var open = !item.classList.contains("is-open");
    var grid = item.closest(".stk-rank-grid") || root;
    grid.querySelectorAll(".stk-rank.is-open").forEach(function (other) {
      if (other === item) return;
      other.classList.remove("is-open");
      var b = other.querySelector(".stk-rank-btn");
      if (b) b.setAttribute("aria-expanded", "false");
    });
    item.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
  });
})();
