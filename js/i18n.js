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
    "Партнёрская цифровая экосистема": "A partner digital ecosystem",

    /* --- главная --- */
    "Все об экосистеме Win2Partners в одном месте":
      "Everything about the Win2Partners ecosystem in one place",
    "Партнёрская программа с возможностью\nзаработка до $150 тыс. в месяц":
      "A partner program with earning\npotential of up to $150K a month",
    "Партнёрская программа с возможностью\nзаработка до $500 тыс. в месяц":
      "A partner program with earning\npotential of up to $500K a month",
    "Стейкинг USDT с ежемесячными выплатами":
      "USDT staking with monthly payouts",
    "Доля в Win2Partners и доход от всей экосистемы":
      "A stake in Win2Partners and income from the whole ecosystem",
    "Академия Win2Pro": "Win2Pro Academy",
    "Обучение продажам, финансовой\nграмотности и искусственному интеллекту":
      "Courses in sales, financial literacy\nand artificial intelligence",
    "Криптобанк, позволяющий\nсовершать платежи по всему миру":
      "A crypto bank for making\npayments all over the world",
    "Маркетплейс нейросетей\nи AI-решений":
      "A marketplace of neural networks\nand AI solutions",
    "Бесплатный VPN-сервис\nдля безопасного доступа в интернет":
      "A free VPN service\nfor safe access to the internet",
    "Контент-завод полного цикла\nдля социальных сетей и рекламы":
      "A full-cycle content factory\nfor social media and ads",
    "Онлайн-казино": "An online casino",
    "Скоро": "Soon",
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
    "Подарки за токены": "Prizes for tokens",
    "WinTime обменивается": "WinTime is exchanged",
    "Роль токена": "The token's role",
    "в экосистеме": "in the ecosystem",
    "Социальный слой": "Social layer",
    "Увеличивает видимость профиля в глобальной карте": "Raises your profile's visibility on the global map",
    "Формирует рейтинг и позицию пользователя": "Shapes the user's rating and position",
    "Усиливает нетворкинг внутри экосистемы": "Strengthens networking inside the ecosystem",
    "Механики вовлечения": "Engagement mechanics",
    "Участие в ежедневных розыгрышах": "Entry into daily prize draws",
    "Конвертация активности в вознаграждения": "Turning activity into rewards",
    "Внутренние бонусные программы": "In-house bonus programs",
    "Доступ к продуктам": "Access to products",
    "WinTime используется как ключ доступа к сервисам:": "WinTime works as an access key to services:",
    "VPN-инфраструктура": "VPN infrastructure",
    "Контент платформа": "Content platform",
    "Криптокарты": "Crypto cards",
    "Экосистемные цифровые продукты": "Ecosystem digital products",
    "бонус за приглашение": "invite bonus",
    "за каждого лично приглашенного партнера": "for every partner you invite personally",
    "10 партнеров": "10 partners",
    "20 партнеров": "20 partners",
    "30 партнеров": "30 partners",
    "на подарки": "for gifts",
    "Безлимитный VPN": "Unlimited VPN",
    "Лотерейный билет": "Lottery ticket",
    "Банковская карта": "Bank card",
    "Контент завод": "Content factory",
    "$50 на баланс WinZu Casino": "$50 to your WinZu Casino balance",
    "$33 на баланс Win2Partners": "$33 to your Win2Partners balance",
    "$77 на баланс Win2Partners": "$77 to your Win2Partners balance",
    "WINTIME — ТОКЕН, КОТОРЫЙ ПРЕВРАЩАЕТ АКТИВНОСТЬ":
      "WINTIME — THE TOKEN THAT TURNS ACTIVITY",
    "в возможности": "into opportunity",

    /* --- лицензии --- */
    "старт за $6": "start for $6",
    "старт за $24": "start for $24",
    "Партнёрская сеть с доходом до $507 000": "A partner network with income of up to $507,000",
    "Куда идут $24?": "Where does the $24 go?",
    "Партнёрская сеть с доходом до $127 000": "A partner network with income of up to $127,000",
    "Куда идут $6?": "Where does the $6 go?",
    "Распределяется по 7-ми уровням": "Split across seven levels",
    "100% суммы остаётся внутри экосистемы и работает на участников":
      "100% of the amount stays inside the ecosystem and works for its members",
    "Партнерская сеть": "Partner network",
    "Бонус за личное приглашение": "Bonus for a personal invite",
    "Промо, арена, развитие": "Promo, arena, growth",
    "Продвижение и развитие проекта": "Promoting and growing the project",
    "Автоматический перелив": "Automatic spillover",
    "После подключения новые участники автоматически размещаются в структуре сверху вниз и слева направо":
      "Once they join, new members are placed into the structure automatically — top to bottom, left to right",
    "Участник": "Participant",
    "Доход растёт вместе с линией": "Income grows with your line",
    "Уровень": "Level",
    "Доход": "Income",
    "Человек": "People",
    "Общий доход WIN LITE при полном раскрытии": "Total WIN LITE income at full capacity",
    "Общий доход WIN PRO при полном раскрытии": "Total WIN PRO income at full capacity",
    "Специальные бонусы": "Special bonuses",
    "Бонус Пак за заполнение уровней с 1 по 2 в первые 72 часа": "A Bonus Pack for filling levels 1–2 within the first 72 hours",
    "Уровни": "Levels",
    "Бонус Пак": "Bonus Pack",
    "подарки": "gifts",
    "за заполнение уровней": "for filling your levels",
    "NFT в подарок за заполнение уровней с 3 по 7": "An NFT gift for filling levels 3 to 7",
    "Заполни уровни с 3 по 7 и получай подарки":
      "Fill levels 3 to 7 and collect gifts",
    "Rolex или Cartier": "A Rolex or a Cartier",
    "Гелендваген": "A G-Wagon",
    "Квартира в Дубае": "An apartment in Dubai",

    /* --- USDT Staking --- */
    "USDT Staking — стейкинг USDT с доходностью от 5% до 10% в месяц":
      "USDT Staking — stake USDT and earn 5% to 10% a month",
    "Стейкинг USDT экосистемы Win2Partners: доходность от 5% до 10% в месяц, калькулятор дохода и 12 рангов с реферальным доходом до 16%.":
      "USDT staking in the Win2Partners ecosystem: 5% to 10% a month, an income calculator and 12 ranks with referral income of up to 16%.",
    "Стейкинг USDT экосистемы Win2Partners": "USDT staking in the Win2Partners ecosystem",
    "с доходностью от 5% до 10% в месяц": "with returns of 5% to 10% a month",
    "замкнутая система": "a closed loop",
    "USDT инвесторов запускают цикл привлечения клиентов и формирования прибыли внутри экосистемы":
      "Investors' USDT starts a cycle that brings in customers and generates profit inside the ecosystem",
    "Предыдущий шаг": "Previous step",
    "Следующий шаг": "Next step",
    "Инвесторы": "Investors",
    "Инвесторы стейкают USDT в нашей системе": "Investors stake USDT in our system",
    "Стейкинг USDT": "USDT staking",
    "USDT блокируются в стейкинге": "The USDT is locked in staking",
    "реклама продуктов": "Product advertising",
    "Средства из стейкинга направляются на маркетинг и привлечение трафика":
      "Staked funds go into marketing and driving traffic",
    "Реклама высокомаржинальных бизнесов": "Advertising high-margin businesses",
    "Криптобанк": "Crypto bank",
    "Казино": "Casino",
    "Маркетплейс нейронок": "AI marketplace",
    "команда": "A team of",
    "профессионалов": "professionals",
    "SMM-команда привлекает целевой трафик и приводит новых клиентов в наши продукты":
      "Our SMM team attracts targeted traffic and brings new customers to our products",
    "клиенты": "Customers",
    "Клиенты активно пользуются продуктами, совершают транзакции и приносят прибыль":
      "Customers actively use the products, make transactions and generate profit",
    "прибыль": "Profit",
    "Прибыль распределяется между инвесторами пропорционально их доле в стейкинге":
      "Profit is shared among investors in proportion to their stake",
    "Доход от 5% до 10% в месяц": "Earn 5% to 10% a month",
    "Размер ставки зависит от суммы USDT в стейкинге.": "The rate depends on how much USDT you stake.",
    "Чем выше общая сумма, тем выше ставка и доходность": " The larger the total, the higher the rate and the return",
    "доходность": "Return",
    "от суммы стейкинга": " by staking amount",
    "Сложный процент": "Compound interest",
    "от": "from",
    "доход за месяц": "Income per month",
    "доход за 12 месяцев": "Income over 12 months",
    "ранги": "ranks",
    "12 рангов с реферальным доходом от 5% до 16%. Размер реферального дохода зависит от ранга, личного и командного объёма":
      "12 ranks with referral income from 5% to 16%. Your referral income depends on your rank and on your personal and team volume",
    "Командный объем": "Team volume",
    "Личный объем": "Personal volume",
    "Премия": "Bonus",

    /* --- WinZu --- */
    "WinZu — онлайн-казино экосистемы Win2Partners": "WinZu — the online casino of the Win2Partners ecosystem",
    "WinZu — онлайн-казино экосистемы Win2Partners с игорной лицензией: 15 000+ игр от ведущих провайдеров, гибкие платежи и поддержка 24/7.":
      "WinZu is the licensed online casino of the Win2Partners ecosystem: 15,000+ games from leading providers, flexible payments and 24/7 support.",
    "Онлайн-казино экосистемы": "The online casino of the",
    "Win2Partners с игорной лицензией": " Win2Partners ecosystem, with a gaming licence",
    "Медведь WinZu с фишкой казино": "The WinZu bear holding a casino chip",
    "15 000+ игр": "15,000+ games",
    "от ведущих провайдеров": "from leading providers",
    "Основа стабильной": "The foundation of ",
    "работы": "stable operation",
    "Безопасность": "Security",
    "Антифрод-система, каскадный карточный шлюз для стабильной обработки платежей, собственный редирект-платёжный шлюз":
      "An anti-fraud system, a cascading card gateway for stable payment processing and our own redirect payment gateway",
    "Гибкие платежи": "Flexible payments",
    "Множество платёжных каналов и альтернативные шлюзы обеспечивают доступность пополнения и вывода средств: криптовалюта, Visa и Mastercard.":
      "Multiple payment channels and alternative gateways keep deposits and withdrawals available: crypto, Visa and Mastercard.",
    "Криптовалюта": "Crypto",
    "Поддержка 24/7": "24/7 support",
    "Круглосуточная помощь по вопросам игр, платежей и аккаунта.":
      "Round-the-clock help with games, payments and your account.",
    "Юридическая основа": "Legal foundation",
    "Соответствие международным нормам": "Compliance with international standards",
    "Лицензия выдана:": "Licence issued by:",
    "Правительством автономного острова Анжуан, Союз Коморских островов":
      "The Government of the Autonomous Island of Anjouan, Union of the Comoros",
    "Номер лицензии": "Licence number",
    "Регистрационный номер": "Registration number",
    "Оператор": "Operator",
    "Юридический адрес": "Registered address",

    /* --- Win-2.pro: контент-завод --- */
    "Контент-завод Win-2.pro — от идеи до публикации на одной платформе":
      "Win-2.pro content factory — from idea to publication on one platform",
    "Win-2.pro — контент-завод полного цикла экосистемы Win2Partners: аналитика, планирование, производство, публикация и отчёты в одном интерфейсе.":
      "Win-2.pro is the full-cycle content factory of the Win2Partners ecosystem: analytics, planning, production, publishing and reports in one interface.",
    "Панда со смартфоном и камерой": "A panda with a smartphone and a camera",
    "Контент-завод": "Content factory",
    "От идеи до публикации — на одной платформе": "From idea to publication — on one platform",
    "Платформа полного цикла для создания контента. Аналитика, планирование, производство, публикация и отчёты объединены в одном интерфейсе.":
      "A full-cycle platform for creating content. Analytics, planning, production, publishing and reports come together in one interface.",
    "Ключевые": "Key ",
    "возможности": "features",
    "Рынок в поле зрения": "The market in view",
    "Мониторинг конкурентов, актуальных тем и реакции аудитории.":
      "Tracking competitors, trending topics and audience response.",
    "Результат в цифрах": "Results in numbers",
    "Оценка эффективности контента — от выбранной темы до охвата и вовлечения.":
      "Measuring content performance — from the chosen topic to reach and engagement.",
    "Производство 24/7": "Production 24/7",
    "Непрерывное создание контента по заданным сценариям и ролям.":
      "Non-stop content production to set scenarios and roles.",
    "Всё для создания контента": "Everything for creating content",
    "Конкурентный радар": "Competitor radar",
    "Сравнение конкурентов по темам, форматам и вовлечению аудитории.":
      "Comparing competitors by topics, formats and audience engagement.",
    "Тренд-детектор": "Trend detector",
    "Поиск актуальных инфоповодов и подходов к их подаче.": "Finding timely news hooks and ways to present them.",
    "Брифы и сценарии": "Briefs and scripts",
    "Формирование брифов и сценариев с учётом аудитории, особенностей продукта и стиля коммуникации.":
      "Building briefs and scripts around the audience, the product and the tone of voice.",
    "Тексты и визуалы": "Copy and visuals",
    "Создание постов, статей, карточек и графики в фирменном стиле.":
      "Creating posts, articles, cards and graphics in your brand style.",
    "Аватары и видео": "Avatars and video",
    "Создание видео с аватарами, озвучкой и субтитрами под разные форматы.":
      "Producing videos with avatars, voice-over and subtitles for different formats.",
    "Публикация и аналитика": "Publishing and analytics",
    "Публикация контента по расписанию, сбор метрик и подготовка отчётов.":
      "Scheduled publishing, metrics collection and reporting.",
    "От анализа": "From analysis ",
    "к готовому контенту": "to finished content",
    "Панда в оранжевой куртке": "A panda in an orange jacket",
    "Сбор данных и анализ": "Data collection and analysis",
    "Платформа изучает нишу, контент конкурентов и интересы аудитории.":
      "The platform studies the niche, competitors' content and audience interests.",
    "Стратегия и контент-план": "Strategy and content plan",
    "На основе брифов формируются темы, рубрики и график публикаций.":
      "Briefs turn into topics, content pillars and a publishing schedule.",
    "Производственный цикл": "Production cycle",
    "Тексты, графика, аватары и видео создаются и редактируются в одном интерфейсе.":
      "Copy, graphics, avatars and video are created and edited in one interface.",
    "Публикация и оптимизация": "Publishing and optimisation",
    "Контент публикуется по расписанию. Результаты отслеживаются с помощью аналитики для дальнейшей оптимизации контент-стратегии":
      "Content goes out on schedule. Analytics tracks the results to keep refining the content strategy",
    "Каналы публикации": "Publishing channels",
    "ВКонтакте": "VK",
    "Одноклассники": "Odnoklassniki",
    "Яндекс Дзен": "Yandex Zen",

    /* --- Pando --- */
    "Pando — VPN, видеозвонки и прокси для Telegram": "Pando — VPN, video calls and a Telegram proxy",
    "Pando объединяет VPN, видеозвонки и прокси для Telegram: доступ к недоступным сайтам, видеовстречи без регистрации и Telegram без VPN.":
      "Pando brings together a VPN, video calls and a Telegram proxy: access to blocked sites, video meetings without sign-up and Telegram without a VPN.",
    "Панда в шапке Pando с голографическим глобусом": "A panda in a Pando beanie with a holographic globe",
    "Три инструмента для доступа и общения": "Three tools for access and communication",
    "Pando объединяет VPN, видеозвонки и прокси для Telegram. Сервис помогает открывать недоступные сайты, проводить видеовстречи и пользоваться Telegram без VPN.":
      "Pando combines a VPN, video calls and a Telegram proxy. It helps you open blocked sites, hold video meetings and use Telegram without a VPN.",
    "Панда держит голографический щит с замком": "A panda holding a holographic shield with a padlock",
    "Pando VPN шифрует соединение между устройством и интернетом, скрывает IP-адрес и помогает открывать сайты и сервисы, недоступные напрямую.":
      "Pando VPN encrypts the connection between your device and the internet, hides your IP address and helps you open sites and services that aren't directly available.",
    "Панда показывает видеозвонок на светящемся экране": "A panda showing a video call on a glowing screen",
    "Видеозвонки P2P": "P2P video calls",
    "Прямое соединение между участниками разговора. Создание видеозвонков и подключение к ним без регистрации и установки дополнительных приложений.":
      "A direct connection between call participants. Start and join video calls without signing up or installing extra apps.",
    "Всё для разговора": "Everything for talking ",
    "и совместной работы": "and working together",
    "Видеозвонки Pando поддерживают общение, проведение встреч и демонстрацию материалов с разных устройств.":
      "Pando video calls support conversations, meetings and presenting materials from any device.",
    "карусель": "carousel",
    "Возможности видеозвонков": "Video call features",
    "Выбор возможности": "Choose a feature",
    "HD-видео и качественный звук": "HD video and clear sound",
    "Запись встреч": "Meeting recording",
    "Демонстрация экрана": "Screen sharing",
    "Виртуальный фон": "Virtual background",
    "Трансляции в Telegram и YouTube": "Streaming to Telegram and YouTube",
    "Работа на любом устройстве": "Works on any device",
    "Telegram без VPN": "Telegram without a VPN",
    "Прокси Pando помогает восстановить доступ, если Telegram не открывается, работает медленно или возникают проблемы с соединением.":
      "The Pando proxy restores access when Telegram won't open, runs slowly or has connection problems.",
    "Рука в перчатке держит смартфон с приложением Pando": "A gloved hand holding a smartphone with the Pando app",
    "Подключение прокси в два клика": "Proxy setup in two clicks",
    "Доступ и общение": "Access and communication ",
    "без лишних действий": "without extra steps",
    "Три инструмента в одном сервисе": "Three tools in one service",
    "VPN, видеозвонки и прокси для Telegram.": "VPN, video calls and a Telegram proxy.",
    "Иконки Pando: VPN, видеозвонки и Telegram на светящейся орбите": "Pando icons: VPN, video calls and Telegram on a glowing orbit",
    "Связь без затрат": "Free to use",
    "Доступ к возможностям сервиса без оплаты.": "Access the service's features at no cost.",
    "Без анкет и паролей": "No forms or passwords",
    "Работа без регистрации и создания аккаунта.": "Works without signing up or creating an account.",
    "Всё готово к работе": "Ready to go",
    "Простой запуск без сложных настроек.": "Simple start, no complicated setup.",

    /* --- AI Panda --- */
    "AI Panda — нейросети в одном пространстве": "AI Panda — neural networks in one place",
    "AI Panda — единый кабинет для создания контента, анализа информации и решения рабочих задач. Десятки AI-моделей в одном интерфейсе без VPN.":
      "AI Panda is a single workspace for creating content, analysing information and getting work done. Dozens of AI models in one interface, no VPN needed.",
    "Панда в шапке AI Panda работает за ноутбуком": "A panda in an AI Panda beanie working on a laptop",
    "Нейросети в одном пространстве": "Neural networks in one place",
    "AI Panda — единый кабинет для создания контента, анализа информации и решения рабочих задач. Различные AI-инструменты доступны в одном интерфейсе без VPN.":
      "AI Panda is a single workspace for creating content, analysing information and getting work done. A range of AI tools in one interface, no VPN needed.",
    "и ещё десятки AI-моделей": "and dozens more AI models",
    "От создания до анализа": "From creation to analysis",
    "Тексты": "Text",
    "Генерация и редактирование текстов для разных задач.": "Generating and editing text for any task.",
    "Изображения": "Images",
    "Создание и точечное редактирование: фон, одежда, поза и выражение лица.":
      "Creating and fine-tuning images: background, clothing, pose and facial expression.",
    "Видео": "Video",
    "Создание видео длительностью до 30 секунд за одну генерацию.": "Videos up to 30 seconds long in a single generation.",
    "Аудио": "Audio",
    "Транскрибация и расшифровка записей.": "Transcribing recordings.",
    "Документы": "Documents",
    "Ответы на вопросы по содержанию и поиск нужной информации.": "Answers about document contents and finding the information you need.",
    "Таблицы и данные": "Spreadsheets and data",
    "Работа со структурированной информацией и рабочими данными.": "Working with structured information and business data.",
    "Панда за ноутбуком, над ним — голографическая карточка «Маркетинг» с графиком роста":
      "A panda at a laptop with a holographic “Marketing” card showing a growth chart",
    "Эксперты для рабочих задач": "Experts for everyday work",
    "Маркетолог": "Marketer",
    "SEO-специалист": "SEO specialist",
    "SMM-менеджер": "SMM manager",
    "Продуктолог": "Product manager",
    "Бренд-стратег": "Brand strategist",
    "Мастер продаж": "Sales pro",
    "Светящийся куб с мозгом собирает файлы PDF, Word, Google Drive и папки":
      "A glowing cube with a brain gathering PDF, Word and Google Drive files and folders",
    "Ассистент под конкретные цели": "An assistant for your goals",
    "Создание AI-ассистента с собственной базой знаний и настройкой под нужные задачи.":
      "Build an AI assistant with its own knowledge base, tuned to the tasks you need.",
    "Доступ и": "Access and ",
    "реферальная": "the referral ",
    "программа": "programme",
    "Доступ в одном кабинете": "Access in one workspace",
    "Работа без VPN и переключения между сервисами. Оплата российской картой или через СБП.":
      "No VPN and no switching between services. Pay with a Russian card or via SBP.",
    "Реферальная программа": "Referral programme",
    "Вознаграждение дополнительными кредитами или деньгами за приглашённых участников после регистрации, подтверждения почты и первого запроса.":
      "Earn extra credits or money for each person you invite once they sign up, confirm their email and make their first request.",

    /* --- Habibi Pay --- */
    "Habibi Pay — виртуальная карта Visa/Mastercard с криптокошельком": "Habibi Pay — a virtual Visa/Mastercard with a crypto wallet",
    "Habibi Pay объединяет криптокошелёк и виртуальную карту Visa/Mastercard: пополнение по курсу 1:1, бесплатное обслуживание, Apple Pay, Google Pay и оплата по QR.":
      "Habibi Pay combines a crypto wallet and a virtual Visa/Mastercard: 1:1 top-ups, no service fee, Apple Pay, Google Pay and QR payments.",
    "Виртуальная карта Visa/Mastercard с криптокошельком": "A virtual Visa/Mastercard with a crypto wallet",
    "Habibi Pay объединяет криптокошелёк и виртуальную карту. Сервис позволяет хранить цифровые активы и использовать их для покупок, оплаты сервисов и повседневных расходов.":
      "Habibi Pay combines a crypto wallet and a virtual card. Keep your digital assets and use them for purchases, services and everyday spending.",
    "характеристики карты": "card features",
    "Бесплатное обслуживание": "No service fee",
    "Обслуживание карты — 0 $, без регулярной платы.": "Card service costs $0, with no recurring fee.",
    "Пополнение по курсу 1:1": "1:1 top-ups",
    "При пополнении карты 1 USDT равен 1 $": "When you top up the card, 1 USDT equals $1.",
    "До 250 000$ в день": "Up to $250,000 a day",
    "Дневной лимит расходов по карте — до 250 000 $.": "Daily card spending limit of up to $250,000.",
    "Одна карта для разных платежей": "One card for every kind of payment",
    "Habibi Card — виртуальная Visa или Mastercard для онлайн- и офлайн-платежей: в интернете, магазинах и кафе.":
      "Habibi Card is a virtual Visa or Mastercard for online and in-person payments: on the web, in shops and in cafés.",
    "Виртуальная карта Habibi Pay": "Habibi Pay virtual card",
    "Бесконтактная оплата": "Contactless payments",
    "Поддержка Apple Pay и Google Pay для платежей смартфоном.": "Apple Pay and Google Pay support for paying with your phone.",
    "Оплата по QR": "QR payments",
    "Оплата по QR-коду через СБП в России, а также в Таиланде, Вьетнаме, Камбодже и Лаосе.":
      "Pay by QR code via SBP in Russia, and in Thailand, Vietnam, Cambodia and Laos.",
    "Защита 3–D Secure": "3‑D Secure protection",
    "Дополнительная проверка при онлайн-платежах.": "An extra check for online payments.",
    "Оплата цифровых сервисов": "Paying for digital services",
    "И многие другие": "And many more",
    "Карта и кошелёк": "Card and wallet ",
    "в одном кабинете": "in one account",
    "Управление активами, картой и операциями доступно в браузере и приложениях для iOS и Android.":
      "Manage your assets, card and transactions in the browser and in the iOS and Android apps.",
    "Пополнение карты": "Card top-up",
    "Перевод средств с криптокошелька на Habibi Card.": "Move funds from your crypto wallet to your Habibi Card.",
    "Вывод на карту": "Withdraw to a card",
    "Вывод криптовалюты на банковскую карту по её номеру.": "Withdraw crypto to any bank card by its number.",
    "Мобильная связь": "Mobile top-up",
    "Оплата услуг российских мобильных операторов.": "Pay Russian mobile carriers.",
    "Пополнение Steam": "Steam top-up",
    "Перевод средств напрямую с кошелька.": "Transfer funds straight from your wallet.",
    "Поддержка 24/7": "24/7 support",
    "Круглосуточная помощь по карте, кошельку и платежам.": "Round-the-clock help with your card, wallet and payments.",
    "Вознаграждения после выполнения условий программы.": "Rewards once you meet the programme terms.",
  };
  for (var c = 1; c <= 10; c++) EN["Ячейка " + c] = "Cell " + c;
  for (var r = 1; r <= 12; r++) EN["Ранг " + r] = "Rank " + r;
  [5, 6, 7, 8, 9, 10].forEach(function (p) { EN[p + "% в месяц"] = p + "% a month"; });
  [80, 101, 125, 152, 181, 214].forEach(function (p) { EN[p + "% годовых"] = p + "% a year"; });

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
