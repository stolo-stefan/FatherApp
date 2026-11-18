import { ManagerQuizOverlay } from "../ManagerQuizOverlay";
import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function PageShell({ children, background = "light" }: PropsWithChildren<{ background?: "light" | "navy" }>) {
  return (
    <div className={cn("min-h-screen", background === "navy" ? "bg-[#0f1b33] text-white" : "bg-[#fffaf4] text-[#14213c]") }>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <ManagerQuizOverlay />
    </div>
  );
}
