/* Смена блоков по прокрутке (как skinlove.ae/injection).
   На всех ширинах секции внутри .sw стоят друг на друге в закреплённом экране.
   Картинка следующей секции раскрывается снизу шторкой синхронно с прокруткой,
   предыдущая темнеет (и уезжает вверх, если стоит у верха экрана — на мобильном
   над картинкой текст, туда она не заезжает); текст переключается с плавным
   переходом на середине шага. При reduce-motion — обычный поток. */
(function () {
  "use strict";
  var mobile = window.matchMedia("(max-width: 767px)");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  function ease(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  Array.prototype.forEach.call(document.querySelectorAll("[data-swap]"), function (sw) {
    var pin = sw.querySelector(".sw-pin");
    var items = Array.prototype.slice.call(pin.querySelectorAll("[data-swap-item]"));
    var N = items.length;
    if (N < 2) return;
    var arts = items.map(function (it) { return it.querySelector("[data-swap-art]"); });
    var copies = items.map(function (it) { return it.querySelector("[data-swap-copy]"); });
    var on = false, queued = false, active = -1, shift = true;

    function reset() {
      sw.classList.remove("sw-on");
      sw.style.removeProperty("--sw-copy");
      arts.forEach(function (a) { a.style.clipPath = a.style.transform = a.style.filter = ""; });
      copies.forEach(function (c) { c.classList.remove("is-active", "is-past"); c.removeAttribute("aria-hidden"); });
      active = -1;
    }

    function setup() {
      if (reduce.matches) { if (on) reset(); on = false; return; }
      sw.style.setProperty("--sw-n", N);
      var hdr = document.querySelector(".w2p-header");
      if (hdr) sw.style.setProperty("--sw-hdr", hdr.getBoundingClientRect().height + "px");
      sw.style.removeProperty("--sw-copy");
      sw.classList.add("sw-on");
      // мобильный: зона текста — по самому высокому тексту, чтобы картинки совпадали
      if (mobile.matches) {
        var ch = 0;
        copies.forEach(function (c) { ch = Math.max(ch, c.offsetHeight); });
        sw.style.setProperty("--sw-copy", Math.ceil(ch) + "px");
      }
      shift = arts[0].offsetTop === 0;
      if (!shift) arts.forEach(function (a) { a.style.transform = ""; });
      on = true;
      update();
    }

    function update() {
      if (!on) return;
      // всё в экранных px (getBoundingClientRect уже учитывает zoom)
      var r = sw.getBoundingClientRect(), pr = pin.getBoundingClientRect();
      var p = (pr.top - r.top) / (r.height - pr.height);
      p = Math.min(1, Math.max(0, p)) * (N - 1);

      for (var i = 0; i < N; i++) {
        var a = arts[i];
        if (i > 0) {
          var e = ease(Math.min(1, Math.max(0, p - (i - 1))));
          a.style.clipPath = "inset(" + ((1 - e) * 100).toFixed(3) + "% 0 0 0)";
        }
        if (i < N - 1) {
          var o = ease(Math.min(1, Math.max(0, p - i)));
          a.style.transform = o && shift ? "translate3d(0," + (-30 * o).toFixed(3) + "%,0)" : "";
          a.style.filter = o ? "brightness(" + (1 - 0.5 * o).toFixed(3) + ")" : "";
        }
      }

      var idx = Math.min(N - 1, Math.round(p));
      if (idx !== active) {
        active = idx;
        copies.forEach(function (c, k) {
          c.classList.toggle("is-active", k === idx);
          c.classList.toggle("is-past", k < idx);
          c.setAttribute("aria-hidden", k === idx ? "false" : "true");
        });
      }
    }

    function onScroll() {
      if (!on || queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; update(); });
    }

    var rt;
    function onResize() { clearTimeout(rt); rt = setTimeout(setup, 120); }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    if (mobile.addEventListener) {
      mobile.addEventListener("change", setup);
      reduce.addEventListener("change", setup);
    }
    setup();
  });
})();
