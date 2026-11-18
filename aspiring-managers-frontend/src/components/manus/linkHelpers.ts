import { QUIZ_TRIGGER_HREF, openManagerQuiz } from "@/lib/managerQuiz";

export function isExternal(href: string) {
  return href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#");
}

export function getQuizTriggerProps(href: string) {
  if (href !== QUIZ_TRIGGER_HREF) return {};

  return {
    onClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      openManagerQuiz();
    },
  };
}
