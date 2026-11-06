/* Win2Partners — общий скрипт: шапка, переключатель языка, появление блоков,
   типографский проход по «висячим» словам.
   Все страницы подключают этот файл первым. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- появление блоков ----------
     Один общий IntersectionObserver ведёт все цели, поэтому N элементов стоят один
     колбэк, а не N слушателей скролла. Элемент всплывает целиком — текст НЕ режется
     по буквам. */
  var revealObserver = "IntersectionObserver" in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          showRise(entry.target);
          revealObserver.unobserve(entry.target);
        });
      }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" })
    : null;

  var pendingRise = [];

  function showRise(el) {
    var delay = Number(el.dataset.revealDelay || 0);
    if (delay) el.style.transitionDelay = delay + "ms";
    el.classList.add("is-in");
  }

  function initReveal(root) {
    var nodes = (root || document).querySelectorAll(".w2p-rise:not(.is-in)");
    for (var i = 0; i < nodes.length; i++) {
      if (revealObserver) { revealObserver.observe(nodes[i]); pendingRise.push(nodes[i]); }
      else showRise(nodes[i]);
    }
  }

  /* Страховка к наблюдателю: в фоновой вкладке он молчит, и блоки, мимо которых
     страница успела прокрутиться, остались бы невидимыми. Список висящих элементов
     держим в массиве и вычёркиваем показанные — так проверка не пересобирает
     выборку и не дёргает вёрстку на каждом кадре прокрутки. */
  function sweepReveals() {
    if (!pendingRise.length) {
      window.removeEventListener("scroll", onRevealScroll);
      return;
    }
    var vh = window.innerHeight;
    for (var i = pendingRise.length - 1; i >= 0; i--) {
      var el = pendingRise[i];
      if (el.classList.contains("is-in")) { pendingRise.splice(i, 1); continue; }
      var r = el.getBoundingClientRect();
      if (r.top < vh * 0.94 && r.bottom > 0) { showRise(el); pendingRise.splice(i, 1); }
    }
  }
  /* Троттлинг по времени, а не через requestAnimationFrame: в фоновой вкладке rAF
     не вызывается, и страховка не сработала бы именно там, где она нужна. */
  var lastSweep = 0;
  function onRevealScroll() {
    var now = Date.now();
    if (now - lastSweep < 100) return;
    lastSweep = now;
    sweepReveals();
  }

  /* ---------- «висячие» слова ----------
     Одно- или двухбуквенное слово (в, с, на, за, из, по, и, а, к, о, у, до, от, не, ты)
     не должно оставаться в конце строки, поэтому пробел после него становится
     неразрывным. Проход по отрендеренному тексту; уже стоящие   не трогаются. */
  var HANGING = /(^|[\s(«"„-])([A-Za-zА-Яа-яЁё]{1,2}|\d+) (?=[«"„A-Za-zА-Яа-яЁё\d])/g;

  function fixHangingWords(root) {
    var walker = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var tag = node.parentElement && node.parentElement.tagName;
        if (!tag || tag === "SCRIPT" || tag === "STYLE") return NodeFilter.FILTER_REJECT;
        return node.nodeValue.indexOf(" ") > -1 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (n) {
      // дважды: перекрывающиеся совпадения («и в доме») требуют второго прохода
      var next = n.nodeValue.replace(HANGING, "$1$2 ").replace(HANGING, "$1$2 ");
      if (next !== n.nodeValue) n.nodeValue = next;
    });
  }

  /* ---------- шапка ----------
     Фон появляется только когда hero прокручен, т.е. между первым и вторым блоком.
     Порог задаётся атрибутом data-threshold, иначе это 82% высоты экрана. */
  function initHeader() {
    var shell = document.querySelector(".w2p-header-fix");
    if (!shell) return;
    var attr = shell.getAttribute("data-threshold");
    var fixed = attr ? Number(attr) : null;
    // Переключение класса не читает вёрстку, только scrollY, поэтому обходимся без
    // requestAnimationFrame: фон шапки меняется в том же кадре, что и прокрутка.
    function apply() {
      var limit = fixed != null ? fixed : window.innerHeight * 0.82;
      shell.classList.toggle("is-solid", (window.scrollY || 0) > limit);
    }
    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
  }

  /* ---------- переключатель языка ----------
     Русский — исходник разметки, английский накладывается словарём из js/i18n.js.
     Выбор запоминается в localStorage и применяется до первой отрисовки текста. */
  function initLanguage() {
    var wrap = document.querySelector(".w2p-lang");
    if (!wrap) return;
    var toggle = wrap.querySelector("[data-lang-toggle]");
    var menu = wrap.querySelector(".w2p-lang-menu");
    var label = toggle.querySelector("[data-lang-label]");
    var options = menu.querySelectorAll("button[data-lang]");

    function select(code, persist) {
      var chosen = null;
      for (var i = 0; i < options.length; i++) {
        var match = options[i].dataset.lang === code;
        options[i].setAttribute("aria-current", String(match));
        if (match) chosen = options[i];
      }
      if (!chosen) return;
      label.textContent = chosen.textContent;
      if (window.W2P_I18N) window.W2P_I18N.apply(code);
      if (persist) {
        try { localStorage.setItem("w2p-lang", code); } catch (e) { /* приватный режим */ }
      }
    }

    var saved = null;
    try { saved = localStorage.getItem("w2p-lang"); } catch (e) { /* приватный режим */ }
    select(saved === "en" ? "en" : "ru", false);

    function close() { menu.hidden = true; toggle.setAttribute("aria-expanded", "false"); }
    function open() { menu.hidden = false; toggle.setAttribute("aria-expanded", "true"); }

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      if (menu.hidden) open(); else close();
    });
    menu.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-lang]");
      if (!btn) return;
      select(btn.dataset.lang, true);
      close();
    });
    document.addEventListener("mousedown", function (e) {
      if (!menu.hidden && !wrap.contains(e.target)) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) { close(); toggle.focus(); }
    });
  }

  /* ---------- бегущая строка hero ----------
     Пять рядов, чётные едут вправо, нечётные влево, со сдвигом старта и своей
     длительностью у каждого ряда, чтобы глифы не выстраивались в колонки. */
  var MARQUEE_OFFSETS = [0, -620, -240, -880, -420];

  function initMarquee() {
    var rows = document.querySelectorAll(".w2p-marquee > div");
    for (var i = 0; i < rows.length; i++) {
      var dir = i % 2 === 0 ? "r" : "l";
      rows[i].style.marginLeft = MARQUEE_OFFSETS[i % 5] + "px";
      if (!reduceMotion) {
        rows[i].style.animation = "w2p-marquee-" + dir + " " + (34 + i * 6) + "s linear infinite";
      }
    }
  }

  /* Прокрутка «наверх» по клику на лого. */
  function initTopLinks() {
    document.addEventListener("click", function (e) {
      var el = e.target.closest("[data-scroll-top]");
      if (!el) return;
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  function init() {
    initHeader();
    initLanguage();
    initMarquee();
    initTopLinks();
    initReveal(document);
    window.addEventListener("scroll", onRevealScroll, { passive: true });
    requestAnimationFrame(function () { fixHangingWords(document.querySelector("main") || document.body); });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  /* Секция рядом с экраном? Циклы rAF на страницах Wintime и лицензий крутятся
     постоянно, поэтому каждый из них сначала спрашивает это и пропускает кадр,
     если его блок далеко за пределами вьюпорта. */
  function isNear(el, margin) {
    var r = el.getBoundingClientRect();
    var m = margin == null ? 200 : margin;
    return r.bottom > -m && r.top < window.innerHeight + m;
  }

  window.W2P = { initReveal: initReveal, fixHangingWords: fixHangingWords,
                 reduceMotion: reduceMotion, isNear: isNear };
})();
