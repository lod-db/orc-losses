/* Shared i18n dictionary for all prototypes.
 * Locales mirror the production site: en, fr, de, uk, ru.
 * Longer passages are reused from docs/_data/translations.yml. */
"use strict";

const LOCALES = [
  { code: "en", name: "English" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "uk", name: "Українська" },
  { code: "ru", name: "Русский" },
];

const I18N = {
  en: {
    title: "Russian Losses in Ukraine",
    tagline: "Daily-updated tracker of Russian personnel and equipment losses, from official reports of the Ministry of Defence of Ukraine.",
    updated: "Updated",
    asOf: "as of",
    dayOfWar: "Day {n} of the full-scale invasion",
    warLength: "Length of the war",
    personnel: "Personnel",
    tanks: "Tanks",
    afvs: "Armored Fighting Vehicles",
    artillery: "Artillery",
    rocketSystems: "Rocket Systems",
    airDefense: "Anti-Air Systems",
    fixedWingAircraft: "Planes",
    rotaryWingAircraft: "Helicopters",
    uavs: "Drones (UAVs)",
    missiles: "Missiles",
    ships: "Ships",
    submarines: "Submarines",
    unarmoredVehicles: "Vehicles & Fuel Tanks",
    specialEquipment: "Special Equipment",
    today: "today",
    past7: "past 7 days",
    past30: "past 30 days",
    total: "Total",
    totalLosses: "Total losses",
    dailyLosses: "Daily losses",
    cumulative: "Cumulative",
    daily: "Daily",
    casualties: "casualties",
    equipmentPieces: "pieces of equipment",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    language: "Language",
    sources: "Sources & Methodology",
    disclaimer: "Figures are compiled from the daily official reports of the Ministry of Defence of Ukraine and carry a likely bias. They are the most consistently reported numbers on the war, but should not be considered definitive. The dataset is maintained openly on GitHub — verify independently and use responsibly.",
    sourceMod: "Ministry of Defence of Ukraine",
    openData: "Open data on GitHub",
    resources: "Follow the war",
    resourcesIntro: "Independent, credible places to go deeper.",
    resDeepstate: "Live interactive map of the frontline.",
    resOryx: "Visually-confirmed equipment losses on both sides (OSINT).",
    resOversight: "Official U.S. oversight of aid to Ukraine.",
    resUkraine: "Official website of Ukraine — verified news and updates.",
    resMod: "Official reports and statements — the source of this dataset.",
    milestones: "Milestones",
    share: "Share",
    rangeAll: "All",
    range1y: "1 yr",
    range90: "90 days",
    range30: "30 days",
    passed: "passed",
    on: "on",
    viewData: "View the raw data",
    preamble1: "On February 24th 2022, Russia launched a full-scale invasion of Ukraine, sparking the largest conflict in Europe since World War II. Since the start of its war in Ukraine, Russia has suffered approximately",
    preamble2: "casualties and lost over",
    preamble3: "pieces of equipment as of",
    days: "days",
    perDayAvg: "avg. per day, past 30 days",
    briefingKicker: "The daily report",
    tableCategory: "Category",
    noteToday: "Change vs. yesterday's report",
  },
  fr: {
    title: "Pertes russes en Ukraine",
    tagline: "Suivi quotidien des pertes russes en personnel et en équipement, d'après les rapports officiels du ministère de la Défense de l'Ukraine.",
    updated: "Mis à jour",
    asOf: "au",
    dayOfWar: "Jour {n} de l'invasion à grande échelle",
    warLength: "Durée de la guerre",
    personnel: "Personnel",
    tanks: "Chars",
    afvs: "Véhicules blindés de combat",
    artillery: "Artillerie",
    rocketSystems: "Systèmes de roquettes",
    airDefense: "Systèmes anti-aériens",
    fixedWingAircraft: "Avions",
    rotaryWingAircraft: "Hélicoptères",
    uavs: "Drones (UAV)",
    missiles: "Missiles",
    ships: "Navires",
    submarines: "Sous-marins",
    unarmoredVehicles: "Véhicules non blindés",
    specialEquipment: "Équipement spécial",
    today: "aujourd'hui",
    past7: "7 derniers jours",
    past30: "30 derniers jours",
    total: "Total",
    totalLosses: "Pertes totales",
    dailyLosses: "Pertes quotidiennes",
    cumulative: "Cumulé",
    daily: "Quotidien",
    casualties: "pertes humaines",
    equipmentPieces: "pièces d'équipement",
    theme: "Thème",
    light: "Clair",
    dark: "Sombre",
    language: "Langue",
    sources: "Sources et méthodologie",
    disclaimer: "Les chiffres proviennent des rapports officiels quotidiens du ministère de la Défense de l'Ukraine et peuvent contenir un biais. Ce sont les chiffres les plus régulièrement rapportés sur la guerre, mais ils ne doivent pas être considérés comme définitifs. Le jeu de données est maintenu publiquement sur GitHub — vérifiez de manière indépendante et utilisez de façon responsable.",
    sourceMod: "Ministère de la Défense de l'Ukraine",
    openData: "Données ouvertes sur GitHub",
    resources: "Suivre la guerre",
    resourcesIntro: "Des ressources indépendantes et crédibles pour approfondir.",
    resDeepstate: "Carte interactive en temps réel de la ligne de front.",
    resOryx: "Pertes d'équipement confirmées visuellement des deux côtés (OSINT).",
    resOversight: "Suivi officiel américain de l'aide à l'Ukraine.",
    resUkraine: "Site officiel de l'Ukraine — informations vérifiées.",
    resMod: "Rapports et déclarations officiels — la source de ce jeu de données.",
    milestones: "Jalons",
    share: "Partager",
    rangeAll: "Tout",
    range1y: "1 an",
    range90: "90 jours",
    range30: "30 jours",
    passed: "a dépassé",
    on: "le",
    viewData: "Voir les données brutes",
    preamble1: "Le 24 février 2022, la Russie a lancé une invasion à grande échelle de l'Ukraine, déclenchant le plus grand conflit en Europe depuis la Seconde Guerre mondiale. Depuis le début de sa guerre en Ukraine, la Russie a subi environ",
    preamble2: "pertes humaines et perdu plus de",
    preamble3: "pièces d'équipement au",
    days: "jours",
    perDayAvg: "moy. par jour, 30 derniers jours",
    briefingKicker: "Le rapport quotidien",
    tableCategory: "Catégorie",
    noteToday: "Évolution par rapport au rapport d'hier",
  },
  de: {
    title: "Russische Verluste in der Ukraine",
    tagline: "Täglich aktualisierte Übersicht der russischen Verluste an Personal und Ausrüstung, nach offiziellen Berichten des Verteidigungsministeriums der Ukraine.",
    updated: "Aktualisiert",
    asOf: "Stand",
    dayOfWar: "Tag {n} der groß angelegten Invasion",
    warLength: "Dauer des Krieges",
    personnel: "Personal",
    tanks: "Panzer",
    afvs: "Gepanzerte Kampffahrzeuge",
    artillery: "Artillerie",
    rocketSystems: "Raketenwerfersysteme",
    airDefense: "Luftabwehrsysteme",
    fixedWingAircraft: "Flugzeuge",
    rotaryWingAircraft: "Hubschrauber",
    uavs: "Drohnen (UAV)",
    missiles: "Raketen",
    ships: "Schiffe",
    submarines: "U-Boote",
    unarmoredVehicles: "Ungepanzerte Fahrzeuge",
    specialEquipment: "Spezielle Ausrüstung",
    today: "heute",
    past7: "letzte 7 Tage",
    past30: "letzte 30 Tage",
    total: "Gesamt",
    totalLosses: "Gesamtverluste",
    dailyLosses: "Tägliche Verluste",
    cumulative: "Kumuliert",
    daily: "Täglich",
    casualties: "Verluste",
    equipmentPieces: "Ausrüstungsgegenstände",
    theme: "Thema",
    light: "Hell",
    dark: "Dunkel",
    language: "Sprache",
    sources: "Quellen & Methodik",
    disclaimer: "Die Zahlen stammen aus den täglichen offiziellen Berichten des Verteidigungsministeriums der Ukraine und können eine Voreingenommenheit enthalten. Es sind die am beständigsten berichteten Zahlen zum Krieg, sollten jedoch nicht als endgültig betrachtet werden. Der Datensatz wird öffentlich auf GitHub gepflegt — bitte unabhängig prüfen und verantwortungsvoll nutzen.",
    sourceMod: "Verteidigungsministerium der Ukraine",
    openData: "Offene Daten auf GitHub",
    resources: "Den Krieg verfolgen",
    resourcesIntro: "Unabhängige, glaubwürdige Quellen zum Vertiefen.",
    resDeepstate: "Interaktive Live-Karte der Frontlinie.",
    resOryx: "Visuell bestätigte Ausrüstungsverluste beider Seiten (OSINT).",
    resOversight: "Offizielle US-Aufsicht über die Ukraine-Hilfe.",
    resUkraine: "Offizielle Website der Ukraine — verifizierte Nachrichten.",
    resMod: "Offizielle Berichte und Erklärungen — die Quelle dieses Datensatzes.",
    milestones: "Meilensteine",
    share: "Teilen",
    rangeAll: "Alles",
    range1y: "1 Jahr",
    range90: "90 Tage",
    range30: "30 Tage",
    passed: "überschritt",
    on: "am",
    viewData: "Rohdaten ansehen",
    preamble1: "Am 24. Februar 2022 startete Russland eine groß angelegte Invasion der Ukraine und löste damit den größten Konflikt in Europa seit dem Zweiten Weltkrieg aus. Seit Beginn seines Krieges in der Ukraine hat Russland etwa",
    preamble2: "Verluste erlitten und über",
    preamble3: "Ausrüstungsgegenstände verloren, Stand",
    days: "Tage",
    perDayAvg: "Ø pro Tag, letzte 30 Tage",
    briefingKicker: "Der tägliche Bericht",
    tableCategory: "Kategorie",
    noteToday: "Veränderung gegenüber dem gestrigen Bericht",
  },
  uk: {
    title: "Втрати Росії в Україні",
    tagline: "Щоденний трекер втрат Росії в живій силі та техніці за офіційними звітами Міністерства оборони України.",
    updated: "Оновлено",
    asOf: "станом на",
    dayOfWar: "День {n} повномасштабного вторгнення",
    warLength: "Тривалість війни",
    personnel: "Особовий склад",
    tanks: "Танки",
    afvs: "Броньовані бойові машини",
    artillery: "Артилерія",
    rocketSystems: "РСЗВ",
    airDefense: "Засоби ППО",
    fixedWingAircraft: "Літаки",
    rotaryWingAircraft: "Гелікоптери",
    uavs: "Безпілотники (БПЛА)",
    missiles: "Ракети",
    ships: "Кораблі",
    submarines: "Підводні човни",
    unarmoredVehicles: "Автомобілі та автоцистерни",
    specialEquipment: "Спеціальна техніка",
    today: "сьогодні",
    past7: "за 7 днів",
    past30: "за 30 днів",
    total: "Всього",
    totalLosses: "Загальні втрати",
    dailyLosses: "Щоденні втрати",
    cumulative: "Накопичено",
    daily: "Щоденно",
    casualties: "втрат особового складу",
    equipmentPieces: "одиниць техніки",
    theme: "Тема",
    light: "Світла",
    dark: "Темна",
    language: "Мова",
    sources: "Джерела та методологія",
    disclaimer: "Цифри зібрані з щоденних офіційних звітів Міністерства оборони України і можуть містити упередженість. Це найбільш послідовно звітовані дані про війну, але їх не слід вважати остаточними. Набір даних відкрито підтримується на GitHub — перевіряйте самостійно та використовуйте відповідально.",
    sourceMod: "Міністерство оборони України",
    openData: "Відкриті дані на GitHub",
    resources: "Слідкуйте за війною",
    resourcesIntro: "Незалежні, надійні джерела для глибшого розуміння.",
    resDeepstate: "Інтерактивна мапа лінії фронту в реальному часі.",
    resOryx: "Візуально підтверджені втрати техніки обох сторін (OSINT).",
    resOversight: "Офіційний нагляд США за допомогою Україні.",
    resUkraine: "Офіційний вебсайт України — перевірені новини та оновлення.",
    resMod: "Офіційні звіти та заяви — джерело цього набору даних.",
    milestones: "Ключові позначки",
    share: "Поширити",
    rangeAll: "Все",
    range1y: "1 рік",
    range90: "90 днів",
    range30: "30 днів",
    passed: "перевищено",
    on: "",
    viewData: "Переглянути дані",
    preamble1: "24 лютого 2022 року Росія розпочала повномасштабне вторгнення в Україну, спричинивши найбільший конфлікт у Європі з часів Другої світової війни. З початку своєї війни в Україні Росія зазнала приблизно",
    preamble2: "втрат і втратила понад",
    preamble3: "одиниць техніки станом на",
    days: "днів",
    perDayAvg: "у середньому за день, останні 30 днів",
    briefingKicker: "Щоденний звіт",
    tableCategory: "Категорія",
    noteToday: "Зміна порівняно з учорашнім звітом",
  },
  ru: {
    title: "Потери России в Украине",
    tagline: "Ежедневно обновляемый трекер потерь России в живой силе и технике по официальным отчётам Министерства обороны Украины.",
    updated: "Обновлено",
    asOf: "по состоянию на",
    dayOfWar: "День {n} полномасштабного вторжения",
    warLength: "Длительность войны",
    personnel: "Личный состав",
    tanks: "Танки",
    afvs: "Бронированные боевые машины",
    artillery: "Артиллерия",
    rocketSystems: "РСЗО",
    airDefense: "Средства ПВО",
    fixedWingAircraft: "Самолёты",
    rotaryWingAircraft: "Вертолёты",
    uavs: "Беспилотники (БПЛА)",
    missiles: "Ракеты",
    ships: "Корабли",
    submarines: "Подводные лодки",
    unarmoredVehicles: "Автомобили и автоцистерны",
    specialEquipment: "Специальная техника",
    today: "сегодня",
    past7: "за 7 дней",
    past30: "за 30 дней",
    total: "Всего",
    totalLosses: "Общие потери",
    dailyLosses: "Ежедневные потери",
    cumulative: "Накоплено",
    daily: "Ежедневно",
    casualties: "потерь личного состава",
    equipmentPieces: "единиц техники",
    theme: "Тема",
    light: "Светлая",
    dark: "Тёмная",
    language: "Язык",
    sources: "Источники и методология",
    disclaimer: "Цифры собраны из ежедневных официальных отчётов Министерства обороны Украины и могут содержать предвзятость. Это наиболее последовательно публикуемые данные о войне, но их не следует считать окончательными. Набор данных открыто поддерживается на GitHub — проверяйте самостоятельно и используйте ответственно.",
    sourceMod: "Министерство обороны Украины",
    openData: "Открытые данные на GitHub",
    resources: "Следить за войной",
    resourcesIntro: "Независимые, надёжные источники для более глубокого изучения.",
    resDeepstate: "Интерактивная карта линии фронта в реальном времени.",
    resOryx: "Визуально подтверждённые потери техники обеих сторон (OSINT).",
    resOversight: "Официальный надзор США за помощью Украине.",
    resUkraine: "Официальный сайт Украины — проверенные новости и обновления.",
    resMod: "Официальные отчёты и заявления — источник этого набора данных.",
    milestones: "Ключевые отметки",
    share: "Поделиться",
    rangeAll: "Всё",
    range1y: "1 год",
    range90: "90 дней",
    range30: "30 дней",
    passed: "превышено",
    on: "",
    viewData: "Посмотреть данные",
    preamble1: "24 февраля 2022 года Россия начала полномасштабное вторжение в Украину, спровоцировав крупнейший конфликт в Европе со времён Второй мировой войны. С начала своей войны в Украине Россия понесла примерно",
    preamble2: "потерь и потеряла более",
    preamble3: "единиц техники по состоянию на",
    days: "дней",
    perDayAvg: "в среднем за день, последние 30 дней",
    briefingKicker: "Ежедневный отчёт",
    tableCategory: "Категория",
    noteToday: "Изменение по сравнению со вчерашним отчётом",
  },
};

/* ?static disables entrance animations (screenshots, reduced motion). */
const STATIC_MODE =
  new URLSearchParams(location.search).has("static") ||
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Locale state: URL param ?lang= wins, then localStorage, then browser. */
function detectLang() {
  const p = new URLSearchParams(location.search).get("lang");
  if (p && I18N[p]) return p;
  const s = localStorage.getItem("uwl-lang");
  if (s && I18N[s]) return s;
  const b = (navigator.language || "en").slice(0, 2);
  return I18N[b] ? b : "en";
}

let CURRENT_LANG = detectLang();

function setLang(code) {
  if (!I18N[code]) return;
  CURRENT_LANG = code;
  localStorage.setItem("uwl-lang", code);
  document.documentElement.lang = code;
}

function t(key, vars) {
  let s = (I18N[CURRENT_LANG] && I18N[CURRENT_LANG][key]) ?? I18N.en[key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll("{" + k + "}", v);
  return s;
}

/* Translate all elements carrying a data-i18n="key" attribute. */
function applyI18nAttrs() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
}

function fmtNum(n) {
  return new Intl.NumberFormat(CURRENT_LANG).format(n);
}

function fmtDate(isoOrDate, style = "long") {
  const d = typeof isoOrDate === "string" ? new Date(isoOrDate + "T00:00:00Z") : isoOrDate;
  return new Intl.DateTimeFormat(CURRENT_LANG, { dateStyle: style, timeZone: "UTC" }).format(d);
}

function fmtCompact(n) {
  return new Intl.NumberFormat(CURRENT_LANG, { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

/* Builds a <select> for languages and wires reload-on-change (simplest robust re-render). */
function buildLangSelect(el, onChange) {
  el.innerHTML = "";
  for (const l of LOCALES) {
    const o = document.createElement("option");
    o.value = l.code;
    o.textContent = l.name;
    if (l.code === CURRENT_LANG) o.selected = true;
    el.appendChild(o);
  }
  el.addEventListener("change", () => {
    setLang(el.value);
    onChange ? onChange(el.value) : location.reload();
  });
}
