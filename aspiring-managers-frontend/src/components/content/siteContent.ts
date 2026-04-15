export type NavItem = {
  label: string;
  href: string;
};

export type CtaLink = {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  note?: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export const brandAssets = {
  fullLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663526355932/EeuJFgS4qYFE93HezKFf8g/Asset15@20x_fde0f2f9.webp",
  iconLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663526355932/EeuJFgS4qYFE93HezKFf8g/Asset12@20x_ad8713ea.png",
  wordmarkLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663526355932/EeuJFgS4qYFE93HezKFf8g/Asset14@20x_3906a473.webp",
  monogramLogo: "https://d2xsxph8kpxj0f.cloudfront.net/310519663526355932/EeuJFgS4qYFE93HezKFf8g/Asset13@20x_80cf0861.png",
  heroBackground: "https://d2xsxph8kpxj0f.cloudfront.net/310519663526355932/EeuJFgS4qYFE93HezKFf8g/aspiring-hero-editorial-bg_684f8e0b.png",
  mentorshipAbstract: "https://d2xsxph8kpxj0f.cloudfront.net/310519663526355932/EeuJFgS4qYFE93HezKFf8g/aspiring-mentorship-abstract-cards_eca28131.png",
  florinPortrait: "https://d2xsxph8kpxj0f.cloudfront.net/310519663526355932/EeuJFgS4qYFE93HezKFf8g/Florin_Hero_SVG1_a9860255.png",
  b2bBackground: "https://d2xsxph8kpxj0f.cloudfront.net/310519663526355932/EeuJFgS4qYFE93HezKFf8g/aspiring-b2b-geometric-wave_0f985448.png",
} as const;
export const contactLinks = {
  quiz: "#quiz",
  discoveryCall: "https://scheduler.zoom.us/florin-stoleriu/invitatie-la-discutie-1-la-1",
  mentorshipHour: "/ora-de-mentorat",
  mentorshipProgram: "/program-mentorat",
  b2bOffer: "/cursuri-management-b2b",
  webinar: "/webinar",
  contact: "mailto:contact@aspiringmanagers.ro",
} as const;

export const navItems: NavItem[] = [
  { label: "Acasă", href: "/" },
  { label: "Despre mine", href: "/despre-mine" },
  { label: "Program mentorat", href: "/program-mentorat" },
  { label: "Ora de mentorat", href: "/ora-de-mentorat" },
  { label: "Cursuri B2B", href: "/cursuri-management-b2b" },
];

export const siteFooter = {
  title: "Aspiring Managers",
  description:
    "Mentorat și training aplicat pentru manageri aflați în tranziția de la execuție la leadership, construit pe experiență reală, nu pe teorie generică.",
  columns: [
    {
      title: "Pagini",
      links: navItems,
    },
    {
      title: "Acțiuni rapide",
      links: [
        { label: "Tu ce fel de manager esti? Fa quizul de 2 minute", href: contactLinks.quiz },
        { label: "Stabileste o discutie gratuita", href: contactLinks.discoveryCall },
        { label: "Contact", href: contactLinks.contact },
      ],
    },
  ],
  note:
    "",
};

export const homepageContent = {
  hero: {
    eyebrow: "Pentru managerii care au fost promovați pentru rezultate, nu pregătiți pentru haosul noii etape.",
    title: "Ai fost promovat pentru că ești un bun profesionist. Acum trebuie să devii un lider.",
    description:
      "Aspiring Managers te ajută să treci de la reacție și presiune la claritate, structură și încredere, prin mentorat și training aplicat pe situații reale.",
    ctas: [
      {
        label: "Tu ce fel de manager esti? Fa quizul de 2 minute",
        href: contactLinks.quiz,
        variant: "primary",
        note: "Quiz gratuit. Durează 2 minute.",
      },
      {
        label: "Stabileste o discutie gratuita",
        href: contactLinks.discoveryCall,
        variant: "secondary",
      },
    ] satisfies CtaLink[],
    stats: [
      { value: "25+", label: "ani de top management" },
      { value: "220+", label: "oameni coordonați în echipe" },
      { value: "2 luni", label: "pentru un sistem aplicabil" },
    ],
  },
  problem: {
    title: "Ești bun la ce faci. Dar managementul e altceva.",
    paragraphs: [
      "Ai primit promovarea, poate chiar ai simțit că o meriți. Dar de atunci, ceva s-a schimbat. Dimineața, înainte să deschizi laptopul, simți o greutate pe care n-o știai înainte: e prea mult, vine din prea multe direcții și nu mai știi ce să faci primul.",
      "Echipa așteaptă să fii sigur pe tine, șeful tău așteaptă rezultate, iar foștii colegi te privesc acum diferit. Vrei să fii corect și calm, dar uneori simți că, dacă ești prea blând, nu vei fi luat în serios, iar dacă devii prea dur, pierzi tocmai relațiile pe care ai muncit să le construiești.",
      "Nu e vina ta. Nimeni nu te-a pregătit cu adevărat pentru tranziția asta. Problema nu e că ești nepotrivit pentru rol. Problema e că ai preluat un job nou fără manual de utilizare.",
    ],
  },
  aboutFlorin: {
    title: "Cum te pot ajuta?",
    paragraphs: [
      "Am început ca specialist în vânzări și am descoperit foarte repede cât de diferit este să faci tu treaba față de a obține rezultate prin alții. Am făcut greșeli, am pierdut oameni buni, am avut conversații dificile și am învățat, de cele mai multe ori, direct din teren.",
      "În 25 de ani de management, am condus echipe de peste 220 de oameni la Bergenbier, am fost Commercial Director la Policolor, am lucrat în AB InBev România în roluri de Area Sales Manager, Trade Marketing Manager și Modern Trade Director și am ocupat funcții de General Manager și Senior Consultant în companii precum Martens și Mogyi.",
      "Am creat Aspiring Managers pentru ca tu să nu pierzi ani din carieră învățând prin trial and error ceea ce se poate învăța structurat, cu cineva care a trecut deja pe acolo. Nu predau teorie. Îți arăt ce a funcționat când eram în locul tău.",
    ],
    quote:
      "Nu predau teorie. Îți arăt ce am făcut eu când eram în locul tău și ce a funcționat.",
  },
  services: {
    title: "Alege formatul care ți se potrivește",
    items: [
      {
        title: "Ora de mentorat",
        description:
          "Ai o situație concretă care nu poate aștepta: un conflict, o decizie dificilă sau o conversație pe care o eviți. Rezervi o oră, discuți confidențial și ieși cu o direcție clară.",
        href: contactLinks.mentorshipHour,
        cta: "Rezervă o oră cu Florin",
      },
      {
        title: "Programul de mentorat Aspiring Managers",
        description:
          "Două luni și 8 module care acoperă delegarea, feedbackul, conflictele, comunicarea cu top managementul, motivarea echipei și managementul performanței.",
        href: contactLinks.mentorshipProgram,
        cta: "Află mai multe despre program",
      },
      {
        title: "Webinarul lunar",
        description:
          "O dată pe lună, un subiect de management tratat live, cu profunzime și aplicabilitate imediată, plus sesiune de întrebări și răspunsuri pe situații reale.",
        href: contactLinks.webinar,
        cta: "Înscrie-te la următorul webinar",
      },
      {
        title: "Cursuri B2B personalizate",
        description:
          "Pentru companii și echipe de HR care vor mai mult decât training generic: audităm, identificăm blocajele reale și livrăm programe cu impact măsurabil.",
        href: contactLinks.b2bOffer,
        cta: "Solicită o ofertă pentru compania ta",
      },
    ],
  },
  process: {
    title: "Trei pași până la mai multă claritate",
    steps: [
      {
        number: "01",
        title: "Tu ce fel de manager esti? Fa quizul de 2 minute",
        description:
          "Quizul durează 2 minute și îți arată în ce categorie te încadrezi și ce provocări sunt specifice situației tale.",
      },
      {
        number: "02",
        title: "Alegi formatul potrivit pentru tine",
        description:
          "Pe baza rezultatului, te orientăm spre resursa cea mai relevantă pentru etapa în care te afli acum.",
      },
      {
        number: "03",
        title: "Începi să conduci cu mai multă claritate și mai puțin stres",
        description:
          "Primești pași concreți, adaptați situației tale, pe care îi poți aplica de luni dimineață.",
      },
    ],
    cta: {
      label: "Tu ce fel de manager esti? Fa quizul de 2 minute",
      href: contactLinks.quiz,
      variant: "primary",
    } satisfies CtaLink,
  },
  audience: {
    title: "Aspiring Managers este pentru tine dacă...",
    description:
      "Ești manager de mai puțin de 3 ani sau ești în primele luni după o promovare recentă. Ai venit dintr-un rol de specialist și acum conduci oameni pentru prima dată. Vrei să fii un manager bun, nu doar să supraviețuiești în rol, și ai nevoie de cineva care a mai trecut pe acolo și îți poate spune direct ce să faci.",
  },
  testimonials: {
    title: "Ce spun managerii cu care am lucrat",
    items: [
      {
        quote:
        "Cu Florin am învățat ceva ce nu îți spune nimeni la promovare: cum să gestionezi oamenii dificili fără să intri în conflict. M-a ghidat cu exemple reale și soluții simple. Datorită lui, primele luni ca manager au fost o lecție de creștere, nu un haos.",
        author: "Darius Drăghiceanu",
        role: "Regional Sales Manager",
      },
      {
        quote:
          "Credeam că trebuie să știu totul ca să fiu un lider bun. Florin Stoleriu mi-a schimbat complet perspectiva. M-a ajutat să-mi găsesc stilul de conducere, să dau feedback fără teamă și să câștig respectul echipei. A contat enorm.",
        author: "Irinel Ilie",
        role: "Regional Sales Manager",
      },
      {
        quote:
          "Lucrul cu Florin mi-a accelerat evoluția ca manager. De la delegare, la structură și la gestionarea momentelor tensionate, totul a devenit mai clar. M-a ajutat să trec pragul acesta cu calm, nu cu panică.",
        author: "Valentin Sasu",
        role: "Sales Manager",
      },
    ] satisfies Testimonial[],
  },
  faqs: [
    {
      question:
        "E pentru mine dacă tocmai am fost promovat sau trebuie să am deja experiență?",
      answer:
        "Este exact pentru momentul în care ești acum. Cei mai mulți participanți vin în primele 6-18 luni după promovare, când presiunea este maximă și încă nu s-au cristalizat obiceiuri greșite.",
    },
    {
      question: "Cât timp îmi ia pe săptămână?",
      answer:
        "Programul de mentorat presupune aproximativ 2-3 ore pe săptămână, iar sesiunile 1 la 1 sunt la cerere. Webinarul lunar durează aproximativ o oră și jumătate.",
    },
    {
      question: "Este diferit de un curs online obișnuit?",
      answer:
        "Da. Cursurile online îți dau informații. Programul Aspiring Managers lucrează cu situațiile tale concrete și te ajută să aplici imediat ceea ce înveți.",
    },
    {
      question: "Compania mea poate plăti în locul meu?",
      answer:
        "Da. Există atât variante individuale, cât și programe B2B care pot fi facturate companiei, inclusiv cu documentația necesară pentru HR sau financiar.",
    },
    {
      question: "Cum știu dacă programul mi se potrivește înainte să cumpăr?",
      answer:
        "Poți începe cu quizul de 2 minute, iar dacă vrei să vorbești direct, poți stabili o discuție gratuită de 30 de minute cu mine înainte de orice decizie.",
    },
  ] satisfies FaqItem[],
  finalCta: {
    title: "Ești la un quiz distanță de mai multă claritate",
    description:
      "Nu trebuie să știi încă ce program ți se potrivește. Începe cu 2 minute: fă quizul, află ce tip de manager ești și primești o recomandare personalizată.",
    ctas: [
      {
        label: "Tu ce fel de manager esti? Fa quizul de 2 minute",
        href: contactLinks.quiz,
        variant: "primary",
      },
      {
        label: "Stabileste o discutie gratuita cu Florin",
        href: contactLinks.discoveryCall,
        variant: "secondary",
      },
    ] satisfies CtaLink[],
    note: "Quiz gratuit de 2 minute",
  },
};

export const aboutPageContent = {
  hero: {
    title: `Sunt Florin Stoleriu și nu m-am născut manager.`,
    description:
      "25 de ani în top management, 30 de ani în vânzări și o lecție pe care nimeni nu mi-a predat-o la timp: tranziția de la execuție la leadership nu vine cu manual de utilizare.",
  },
  story: {
    title: "Cum a început totul",
    paragraphs: [
      "Am pornit în vânzări la AB InBev România, la începutul anilor 2000, ca Area Sales Manager cu o echipă de 25 de oameni pe 12 județe. Aveam oameni diferiți, presiune pe rezultate și lecții luate direct din teren. A fost școala mea de management, dură, reală și extrem de valoroasă.",
      "Au urmat roluri din ce în ce mai complexe: Trade Marketing Manager, Senior Brand Manager, Modern Trade Director, apoi Savana, Bergenbier, Policolor, Paypoint, Mogyi și proiecte de consultanță și management interimar. Industrii diferite, companii diferite, provocări diferite, dar același fir roșu prin toate.",
    ],
  },
  lessons: {
    title: "Ce m-a învățat tot acest traseu",
    paragraphs: [
      "La fiecare rol nou am simțit același lucru: primele luni sunt cele mai solicitante, indiferent câtă experiență ai. Provocarea nu era să știu ce trebuie făcut. Provocarea era să fac lucrurile să funcționeze prin oameni, nu singur.",
      "Am controlat prea mult la început. Am delegat prea puțin. Am evitat conflicte care trebuiau adresate și am amânat feedback-uri dificile până când situațiile s-au complicat singure. Am plătit prețul în stres și energie risipită.",
      "La un moment dat mi-am dat seama că problema nu era echipa și nici șefii. Problema era că nimeni nu mă învățase cum să gândesc ca manager. Structura, claritatea și consecvența au fost singurele lucruri care au funcționat cu adevărat.",
    ],
    quote:
      "Tranziția de la specialist la manager este cea mai vulnerabilă etapă din carieră. Și aproape nimeni nu te pregătește cu adevărat să o parcurgi.",
  },
  mission: {
    title: "De ce am creat Aspiring Managers",
    description:
      "Am creat Aspiring Managers pentru ca alți manageri să nu treacă singuri prin aceleași blocaje. Programul nu este despre teorie, ci despre presiunea de sus, încrederea din echipă, feedbackul dat la timp, renunțarea la micromanagement și conversațiile clare cu top managementul.",
  },
  beliefs: {
    title: "Ce cred astăzi, după 25 de ani",
    items: [
      "Respectul echipei nu vine din funcție, ci din consecvență.",
      "Top managementul apreciază claritatea, nu teatrul.",
      "Feedback-ul dat la timp salvează relații și evită crize.",
      "Un manager calm câștigă mai mult pe termen lung decât unul care reacționează impulsiv.",
      "Nu trebuie să pari cel mai deștept din cameră, trebuie să fii cel mai echilibrat.",
    ],
  },
  future: {
    title: "Ce vreau pentru tine",
    paragraphs: [
      "Vreau să devii un manager curajos, cu claritate în decizii și cu mai multă încredere în propriile forțe. Asta înseamnă promovări mai rapide, mai multă credibilitate, mai puține nopți nedormite și mai mult timp pentru familie.",
      "Dacă ai fost promovat pentru că erai bun la execuție și acum înveți să conduci oameni, dacă uneori simți că este prea mult zgomot și nu știi ce să prioritizezi, atunci poate că drumul nostru se intersectează exact la momentul potrivit.",
    ],
    signature:
      "Nu trebuie să fii managerul perfect. Trebuie doar să fii dispus să crești în fiecare zi.",
  },
  cta: {
    title: "Atinge-ți potențialul",
    description:
      "Contactează-mă și accelerează-ți cariera fără stres inutil și cu strategii aplicabile imediat.",
    cta: {
      label: "Stabileste o discutie gratuita",
      href: contactLinks.discoveryCall,
      variant: "primary",
    } satisfies CtaLink,
  },
};

export const programPageContent = {
  hero: {
    title: "În 2 luni, treci de la managerul care supraviețuiește la managerul care conduce cu un sistem.",
    description:
      "8 module, format 1 la 1 cu Florin Stoleriu, adaptat situației tale concrete. Nu un curs generic. Un sistem construit pe realitatea ta.",
    cta: {
      label: "Stabileste o discutie gratuita",
      href: contactLinks.discoveryCall,
      variant: "primary",
      note: "30 de minute, fără angajament, stabilim împreună dacă ne potrivim.",
    } satisfies CtaLink,
  },
  problem: {
    title: "Recunoști dimineața asta?",
    paragraphs: [
      "N-ai apucat să-ți deschizi laptopul și deja cineva îți cere o decizie, altcineva întârzie un raport, iar o conversație de feedback tot este amânată pentru că nu știi cum s-o pornești fără să tensionezi relația.",
      "Ajungi acasă obosit nu de muncă în sine, ci de zgomotul constant, de problemele care vin din toate direcțiile și de sentimentul că nu tu conduci ziua, ci ea te conduce pe tine.",
      "Ai bifat cărți, cursuri și traininguri, dar ți-a lipsit exact ce aveai nevoie: un sistem aplicat pe realitatea ta, cu oamenii tăi și în organizația ta.",
    ],
  },
  need: {
    title: "Nu ai nevoie de mai multă informație.",
    description:
      "Ai nevoie de un mod de a gândi situațiile înainte să se întâmple, de instrumente concrete pe care să le aplici imediat și de studii de caz reale din care să te inspiri când ești blocat.",
  },
  pillars: {
    title: "Cei 3 piloni ai programului",
    items: [
      {
        number: "01",
        title: "Autocunoașterea",
        description:
          "Cine ești tu ca manager, cum reacționezi la presiune și care sunt punctele tale forte reale.",
      },
      {
        number: "02",
        title: "Eu, manager operațional",
        description:
          "Cum conduci echipa concret, cum obții rezultate prin oameni și ce instrumente aplici săptămâna aceasta.",
      },
      {
        number: "03",
        title: "Poziționarea viitoare",
        description:
          "Unde vrei să ajungi, cum arată următorul nivel al carierei tale și ce îți mai trebuie pentru a ajunge acolo.",
      },
    ],
  },
  modules: [
    {
      number: "01",
      title: "Cine sunt EU?",
      description:
        "Explorezi ce te motivează, cum iei decizii sub presiune, care sunt tiparele tale de comportament și ce puncte forte reale poți folosi în toate modulele următoare.",
    },
    {
      number: "02",
      title: "Rolul meu ca Manager",
      description:
        "Înțelegi tranziția de la «fac eu» la «obțin prin alții» și capeți claritate asupra rolului tău real ca manager.",
    },
    {
      number: "03",
      title: "EU și ECHIPA mea",
      description:
        "Înveți să citești oamenii, să construiești încredere și să lucrezi cu echipa ta fără să fii nici prea moale, nici autoritar.",
    },
    {
      number: "04",
      title: "Instrumentele magice",
      description:
        "Delegare, feedback și gestionarea conflictelor, tratate împreună, aplicat pe situațiile tale reale.",
    },
    {
      number: "05",
      title: "Managementul performanței",
      description:
        "Construiești un sistem prin care echipa știe ce se așteaptă de la ea, cum se măsoară progresul și cum se gestionează schimbarea.",
    },
    {
      number: "06",
      title: "Managementul timpului",
      description:
        "Ieși din modul reactiv prin planificare săptămânală, prioritizare și timeboxing aplicat realității unui manager.",
    },
    {
      number: "07",
      title: "Managementul relațiilor",
      description:
        "Înveți să construiești relații utile cu stakeholderii, superiorii și celelalte departamente și să îți crești vizibilitatea profesională.",
    },
    {
      number: "08",
      title: "EU ca LIDER în viitor",
      description:
        "Pleci cu un plan personalizat de dezvoltare pentru următorii 2-3 ani, nu cu o diplomă generică.",
    },
  ],
  outcome: {
    title: "Cum arată viața ta după program",
    paragraphs: [
      "După 8 module și 2 luni de lucru concret, managerul care iese din program nu mai ia decizii din instinct și speranță. Le ia cu un sistem.",
      "Nu mai evită conversațiile dificile pentru că a învățat să le pregătească și să le conducă. Vine mai odihnit acasă pentru că săptămâna lui are o structură, nu o listă interminabilă de urgențe.",
      "Superiorii îl văd diferit: ca pe cineva care livrează, nu ca pe cineva care doar se străduiește.",
    ],
    quote:
      "Nu mai aștept să văd ce aduce ziua. Știu ce aduce ziua, pentru că eu am construit-o.",
  },
  oneToOne: {
    title: "De ce 1 la 1, nu un curs?",
    description:
      "Un curs online îți dă informații. Programul Aspiring Managers pornește de la ce s-a întâmplat la tine săptămâna aceasta și construiește un sistem pe realitatea ta: echipa ta, șeful tău, blocajele tale specifice, contextul organizației tale.",
  },
  florin: {
    title: "Florin Stoleriu",
    description:
      "25 de ani în top management. 30 de ani în vânzări. Am condus echipe de 220 de oameni, am trecut prin reorganizări, conflicte de board, presiuni de buget și momente în care nu aveam mentor. Ceea ce mentorizez acum nu e teorie, ci experiență distilată în instrumente pe care le poți folosi.",
  },
  audience: {
    title: "Programul este pentru tine dacă...",
    description:
      "Ești manager de 0 până la 3 ani, ai o echipă reală cu care lucrezi acum și vrei o transformare structurată, nu un ajutor punctual. Ești dispus să aplici ce înveți și vrei un program personalizat, nu un template generic.",
  },
  testimonials: [
    {
      quote:
        "Am avut conversația de performanță pe care o tot amânam și situația s-a schimbat. Nu a fost plăcută, dar a mers. Nu aș fi putut face asta fără modulul de feedback.",
      author: "Raluca M.",
      role: "Team Lead, companie de IT, București",
    },
    {
      quote:
        "După modulul de delegare, am lăsat un proiect întreg în mâinile unui om din echipă și nu m-am mai băgat. A ieșit mai bine decât dacă l-aș fi făcut eu.",
      author: "Bogdan C.",
      role: "Manager operațiuni, FMCG, Cluj",
    },
    {
      quote:
        "Săptămâna mea are acum o structură. Știu ce e important, ce pot să amân și ce pot să deleg. Nu mai supraviețuiesc. Conduc.",
      author: "Mihaela T.",
      role: "Manager de produs, startup fintech, București",
    },
  ] satisfies Testimonial[],
  faqs: [
    {
      question: "Cât timp pe săptămână presupune programul?",
      answer:
        "Programul include o sesiune 1 la 1 pe săptămână, iar restul aplicării are loc în contextul muncii tale reale. Nu adaugă un nou strat de efort deasupra agendei tale.",
    },
    {
      question: "Merge dacă sunt foarte ocupat acum?",
      answer:
        "Da. Tocmai acesta este momentul în care un sistem are sens. Cei mai mulți participanți simt după primele săptămâni că au mai mult timp, nu mai puțin.",
    },
    {
      question: "Poate plăti compania mea în locul meu?",
      answer:
        "Da. Se poate emite factură pe firmă și se poate furniza documentația necesară pentru aprobările interne.",
    },
    {
      question: "Ce se întâmplă dacă situația mea este foarte specifică sau complicată?",
      answer:
        "Cu atât mai bine. Programul este construit exact pentru situații concrete și se adaptează la contextul tău, nu invers.",
    },
    {
      question: "Cu ce este diferit față de un curs online bun?",
      answer:
        "Un curs online îți dă informații. Programul îți dă un sistem aplicat pe realitatea ta, cu feedback direct și ajustări în timp real.",
    },
  ] satisfies FaqItem[],
  finalCta: {
    title: "Ești gata să treci pe cealaltă parte?",
    description:
      "2 luni. 8 module. Format 1 la 1 cu Florin Stoleriu, adaptat situației tale concrete. La final, pleci cu un sistem care rămâne cu tine.",
    cta: {
      label: "Stabileste o discutie gratuita",
      href: contactLinks.discoveryCall,
      variant: "primary",
    } satisfies CtaLink,
  },
};

export const hourPageContent = {
  hero: {
    title: "Ai o situație dificilă în echipă și nu știi cum s-o rezolvi.",
    description:
      "O oră cu Florin Stoleriu. Ieși cu o direcție clară și pași concreți. Fără angajamente, fără abonamente.",
    cta: {
      label: "Rezervă ora ta — 250 lei",
      href: "#rezervare",
      variant: "primary",
      note: "După plată, primești imediat acces la calendarul de programare și alegi intervalul dorit.",
    } satisfies CtaLink,
  },
  fit: {
    title: "Această sesiune este pentru tine dacă ai o situație concretă și nu știi cum să o abordezi.",
    paragraphs: [
      "Poate ai în echipă un om care nu livrează și ai tot amânat conversația dificilă. Poate ai primit o presiune de sus — un obiectiv imposibil, un termen absurd sau o decizie cu care nu ești de acord — și nu știi cum s-o gestionezi fără să-ți periclitezi poziția.",
      "Poate tocmai ai ajuns în mijlocul unui conflict între doi colegi și nu știi dacă să intervii, când și cum. Vrei un sfat direct, nu un modul de e-learning în șase săptămâni.",
      "Dacă recunoști această situație, ești exact unde trebuie.",
    ],
  },
  session: {
    title: "Ce se întâmplă în cele 60 de minute",
    paragraphs: [
      "Începem direct cu situația ta. Povestești ce se întâmplă, contextul relevant și ce ți se pare că este miza. Florin ascultă, pune întrebări precise și te ajută să dezasamblezi situația.",
      "Nu este coaching vag și nici reflecție abstractă. Este o conversație cu cineva care a mai văzut situația, știe cum se termină de obicei și îți poate spune direct ce ar face el.",
      "Ieși din sesiune cu o direcție clară și cu pași concreți pe care îi poți aplica imediat. Totul rămâne confidențial.",
    ],
  },
  florin: {
    title: "De ce Florin Stoleriu",
    description:
      "Florin are 25 de ani de top management și 30 de ani în vânzări. A condus echipe de 220 de oameni, a gestionat bugete de zeci de milioane și a trecut prin toate tipurile de tranziție managerială posibile. Nu vorbește din teorie, ci din situații reale cu miză reală.",
  },
  steps: {
    title: "Cum funcționează",
    items: [
      {
        number: "01",
        title: "Plătești online",
        description:
          "250 lei, cu cardul, printr-o platformă securizată. Fără surprize și fără costuri ascunse.",
      },
      {
        number: "02",
        title: "Alegi intervalul dorit",
        description:
          "După plată, primești imediat linkul către calendarul de programare și alegi orice slot disponibil între 8:00 și 19:30, de luni până vineri.",
      },
      {
        number: "03",
        title: "Intri în call la ora stabilită",
        description:
          "Un video call de 60 de minute cu Florin. Vii cu situația ta concretă și pleci cu o direcție clară.",
      },
    ],
  },
  urgency: {
    title: "Această sesiune nu e pentru toată lumea.",
    description:
      "Este pentru cine are o situație concretă acum și vrea să iasă din impas azi, nu săptămâna viitoare.",
    cta: {
      label: "Rezervă ora ta — 250 lei",
      href: "#rezervare",
      variant: "secondary",
    } satisfies CtaLink,
  },
  faqs: [
    {
      question: "Ce se întâmplă dacă trebuie să anulez sesiunea?",
      answer:
        "Poți reprograma direct din calendarul de programare. Nu există taxe de anulare sau reprogramare dacă anunți cu cel puțin 24 de ore înainte.",
    },
    {
      question: "Este potrivită și pentru manageri cu mai multă experiență?",
      answer:
        "Da. Dacă ai o situație concretă și vrei un punct de vedere extern, sesiunea poate fi la fel de utilă și pentru managerii cu vechime mai mare.",
    },
    {
      question: "Poate plăti compania în locul meu?",
      answer:
        "Da. La finalizarea plății poți solicita factură pe numele companiei. Dacă ai nevoie de ofertă formală înainte de plată, poate fi trimisă separat.",
    },
    {
      question: "Ce fac dacă nu știu exact cum să încep sesiunea?",
      answer:
        "Nu trebuie să vii pregătit cu o prezentare. Este suficient să ai în minte situația care te preocupă. Primele minute sunt folosite chiar pentru structurarea contextului.",
    },
    {
      question: "O singură sesiune este suficientă?",
      answer:
        "De cele mai multe ori, da. Sesiunea este construită pentru a rezolva o situație concretă, fără abonamente și fără angajamente repetate.",
    },
  ] satisfies FaqItem[],
  finalCta: {
    title: "O oră, 250 de lei. Ieși cu o direcție clară.",
    description:
      "Rezervă acum și ai acces imediat la calendarul de programare. Tu alegi când vrei să vorbim.",
    ctas: [
      {
        label: "Rezervă ora ta — 250 lei",
        href: "#rezervare",
        variant: "primary",
      },
      {
        label: "Ai întrebări? Scrie-ne",
        href: contactLinks.contact,
        variant: "secondary",
      },
    ] satisfies CtaLink[],
  },
};

export const b2bPageContent = {
  hero: {
    title: "Un manager slab nu e o problemă de HR. E o problemă de business.",
    description:
      "Oferim programe de training personalizate pentru echipe de manageri. Nu din catalog. Nu generic. Pornind de la un audit real al echipei voastre, cu impact măsurabil la 30 și 60 de zile.",
    cta: {
      label: "Solicită o ofertă pentru compania ta",
      href: contactLinks.b2bOffer,
      variant: "primary",
      note: "Răspundem în maxim 24 de ore cu o propunere adaptată nevoilor voastre.",
    } satisfies CtaLink,
  },
  problem: {
    title: "Ce se întâmplă de fapt în companiile care cresc",
    paragraphs: [
      "Ai promovat oameni buni. Au livrat rezultate ca specialiști și au meritat pasul în sus. Acum sunt manageri și observi că ceva nu funcționează așa cum ar trebui: deciziile se iau greu, echipele lor sunt confuze sau tensionate, iar unii dintre ei sunt deja în pragul burnout-ului.",
      "Tranziția de la specialist la manager nu este o promovare. Este o schimbare de identitate. Omul care era cel mai bun din echipă trebuie acum să renunțe la a face lucrurile singur și să învețe să obțină rezultate prin alții.",
      "Fiecare săptămână cu un manager nepregătit înseamnă decizii amânate, oameni buni care pleacă și costuri care nu apar în buget, dar se simt în tot businessul.",
    ],
  },
  whyStandardFails: {
    title: "De ce trainingurile din catalog nu schimbă nimic",
    description:
      "Oamenii revin luni dimineața și revin la tiparele vechi până miercuri, pentru că trainingul nu a pornit de la realitatea lor concretă, nu le-a dat un instrument pentru ziua următoare și nu a avut un mecanism de ancorare după sesiune.",
  },
  process: {
    title: "Cum arată programul în practică",
    steps: [
      {
        number: "01",
        title: "Audit",
        description:
          "Înțelegem cine sunt managerii, ce blocaje concrete au, care este cultura organizațională și ce ați mai încercat până acum.",
      },
      {
        number: "02",
        title: "Design personalizat",
        description:
          "Alegem modulele relevante, formatul potrivit, ritmul sesiunilor și structura fiecărei întâlniri în funcție de realitatea voastră.",
      },
      {
        number: "03",
        title: "Livrare și măsurare",
        description:
          "Florin livrează sesiunile direct, iar la final măsurăm impactul la 30 și 60 de zile și stabilim ce urmează.",
      },
    ],
  },
  outcomes: {
    title: "Ce primește compania ta la finalul programului",
    paragraphs: [
      "Fiecare sesiune este construită pe realitatea echipei voastre, nu pe slide-uri generice. Managerii pleacă din fiecare întâlnire cu cel puțin un instrument concret pe care îl pot folosi de a doua zi.",
      "În plus, fiecare participant pleacă cu claritate asupra rolului său de manager, cu un mini-plan personalizat de 30 de zile și, opțional, cu acces la un raport de impact care arată ce s-a schimbat.",
    ],
  },
  modules: [
    {
      number: "01",
      title: "Tranziția de la specialist la manager",
      description:
        "Ce se schimbă cu adevărat când devii manager, care sunt cele patru roluri pe care trebuie să le stăpânești simultan și care sunt greșelile costisitoare din primele 90 de zile.",
    },
    {
      number: "02",
      title: "Eu și echipa mea",
      description:
        "Cum construiești încredere rapid într-o echipă, cum folosești modelul A.C.T.I.V. și cum creezi un mini-plan de 30 de zile aplicabil imediat.",
    },
    {
      number: "03",
      title: "Instrumentele magice",
      description:
        "Delegare eficientă, feedback de zi cu zi și gestionarea primelor conflicte fără haos și fără escaladare.",
    },
  ],
  testimonials: [
    {
      quote:
        "Cursul mi-a oferit mai multă încredere, claritate și o mai bună înțelegere a procesului de management. Mi-a pus la dispoziție instrumente concrete pentru implementarea obiectivelor.",
      author: "S.G.",
      role: "Participant program",
    },
    {
      quote:
        "Florin nu doar explică teoria. Îți arată exact ce să spui, cum să acționezi și de ce contează. M-a ajutat să câștig încrederea echipei și să gestionez primele conflicte fără haos.",
      author: "Vali Sasu",
      role: "Participant program",
    },
    {
      quote:
        "Am încercat două traininguri de management în ultimii trei ani. Bune pe hârtie, uitate la două săptămâni după. Cu Florin a fost diferit: oamenii mei au aplicat ce au învățat din prima săptămână.",
      author: "A.M.",
      role: "HR Manager, companie cu 200 de angajați",
    },
  ] satisfies Testimonial[],
  florin: {
    title: "De ce contează cine livrează trainingul",
    description:
      "Florin Stoleriu a practicat managementul timp de 25 de ani, conducând echipe de la 5 la peste 220 de oameni în companii precum AB InBev, Bergenbier, Policolor sau PayPoint. În sesiunile lui nu găsești teorii abstracte, ci exemple din teren, conversații directe și instrumente care funcționează a doua zi.",
  },
  companies: {
    title: "Programul este potrivit pentru voi dacă...",
    description:
      "Lucrați într-un startup sau într-o companie în creștere cu 5 până la 50 de manageri, ați făcut promovări interne și vreți să îi pregătiți înainte ca problemele să devină vizibile sau ați încercat deja traininguri generice și vreți ceva cu impact real și măsurabil.",
  },
  faqs: [
    {
      question: "Câte sesiuni are un program tipic și cât durează în total?",
      answer:
        "Un program minim are 3 sesiuni de 90 de minute, iar un program complet poate ajunge la 6-8 sesiuni pe parcursul a 2-3 luni. Ritmul este stabilit după audit.",
    },
    {
      question: "Poate plăti compania? Emiteți factură?",
      answer:
        "Da. Se emite factură fiscală, iar programul poate fi contractat ca serviciu de training și dezvoltare profesională.",
    },
    {
      question: "Ce se întâmplă dacă oamenii noștri au niveluri diferite de experiență?",
      answer:
        "Este o situație frecventă și poate fi gestionată prin grupuri diferențiate sau printr-un program mixt, construit special pentru realitatea echipei voastre.",
    },
    {
      question: "Cum măsurăm dacă trainingul a avut impact?",
      answer:
        "La finalul programului facem evaluare la 30 și 60 de zile și putem livra opțional un raport scris cu concluziile evaluării.",
    },
    {
      question: "Există variantă online?",
      answer:
        "Da. Toate sesiunile pot fi livrate online, păstrând aceeași structură și aceeași calitate a livrării.",
    },
  ] satisfies FaqItem[],
  finalCta: {
    title: "Audit real. Program personalizat. Impact măsurabil.",
    description:
      "Programul este construit pe realitatea echipei voastre, livrat direct de Florin Stoleriu și măsurat la 30 și 60 de zile. Nu plătiți pentru un curs generic, ci pentru schimbare care se vede.",
    cta: {
      label: "Solicită o ofertă pentru compania ta",
      href: contactLinks.b2bOffer,
      variant: "primary",
    } satisfies CtaLink,
  },
};
