import { createContext, type ComponentType, type PropsWithChildren } from "react";

type InternalLinkProps = PropsWithChildren<{ to: string; className?: string }>;

// The SPA supplies React Router's Link. Static renderers use ordinary anchors.
export const InternalLinkContext = createContext<ComponentType<InternalLinkProps> | null>(null);
