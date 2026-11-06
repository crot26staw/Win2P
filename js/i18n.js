/* Английская версия сайта.
   Ключ словаря — русская строка из разметки, приведённая к одному пробелу
   (переносы и неразрывные пробелы схлопываются). Значение может содержать \n:
   в карточках каталога стоит white-space: pre-line, и перенос там осмысленный.
   Так перевод не требует ключей в HTML — русский остаётся исходником страницы,
   а английский накладывается поверх и снимается обратно. */
(function () {
  "use strict";

  var EN = {
    /* --- мета и заголовки страниц --- */
    "Win2Partners — экосистема продуктов и токен WinTime":
      "Win2Partners — product ecosystem and the WinTime token",
    "Все об экосистеме Win2Partners в одном месте: партнёрские лицензии, обучение, стейкинг, WinZu и нативный токен WinTime.":
      "Everything about the Win2Partners ecosystem in one place: partner licenses, education, staking, WinZu and the native WinTime token.",
    "WinTime — нативный токен экосистемы Win2Partners":
      "WinTime — the native token of the Win2Partners ecosystem",
    "WinTime — цифровой актив, который объединяет социальный нетворкинг, вознаграждения, игровые механики и доступ к продуктам экосистемы Win2Partners.":
      "WinTime is a digital asset that brings together social networking, rewards, game mechanics and access to the products of the Win2Partners ecosystem.",
    "Lite License — старт в Win2Partners за $6":
      "Lite License — start in Win2Partners for $6",
    "Активируй тариф WIN LITE за $6, строй партнёрскую линию из 7 уровней и получай доход до $126 952.5 при полном раскрытии.":
      "Activate the WIN LITE plan for $6, build a seven-level partner line and earn up to $126 952.5 at full capacity.",
    "Pro License — старт в Win2Partners за $24":
      "Pro License — start in Win2Partners for $24",
    "Активируй тариф WIN PRO за $24, строй партнёрскую линию из 7 уровней и получай доход до $507 810 при полном раскрытии.":
      "Activate the WIN PRO plan for $24, build a seven-level partner line and earn up to $507 810 at full capacity.",

    /* --- общее: шапка, подвал, навигация --- */
    "Win2Partners — на главную": "Win2Partners — home",
    "Язык интерфейса": "Interface language",
    "Все продукты": "All products",
    "Маркетинг": "Marketing",
    "Продукты": "Products",
    "мы в соцсетях": "find us online",
    "Партнерская цифровая экосистема": "A partner digital ecosystem",

    /* --- главная --- */
    "Все об экосистеме Win2Partners в одном месте":
      "Everything about the Win2Partners ecosystem in one place",
    "Обменивай полученные Wintime\nна ценные призы каждый день":
      "Trade the Wintime you earn\nfor valuable prizes every day",
    "Строй партнерскую сеть,\nзарабатывай до $150т / в месяц":
      "Build a partner network,\nearn up to $150K / month",
    "Строй партнерскую сеть,\nзарабатывай до $500т / в месяц":
      "Build a partner network,\nearn up to $500K / month",
    "Инвестируй с Win2Partners\nи приумножай свой капитал":
      "Invest with Win2Partners\nand grow your capital",
    "Будь совладельцем Win2Partners,\nполучай прибыль от всей экосистемы":
      "Co-own Win2Partners\nand earn from the whole ecosystem",
    "Академия Win2Pro": "Win2Pro Academy",
    "Обучение продажам, финансовой\nграмотности и искусственному интеллекту":
      "Courses in sales, financial literacy\nand artificial intelligence",
    "Криптобанк, позволяющий\nсовершать платежи по всему миру":
      "A crypto bank for making\npayments all over the world",
    "Маркетплейс нейросетей\nи AI-решений":
      "A marketplace of neural networks\nand AI solutions",
    "Бесплатный VPN-сервис\nдля безопасного доступа в интернет":
      "A free VPN service\nfor safe access to the internet",
    "Контент-завод полного цикла\nдля ваших социальных сетей и рекламы":
      "A full-cycle content factory\nfor your social media and ads",
    "Онлайн-казино": "An online casino",
    "Платформа сеточных\nбинарных опционов": "A grid-based\nbinary options platform",

    /* --- Wintime --- */
    "Нативный токен экосистемы Win2Partners": "The native token of the Win2Partners ecosystem",
    "Цифровой актив, который объединяет социальный нетворкинг, вознаграждения, игровые механики и доступ к продуктам экосистемы":
      "A digital asset that brings together social networking, rewards, game mechanics and access to the products of the ecosystem",
    "Модель начисления": "Accrual model",
    "Подписки увеличивают мультипликатор всех начислений":
      "Subscriptions raise the multiplier on every accrual",
    "Множитель": "Multiplier",
    "токен / мин": "token / min",
    "токена / мин": "tokens / min",
    "токенов / мин": "tokens / min",
    "токенов / сутки": "tokens / day",
    "Лимит рефералов —": "Referral limit —",
    "бонус": "bonus",
    "Выбрать": "Choose",
    "Подарки за токены": "Prizes for tokens",
    "обменивай токены": "trade your tokens",
    "на подарки": "for gifts",
    "Безлимитный VPN": "Unlimited VPN",
    "Контент завод": "Content factory",
    "$50 на баланс WinZu Casino": "$50 to your WinZu Casino balance",
    "$33 на баланс Win2Partners": "$33 to your Win2Partners balance",
    "$77 на баланс Win2Partners": "$77 to your Win2Partners balance",
    "WINTIME — ТОКЕН, КОТОРЫЙ ПРЕВРАЩАЕТ АКТИВНОСТЬ":
      "WINTIME — THE TOKEN THAT TURNS ACTIVITY",
    "в возможности": "into opportunity",

    /* --- лицензии --- */
    "твой старт всего за $6": "your start for just $6",
    "твой старт всего за $24": "your start for just $24",
    "Активируй тариф WIN LITE и начни строить свою партнёрскую линию":
      "Activate the WIN LITE plan and start building your partner line",
    "Активируй тариф WIN PRO и начни строить свою партнёрскую линию":
      "Activate the WIN PRO plan and start building your partner line",
    "Активировать WIN LITE": "Activate WIN LITE",
    "Активировать WIN PRO": "Activate WIN PRO",
    "Куда идут твои $6?": "Where do your $6 go?",
    "Куда идут твои $24?": "Where do your $24 go?",
    "100% суммы остаётся внутри экосистемы и работает на участников":
      "100% of the amount stays inside the ecosystem and works for its members",
    "Партнерская сеть": "Partner network",
    "Распределяется по 7 уровням": "Split across seven levels",
    "Бонус за личное приглашение": "Bonus for a personal invite",
    "Промо, арена, развитие": "Promo, arena, growth",
    "Продвижение и развитие проекта": "Promoting and growing the project",
    "Автоматический перелив": "Automatic spillover",
    "После подключения новые участники автоматически размещаются в структуре сверху вниз и слева направо":
      "Once they join, new members are placed into the structure automatically — top to bottom, left to right",
    "Вы": "You",
    "Твой доход растёт вместе с линией": "Your income grows with your line",
    "Уровень": "Level",
    "Доход": "Income",
    "Человек": "People",
    "Общий доход WIN LITE при полном раскрытии": "Total WIN LITE income at full capacity",
    "Общий доход WIN PRO при полном раскрытии": "Total WIN PRO income at full capacity",
    "Начать зарабатывать": "Start earning",
    "Бонус за первые 72 часа": "Bonus for the first 72 hours",
    "Заполни первые 2 уровня в течение первых 72 часов и получи специальный бонус Пак":
      "Fill your first two levels within the first 72 hours and get a special bonus Pack",
    "заполняй уровни": "fill your levels",
    "— получай подарки": "— collect gifts",
    "Заполни уровни с 3 по 7 и получи NFT в подарок":
      "Fill levels 3 to 7 and get an NFT as a gift",
    "Заполни уровни с 3 по 7 и получай подарки":
      "Fill levels 3 to 7 and collect gifts",
    "Активировать тариф": "Activate the plan",
    "Rolex или Cartier": "A Rolex or a Cartier",
    "Гелендваген": "A G-Wagon",
    "Квартира в Дубае": "An apartment in Dubai",
  };
  for (var c = 1; c <= 10; c++) EN["Ячейка " + c] = "Cell " + c;

  /* Ключ ищем по схлопнутым пробелам: fixHangingWords успевает вставить  
     раньше, чем пользователь переключит язык. */
  function norm(s) { return s.replace(/ /g, " ").replace(/\s+/g, " ").trim(); }

  /* Ключи в словаре записаны с переносами строк для читаемости, а ищем мы по
     схлопнутым пробелам — поэтому нормализуем сам словарь один раз. */
  var DICT = {};
  Object.keys(EN).forEach(function (k) { DICT[norm(k)] = EN[k]; });

  var ATTRS = ["aria-label", "alt", "title", "data-title"];
  var texts = null, attrs = null;

  /* Снимок исходной русской разметки. Делается один раз, до первого перевода,
     поэтому возврат на русский всегда точный. */
  function snapshot() {
    if (texts) return;
    texts = [];
    attrs = [];
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var el = n.parentElement;
        if (!el) return NodeFilter.FILTER_REJECT;
        var tag = el.tagName;
        if (tag === "SCRIPT" || tag === "STYLE") return NodeFilter.FILTER_REJECT;
        // Названия языков в переключателе не переводятся, их ведёт common.js.
        if (el.closest(".w2p-lang")) return NodeFilter.FILTER_REJECT;
        return norm(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });
    while (walker.nextNode()) texts.push({ node: walker.currentNode, ru: walker.currentNode.nodeValue });

    ATTRS.forEach(function (name) {
      var nodes = document.querySelectorAll("[" + name + "]");
      for (var i = 0; i < nodes.length; i++) {
        attrs.push({ el: nodes[i], name: name, ru: nodes[i].getAttribute(name) });
      }
    });
  }

  function apply(lang) {
    snapshot();
    var en = lang === "en";
    texts.forEach(function (t) {
      var next = en ? DICT[norm(t.ru)] : null;
      t.node.nodeValue = next != null ? next : t.ru;
    });
    attrs.forEach(function (a) {
      var next = en ? DICT[norm(a.ru)] : null;
      a.el.setAttribute(a.name, next != null ? next : a.ru);
    });

    var root = document.documentElement;
    if (!root.dataset.ruTitle) root.dataset.ruTitle = document.title;
    var title = en ? DICT[norm(root.dataset.ruTitle)] : null;
    document.title = title != null ? title : root.dataset.ruTitle;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) {
      if (!meta.dataset.ru) meta.dataset.ru = meta.content;
      var d = en ? DICT[norm(meta.dataset.ru)] : null;
      meta.content = d != null ? d : meta.dataset.ru;
    }

    document.documentElement.lang = en ? "en" : "ru";
    // Подпись подарка на странице Wintime берётся из data-title соседней плитки —
    // перерисовываем её сразу, не дожидаясь следующего кадра прокрутки.
    var cap = document.querySelector(".w2p-orbit-caption");
    var active = document.querySelector(".w2p-orbit-item");
    if (cap && active) {
      var items = document.querySelectorAll(".w2p-orbit-item");
      var best = items[0];
      for (var i = 0; i < items.length; i++) {
        if (Number(items[i].style.zIndex || 0) > Number(best.style.zIndex || 0)) best = items[i];
      }
      cap.textContent = best.getAttribute("data-title") || cap.textContent;
    }
    if (window.W2P && window.W2P.fixHangingWords) {
      window.W2P.fixHangingWords(document.body);
    }
  }

  window.W2P_I18N = { apply: apply, dictionary: DICT };
})();
