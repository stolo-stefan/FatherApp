import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export function QuizActionButton({
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
