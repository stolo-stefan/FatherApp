import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { getQuizTriggerProps, isExternal } from "./linkHelpers";

export function SiteLink({ href, className, children }: PropsWithChildren<{ href: string; className?: string }>) {
  if (isExternal(href)) {
    return (
      <a
        href={href}
        className={className}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        {...getQuizTriggerProps(href)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}
