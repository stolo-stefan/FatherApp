export const QUIZ_TRIGGER_HREF = "#quiz";
export const QUIZ_OPEN_EVENT = "aspiring-managers:open-quiz";

export type QuizProfileId =
  | "specialistul-promovat"
  | "managerul-in-constructie"
  | "managerul-sub-presiune"
  | "managerul-cu-situatii-blocate"
  | "managerul-gata-de-salt";

type LearningTag = "self-paced" | "live" | "1to1" | "program";
type IdentityTag = "specialist" | "constructor" | "presiune" | "blocat" | "salt";

export type QuizOption = {
  id: string;
  label: string;
  points?: number;
  learningTag?: LearningTag;
  identityTag?: IdentityTag;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: QuizOption[];
};

export type QuizResult = {
  profileId: QuizProfileId;
  title: string;
  body: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta: {
    label: string;
    href: string;
  };
};

const contactEmail = "mailto:contact@aspiringmanagers.ro";
const schedulerUrl = "https://scheduler.zoom.us/florin-stoleriu";
const programUrl = "/program-mentorat";
const mentorshipHourUrl = "/ora-de-mentorat";
const aboutUrl = "/despre-mine";
const homeUrl = "/";

export const managerQuizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "De cat timp conduci o echipa?",
    options: [
      { id: "A", label: "Sunt in tranzitie, am primit sau urmeaza sa primesc rolul", points: 1 },
      { id: "B", label: "Mai putin de 6 luni", points: 2 },
      { id: "C", label: "Intre 6 luni si 2 ani", points: 3 },
      { id: "D", label: "Peste 2 ani", points: 4 },
    ],
  },
  {
    id: "q2",
    prompt: "Cati oameni sunt in echipa ta?",
    options: [
      { id: "A", label: "Nu am echipa inca", points: 1 },
      { id: "B", label: "2 pana la 4 persoane", points: 2 },
      { id: "C", label: "5 pana la 10 persoane", points: 3 },
      { id: "D", label: "Peste 10 persoane", points: 4 },
    ],
  },
  {
    id: "q3",
    prompt: "Cand te gandesti la rolul tau de manager, cu ce te identifici cel mai mult?",
    options: [
      { id: "A", label: "Sunt bun pe partea tehnica, rolul de manager e teritoriu nou pentru mine", points: 1, identityTag: "specialist" },
      { id: "B", label: "Incerc sa pun ordine, vreau un sistem, nu sa improvizez zi de zi", points: 2, identityTag: "constructor" },
      { id: "C", label: "Gestionez mult, uneori simt ca nu am timp sa ma opresc si sa gandesc", points: 3, identityTag: "presiune" },
      { id: "D", label: "Am claritate pe directie, dar cateva situatii cu oamenii ma blocheaza", points: 3, identityTag: "blocat" },
      { id: "E", label: "Vreau sa devin un lider, nu doar un manager operational", points: 4, identityTag: "salt" },
    ],
  },
  {
    id: "q4",
    prompt: "Cum iei decizii cand nu ai toate informatiile?",
    options: [
      { id: "A", label: "Aman sau cer validare, prefer sa fiu sigur inainte sa actionez", points: 1 },
      { id: "B", label: "Actionez pe instinct, dar uneori ma intreb daca am ales bine", points: 2 },
      { id: "C", label: "Am un proces, dar nu intotdeauna functioneaza sub presiune", points: 3 },
      { id: "D", label: "Decid rapid, imi asum si ajustez pe parcurs", points: 4 },
    ],
  },
  {
    id: "q5",
    prompt: "Cum arata relatia ta cu echipa in acest moment?",
    options: [
      { id: "A", label: "Abia o construiesc, oamenii ma cunosc ca fost coleg, nu ca manager", points: 1 },
      { id: "B", label: "E functionala, dar simt ca lipseste ceva, initiativa din partea lor si o legatura mai profunda", points: 2 },
      { id: "C", label: "E buna in general, dar am situatii punctuale cu anumiti oameni care ma costa energie", points: 3 },
      { id: "D", label: "Relatia e solida, ma concentrez pe performanta si directie", points: 4 },
    ],
  },
  {
    id: "q6",
    prompt: "Cum iti place sa inveti si sa cresti profesional?",
    options: [
      { id: "A", label: "Citesc, procesez si aplic singur, am nevoie de spatiu sa gandesc", learningTag: "self-paced" },
      { id: "B", label: "Prefer sa vad exemple reale si sa aud cum au rezolvat altii situatii similare", learningTag: "live" },
      { id: "C", label: "Vreau feedback direct pe situatia mea, un ochi extern care sa ma ajute", learningTag: "1to1" },
      { id: "D", label: "Ma dezvolt cel mai bine intr-un program structurat, cu ritm si responsabilizare", learningTag: "program" },
    ],
  },
  {
    id: "q7",
    prompt: "Ce iti doresti cel mai mult din rolul de manager in urmatoarele 6 luni?",
    options: [
      { id: "A", label: "Sa inteleg cu adevarat ce inseamna sa conduci oameni", points: 1 },
      { id: "B", label: "Sa am un sistem clar, sa stiu ce sa fac, in ce ordine si cu ce instrumente", points: 2 },
      { id: "C", label: "Sa fiu mai calm, mai in control si sa am mai mult timp sa gandesc", points: 3 },
      { id: "D", label: "Sa fiu managerul pe care echipa mea il merita si sa avansez", points: 4 },
    ],
  },
  {
    id: "q8",
    prompt: "Cat de pregatit esti sa investesti in dezvoltarea ta ca manager?",
    options: [
      { id: "A", label: "Vreau sa explorez mai intai, prefer sa incep cu ceva gratuit", points: 1 },
      { id: "B", label: "Sunt dispus sa investesc o suma mica daca vad ca e concret si aplicabil", points: 2 },
      { id: "C", label: "Investesc fara probleme daca simt ca e solutia potrivita pentru situatia mea", points: 3 },
      { id: "D", label: "Sunt gata de un angajament serios, de timp si de resurse", points: 4 },
    ],
  },
];

export const quizResults: Record<QuizProfileId, QuizResult> = {
  "specialistul-promovat": {
    profileId: "specialistul-promovat",
    title: "Esti un Specialist Promovat",
    body:
      "Ai ajuns in rol pentru ca esti bun la ce faci. Acum regulile jocului s-au schimbat si e normal sa cauti un nou cadru de referinta. Ghidul Managerului Debutant este primul pas, concret si fara teorie goala.",
    primaryCta: {
      label: "Descarca ghidul gratuit",
      href: `${contactEmail}?subject=Vreau ghidul gratuit pentru manageri`,
    },
    secondaryCta: {
      label: "Exploreaza toate resursele",
      href: aboutUrl,
    },
  },
  "managerul-in-constructie": {
    profileId: "managerul-in-constructie",
    title: "Esti un Manager in Constructie",
    body:
      "Stii deja ca managementul nu inseamna sa faci totul singur. Acum ai nevoie de un sistem, instrumente si repere clare. Workbook-ul avansat te ajuta sa construiesti acest sistem pas cu pas.",
    primaryCta: {
      label: "Descopera workbook-ul",
      href: `${contactEmail}?subject=Vreau workbook-ul pentru manageri`,
    },
    secondaryCta: {
      label: "Vreau sa vad si cum lucram live",
      href: `${contactEmail}?subject=Vreau detalii despre webinar`,
    },
  },
  "managerul-sub-presiune": {
    profileId: "managerul-sub-presiune",
    title: "Esti un Manager Sub Presiune",
    body:
      "Stii ce vrei sa obtii, dar ritmul de zi cu zi nu iti lasa spatiu sa ajungi acolo. La webinar vezi cum alti manageri au iesit din aceasta dinamica, cu exemple reale si fara sfaturi generale.",
    primaryCta: {
      label: "Rezerva-ti locul la webinar",
      href: `${contactEmail}?subject=Vreau sa particip la webinar`,
    },
    secondaryCta: {
      label: "Prefer o ora 1 la 1 pe situatia mea",
      href: mentorshipHourUrl,
    },
  },
  "managerul-cu-situatii-blocate": {
    profileId: "managerul-cu-situatii-blocate",
    title: "Esti un Manager cu Situatii Blocate",
    body:
      "Ai experienta si claritate pe directie. Dar unele situatii iti consuma energie disproportionat. Intr-o ora de mentorat lucram direct pe nodul tau, nu pe teorie.",
    primaryCta: {
      label: "Rezerva Ora de Mentorat",
      href: mentorshipHourUrl,
    },
    secondaryCta: {
      label: "Vreau mai mult decat o ora",
      href: programUrl,
    },
  },
  "managerul-gata-de-salt": {
    profileId: "managerul-gata-de-salt",
    title: "Esti un Manager Gata de Salt",
    body:
      "Ai trecut de faza in care cauti sfaturi. Acum cauti transformare, un sistem complet, ritm si un mentor care sa te vada cu adevarat. Programul de Mentorat Aspiring Managers este construit exact pentru asta.",
    primaryCta: {
      label: "Vreau o discutie gratuita",
      href: schedulerUrl,
    },
    secondaryCta: {
      label: "Spune-mi mai multe despre Programul de Mentorat",
      href: programUrl,
    },
  },
};

function clampLevel(level: number) {
  return Math.max(0, Math.min(4, level));
}

function levelToProfile(level: number): QuizProfileId {
  return (
    [
      "specialistul-promovat",
      "managerul-in-constructie",
      "managerul-sub-presiune",
      "managerul-cu-situatii-blocate",
      "managerul-gata-de-salt",
    ] as const
  )[clampLevel(level)];
}

function getBaseLevel(score: number) {
  if (score <= 11) return 0;
  if (score <= 15) return 1;
  if (score <= 20) return 3;
  return 4;
}

export function scoreManagerQuiz(answers: Record<string, string>) {
  const pickedOptions = managerQuizQuestions.map((question) => {
    const optionId = answers[question.id];
    return question.options.find((option) => option.id === optionId) ?? null;
  });

  if (pickedOptions.some((option) => option === null)) {
    throw new Error("All quiz questions must be answered before scoring.");
  }

  const selected = pickedOptions as QuizOption[];
  const score = selected.reduce((total, option) => total + (option.points ?? 0), 0);
  const q3 = selected[2];
  const q6 = selected[5];
  const q8 = selected[7];

  let level = getBaseLevel(score);

  if ((q6.learningTag === "program" && q8.id === "D" && score >= 17) || (q3.identityTag === "salt" && score >= 17)) {
    level = 4;
  } else if (q8.id === "A" && score < 14) {
    level = 0;
  } else if (q6.learningTag === "live" && score >= 13 && score <= 17) {
    level = 2;
  } else if (q6.learningTag === "self-paced") {
    level = clampLevel(level - 1);
  } else if (q6.learningTag === "1to1") {
    level = clampLevel(level + 1);
  }

  const profileId = levelToProfile(level);

  return {
    score,
    profileId,
    result: quizResults[profileId],
  };
}

export function openManagerQuiz() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(QUIZ_OPEN_EVENT));
}

export function closeManagerQuizAndRedirect(href: string) {
  if (typeof window === "undefined") return;
  window.location.assign(href || homeUrl);
}
