import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  QUIZ_OPEN_EVENT,
  closeManagerQuizAndRedirect,
  managerQuizQuestions,
  scoreManagerQuiz,
} from "@/lib/managerQuiz";
import { cn } from "@/lib/utils";
import { ArrowRight, Check, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Answers = Record<string, string>;

function QuizActionButton({
  label,
  variant = "primary",
  onClick,
  disabled = false,
}: {
  label: string;
  variant?: "primary" | "secondary";
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-200",
        variant === "primary"
          ? "bg-[#e47f3a] text-white hover:bg-[#d66f29] disabled:bg-[#e47f3a]/45"
          : "border border-white/18 bg-white/8 text-white hover:bg-white/12 disabled:border-white/10 disabled:text-white/45",
        disabled && "cursor-not-allowed shadow-none hover:translate-y-0"
      )}
    >
      <span>{label}</span>
      {variant === "primary" ? <ArrowRight className="size-4" /> : null}
    </button>
  );
}

export function ManagerQuizOverlay() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener(QUIZ_OPEN_EVENT, handleOpen);
    return () => window.removeEventListener(QUIZ_OPEN_EVENT, handleOpen);
  }, []);

  const currentQuestion = managerQuizQuestions[currentIndex];
  const currentAnswer = answers[currentQuestion.id];
  const resultState = useMemo(() => {
    if (!showResult) return null;
    return scoreManagerQuiz(answers);
  }, [answers, showResult]);

  const resetQuiz = () => {
    setCurrentIndex(0);
    setAnswers({});
    setShowResult(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      resetQuiz();
    }
  };

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: optionId,
    }));
  };

  const handleNext = () => {
    if (!currentAnswer) return;
    if (currentIndex === managerQuizQuestions.length - 1) {
      setShowResult(true);
      return;
    }
    setCurrentIndex((value) => value + 1);
  };

  const handleBack = () => {
    if (showResult) {
      setShowResult(false);
      setCurrentIndex(managerQuizQuestions.length - 1);
      return;
    }

    setCurrentIndex((value) => Math.max(0, value - 1));
  };

  const progress = showResult ? 100 : Math.round(((currentIndex + 1) / managerQuizQuestions.length) * 100);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="max-h-[92vh] max-w-[640px] overflow-hidden rounded-[16px] border border-white/10 bg-[#14213C] p-0 text-white shadow-[0_40px_120px_-48px_rgba(0,0,0,0.65)]"
      >
        <DialogTitle className="sr-only">Afla ce tip de manager esti</DialogTitle>
        <DialogDescription className="sr-only">
          Quiz interactiv cu 8 intrebari pentru recomandarea urmatorului pas potrivit.
        </DialogDescription>

        <div className="flex max-h-[92vh] flex-col">
          <div className="sticky top-0 z-10 border-b border-white/10 bg-[#14213C] px-5 pb-4 pt-5 sm:px-8 sm:pb-5 sm:pt-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f0b187]">Quiz de 2 minute</p>
                <p className="mt-2 text-sm text-white/55">
                  {showResult ? "Rezultat personalizat" : `Intrebarea ${currentIndex + 1} din ${managerQuizQuestions.length}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="inline-flex size-10 items-center justify-center rounded-full border border-white/12 bg-white/6 text-white transition-colors duration-200 hover:bg-white/12"
                aria-label="Inchide quizul"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-[#e47f3a] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="overflow-y-auto px-5 pb-5 pt-5 sm:px-8 sm:pb-8 sm:pt-6">
            {showResult && resultState ? (
              <div className="space-y-6">
                <div className="rounded-[18px] border border-white/10 bg-white/6 p-5 sm:p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f0b187]">Profilul tau de manager</p>
                  <h3 className="mt-3 text-[1.85rem] font-semibold leading-tight text-white sm:text-[2.15rem]">{resultState.result.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-white/78 sm:text-base">{resultState.result.body}</p>
                </div>


                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <QuizActionButton
                    label={resultState.result.primaryCta.label}
                    onClick={() => closeManagerQuizAndRedirect(resultState.result.primaryCta.href)}
                  />
                  <QuizActionButton
                    label={resultState.result.secondaryCta.label}
                    variant="secondary"
                    onClick={() => closeManagerQuizAndRedirect(resultState.result.secondaryCta.href)}
                  />
                </div>

                <button
                  type="button"
                  onClick={resetQuiz}
                  className="text-sm font-medium text-white/68 transition-colors duration-200 hover:text-white"
                >
                  Reia quizul
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="text-[1.7rem] font-semibold leading-tight text-white sm:text-[2rem]">{currentQuestion.prompt}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/72 sm:text-base">
                    Alege varianta care descrie cel mai bine situatia ta acum.
                  </p>
                </div>

                <div className="grid gap-3">
                  {currentQuestion.options.map((option, index) => {
                    const active = currentAnswer === option.id;
                    const optionLabel = String.fromCharCode(65 + index);
                    return (
                      <button
                        key={`${currentQuestion.id}-${option.id}`}
                        type="button"
                        onClick={() => handleSelect(currentQuestion.id, option.id)}
                        className={cn(
                          "group flex w-full items-start gap-3 rounded-xl border px-4 py-4 text-left transition-all duration-200",
                          active
                            ? "border-[#e47f3a] bg-[#e47f3a]/12 shadow-[0_18px_40px_-30px_rgba(228,127,58,0.65)]"
                            : "border-white/10 bg-white/5 hover:border-white/22 hover:bg-white/8"
                        )}
                      >
                        <span
                          className={cn(
                            "mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                            active ? "border-[#e47f3a] bg-[#e47f3a] text-white" : "border-white/15 text-white/74"
                          )}
                        >
                          {active ? <Check className="size-4" /> : optionLabel}
                        </span>
                        <span className="flex-1 text-sm leading-7 text-white/88 sm:text-base">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 bg-[#14213C] px-5 py-4 sm:px-8 sm:py-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <QuizActionButton
                label={showResult ? "Inapoi la ultima intrebare" : "Inapoi"}
                variant="secondary"
                onClick={handleBack}
                disabled={!showResult && currentIndex === 0}
              />
              {!showResult ? (
                <QuizActionButton label={currentIndex === managerQuizQuestions.length - 1 ? "Vezi rezultatul" : "Inainte"} onClick={handleNext} disabled={!currentAnswer} />
              ) : null}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
