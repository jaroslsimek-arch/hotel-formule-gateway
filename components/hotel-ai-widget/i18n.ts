/**
 * Built-in translations for the Redorwhite AI Widget.
 *
 * No external i18n library is required. English ("en") is the complete
 * base; every other locale is deep-merged over it, so any missing string
 * gracefully falls back to English. This makes it trivial to add new
 * locales later (e.g. "pl", "nl") — provide as much or as little as you
 * like and the rest is filled in automatically.
 */

export type Locale = "cs" | "de" | "en" | "pl" | "nl"

/** Role of the assistant, chosen by the active theme. */
export type RoleKey = "concierge" | "sales" | "care" | "clerk" | "tutor"

/** A localized label + description pair for a quick action. */
export interface ActionStrings {
  label: string
  description: string
}

/** Per-theme welcome copy. */
export interface WelcomeStrings {
  welcomeTitle: string
  welcomeText: string
}

export interface CommonStrings {
  /** Presence label, e.g. "Online now". */
  online: string
  /** Launcher helper text, e.g. "Need help?". */
  needHelp: string
  /** Main CTA. `{name}` is replaced with the assistant name. */
  cta: string
  /** Accessible label for the close button. */
  close: string
  /** Accessible label for the launcher / open action. `{name}` supported. */
  openConversation: string
  /** Placeholder text shown inside the chat container. `{name}` supported. */
  chatPlaceholder: string
  /** Accessible label for the assistant region. `{name}` supported. */
  regionLabel: string
}

export interface Strings {
  common: CommonStrings
  roles: Record<RoleKey, string>
  themes: Record<string, WelcomeStrings>
  actions: Record<string, ActionStrings>
}

/** Deep-partial used by non-base locales. */
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

// ---------------------------------------------------------------------------
// English — the complete base. All other locales fall back to these strings.
// ---------------------------------------------------------------------------
const en: Strings = {
  common: {
    online: "Online now",
    needHelp: "Need help?",
    cta: "Ask {name}",
    close: "Close conversation",
    openConversation: "Open chat with {name}",
    chatPlaceholder: "Your conversation with {name} will appear here in a moment…",
    regionLabel: "Digital assistant {name}",
  },
  roles: {
    concierge: "Digital Concierge",
    sales: "Sales Assistant",
    care: "Customer Care",
    clerk: "Information Desk",
    tutor: "Study Advisor",
  },
  themes: {
    hotel: {
      welcomeTitle: "Hello, welcome",
      welcomeText:
        "I'm here to help you with accommodation, our restaurant, trips around the area and everything connected with your stay. Just ask — I'm happy to help.",
    },
    print: {
      welcomeTitle: "Hi, how can I help?",
      welcomeText:
        "I can help you choose products, prepare a quote, send samples or track a delivery. Tell me what you need and I'll take care of it.",
    },
    wine: {
      welcomeTitle: "Welcome to the cellar",
      welcomeText:
        "I'd love to help you discover our wines, arrange a tasting or plan a visit to the vineyard. Ask me anything about our selection.",
    },
    municipality: {
      welcomeTitle: "Hello, how can I help?",
      welcomeText:
        "I can guide you through documents and forms, opening hours, waste collection and local events. Let me know what you're looking for.",
    },
    education: {
      welcomeTitle: "Hello, nice to see you",
      welcomeText:
        "I can help you with courses, enrollment, the timetable and everyday questions about school life. Ask me anything.",
    },
  },
  actions: {
    // hotel
    accommodation: { label: "Accommodation", description: "Rooms & availability" },
    restaurant: { label: "Restaurant", description: "Menu & reservations" },
    wine: { label: "Wine List", description: "Local & house wines" },
    trips: { label: "Trips", description: "Around the area" },
    parking: { label: "Parking", description: "Where to leave the car" },
    reception: { label: "Contact Reception", description: "We're happy to help" },
    // print
    products: { label: "Products", description: "Browse what we print" },
    quote: { label: "Get a Quote", description: "Fast, no obligation" },
    samples: { label: "Samples", description: "Feel the quality" },
    delivery: { label: "Delivery", description: "Track your order" },
    contact: { label: "Contact Us", description: "We're here for you" },
    // wine
    wines: { label: "Our Wines", description: "Explore the selection" },
    tasting: { label: "Tasting", description: "Book a session" },
    vineyard: { label: "Vineyard Visit", description: "Come and see us" },
    shop: { label: "Wine Shop", description: "Order your favourites" },
    // municipality
    documents: { label: "Documents", description: "Forms & applications" },
    hours: { label: "Opening Hours", description: "When we're open" },
    waste: { label: "Waste Collection", description: "Schedule & sorting" },
    events: { label: "Local Events", description: "What's happening" },
    // education
    courses: { label: "Courses", description: "What you can study" },
    enrollment: { label: "Enrollment", description: "How to apply" },
    schedule: { label: "Timetable", description: "Lessons & terms" },
    canteen: { label: "Canteen", description: "Menu & meal plans" },
  },
}

// ---------------------------------------------------------------------------
// Czech
// ---------------------------------------------------------------------------
const cs: DeepPartial<Strings> = {
  common: {
    online: "Online",
    needHelp: "Potřebujete poradit?",
    cta: "Zeptat se {name}",
    close: "Zavřít konverzaci",
    openConversation: "Otevřít chat s {name}",
    chatPlaceholder: "Vaše konverzace s {name} se za chvíli zobrazí zde…",
    regionLabel: "Digitální asistentka {name}",
  },
  roles: {
    concierge: "Digitální concierge",
    sales: "Obchodní asistent",
    care: "Zákaznická péče",
    clerk: "Informační přepážka",
    tutor: "Studijní poradce",
  },
  themes: {
    hotel: {
      welcomeTitle: "Dobrý den, vítejte",
      welcomeText:
        "Ráda vám pomohu s ubytováním, naší restaurací, výlety po okolí a se vším, co souvisí s vaším pobytem. Stačí se zeptat — ráda poradím.",
    },
    print: {
      welcomeTitle: "Dobrý den, jak mohu pomoci?",
      welcomeText:
        "Pomohu vám vybrat produkty, připravit cenovou nabídku, poslat vzorky nebo sledovat zásilku. Řekněte mi, co potřebujete.",
    },
    wine: {
      welcomeTitle: "Vítejte ve sklepě",
      welcomeText:
        "Ráda vám pomohu objevit naše vína, domluvit degustaci nebo naplánovat návštěvu vinice. Zeptejte se na cokoli z naší nabídky.",
    },
    municipality: {
      welcomeTitle: "Dobrý den, jak mohu pomoci?",
      welcomeText:
        "Provedu vás dokumenty a formuláři, otevírací dobou, svozem odpadu i místními akcemi. Dejte mi vědět, co hledáte.",
    },
    education: {
      welcomeTitle: "Dobrý den, ráda vás vidím",
      welcomeText:
        "Pomohu vám s kurzy, přihláškou, rozvrhem i běžnými dotazy o životě ve škole. Klidně se ptejte.",
    },
  },
  actions: {
    accommodation: { label: "Ubytování", description: "Pokoje a dostupnost" },
    restaurant: { label: "Restaurace", description: "Menu a rezervace" },
    wine: { label: "Vinný lístek", description: "Místní a domácí vína" },
    trips: { label: "Výlety", description: "Po okolí" },
    parking: { label: "Parkování", description: "Kde zaparkovat" },
    reception: { label: "Recepce", description: "Rádi pomůžeme" },
    products: { label: "Produkty", description: "Co tiskneme" },
    quote: { label: "Cenová nabídka", description: "Rychle a nezávazně" },
    samples: { label: "Vzorky", description: "Vyzkoušejte kvalitu" },
    delivery: { label: "Doručení", description: "Sledujte objednávku" },
    contact: { label: "Kontakt", description: "Jsme tu pro vás" },
    wines: { label: "Naše vína", description: "Prozkoumejte nabídku" },
    tasting: { label: "Degustace", description: "Rezervujte si termín" },
    vineyard: { label: "Návštěva vinice", description: "Přijeďte se podívat" },
    shop: { label: "Vinotéka", description: "Objednejte oblíbená vína" },
    documents: { label: "Dokumenty", description: "Formuláře a žádosti" },
    hours: { label: "Otevírací doba", description: "Kdy máme otevřeno" },
    waste: { label: "Svoz odpadu", description: "Harmonogram a třídění" },
    events: { label: "Místní akce", description: "Co se děje" },
    courses: { label: "Kurzy", description: "Co můžete studovat" },
    enrollment: { label: "Přihláška", description: "Jak se přihlásit" },
    schedule: { label: "Rozvrh", description: "Výuka a termíny" },
    canteen: { label: "Jídelna", description: "Menu a stravování" },
  },
}

// ---------------------------------------------------------------------------
// German
// ---------------------------------------------------------------------------
const de: DeepPartial<Strings> = {
  common: {
    online: "Jetzt online",
    needHelp: "Brauchen Sie Hilfe?",
    cta: "{name} fragen",
    close: "Unterhaltung schließen",
    openConversation: "Chat mit {name} öffnen",
    chatPlaceholder: "Ihre Unterhaltung mit {name} erscheint gleich hier…",
    regionLabel: "Digitale Assistentin {name}",
  },
  roles: {
    concierge: "Digitaler Concierge",
    sales: "Vertriebsassistent",
    care: "Kundenservice",
    clerk: "Information",
    tutor: "Studienberatung",
  },
  themes: {
    hotel: {
      welcomeTitle: "Hallo, herzlich willkommen",
      welcomeText:
        "Ich helfe Ihnen gerne bei Unterkunft, unserem Restaurant, Ausflügen in der Umgebung und allem rund um Ihren Aufenthalt. Fragen Sie einfach — ich helfe gern.",
    },
    print: {
      welcomeTitle: "Hallo, wie kann ich helfen?",
      welcomeText:
        "Ich helfe Ihnen bei der Produktauswahl, erstelle ein Angebot, sende Muster oder verfolge eine Lieferung. Sagen Sie mir, was Sie brauchen.",
    },
    wine: {
      welcomeTitle: "Willkommen im Weinkeller",
      welcomeText:
        "Gerne helfe ich Ihnen, unsere Weine zu entdecken, eine Verkostung zu vereinbaren oder einen Besuch im Weinberg zu planen. Fragen Sie mich alles.",
    },
    municipality: {
      welcomeTitle: "Hallo, wie kann ich helfen?",
      welcomeText:
        "Ich führe Sie durch Dokumente und Formulare, Öffnungszeiten, Abfallabholung und lokale Veranstaltungen. Sagen Sie mir, was Sie suchen.",
    },
    education: {
      welcomeTitle: "Hallo, schön Sie zu sehen",
      welcomeText:
        "Ich helfe Ihnen bei Kursen, Anmeldung, Stundenplan und allen Fragen rund um den Schulalltag. Fragen Sie einfach.",
    },
  },
  actions: {
    accommodation: { label: "Unterkunft", description: "Zimmer & Verfügbarkeit" },
    restaurant: { label: "Restaurant", description: "Menü & Reservierungen" },
    wine: { label: "Weinkarte", description: "Regionale & Hausweine" },
    trips: { label: "Ausflüge", description: "In der Umgebung" },
    parking: { label: "Parken", description: "Wo Sie parken können" },
    reception: { label: "Rezeption", description: "Wir helfen gern" },
    products: { label: "Produkte", description: "Was wir drucken" },
    quote: { label: "Angebot", description: "Schnell & unverbindlich" },
    samples: { label: "Muster", description: "Qualität erleben" },
    delivery: { label: "Lieferung", description: "Bestellung verfolgen" },
    contact: { label: "Kontakt", description: "Wir sind für Sie da" },
    wines: { label: "Unsere Weine", description: "Auswahl entdecken" },
    tasting: { label: "Verkostung", description: "Termin buchen" },
    vineyard: { label: "Weinbergbesuch", description: "Besuchen Sie uns" },
    shop: { label: "Weinshop", description: "Favoriten bestellen" },
    documents: { label: "Dokumente", description: "Formulare & Anträge" },
    hours: { label: "Öffnungszeiten", description: "Wann wir geöffnet sind" },
    waste: { label: "Abfallabholung", description: "Termine & Trennung" },
    events: { label: "Veranstaltungen", description: "Was ansteht" },
    courses: { label: "Kurse", description: "Was Sie lernen können" },
    enrollment: { label: "Anmeldung", description: "So bewerben Sie sich" },
    schedule: { label: "Stundenplan", description: "Unterricht & Termine" },
    canteen: { label: "Mensa", description: "Menü & Essenspläne" },
  },
}

// ---------------------------------------------------------------------------
// Future locales — add strings here and they merge over English automatically.
// Left intentionally minimal to demonstrate the fallback architecture.
// ---------------------------------------------------------------------------
const pl: DeepPartial<Strings> = {}
const nl: DeepPartial<Strings> = {}

const LOCALES: Record<Locale, DeepPartial<Strings>> = { en, cs, de, pl, nl }

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

/** Deep-merge `override` onto `base`, returning a new object. */
function deepMerge<T extends Record<string, unknown>>(base: T, override: DeepPartial<T>): T {
  const out: Record<string, unknown> = { ...base }
  for (const key of Object.keys(override)) {
    const o = (override as Record<string, unknown>)[key]
    const b = (base as Record<string, unknown>)[key]
    if (isObject(b) && isObject(o)) {
      out[key] = deepMerge(b, o as DeepPartial<typeof b>)
    } else if (o !== undefined) {
      out[key] = o
    }
  }
  return out as T
}

/**
 * Resolve the complete string table for a locale, falling back to English
 * for anything not provided by that locale.
 */
export function resolveStrings(locale: Locale): Strings {
  if (locale === "en") return en
  const override = LOCALES[locale] ?? {}
  return deepMerge(en as unknown as Record<string, unknown>, override) as unknown as Strings
}

/** Replace `{name}` (and other simple tokens) in a template string. */
export function interpolate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? `{${key}}`)
}

export const SUPPORTED_LOCALES = Object.keys(LOCALES) as Locale[]
