import { useEffect, useRef, useState } from "react";

interface BlogActionsMenuProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onSetVisibility?: (visible: boolean) => void;
}

export default function BlogActionsMenu({
    onView,
    onEdit,
    onDelete,
    onSetVisibility,
}: BlogActionsMenuProps) {
    const [open, setOpen] = useState(false);
    const [subOpen, setSubOpen] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
            setOpen(false);
            setSubOpen(false);
        }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative inline-block text-left">
        {/* Trigger button */}
        <button
            onClick={() => setOpen((o) => !o)}
            className="h-9 w-9 inline-flex items-center justify-center rounded-md border border-[var(--am-border-gray)] hover:bg-[var(--am-bg-light)] transition"
        >
            ⋯
        </button>

        {/* Dropdown */}
        {open && (
            <div
            className="absolute right-0 mt-2 w-48 rounded-lg border border-[var(--am-border-gray)]
                        bg-[var(--am-white)] shadow-md z-50"
            >
            <ul className="text-sm text-[var(--am-text-dark)] divide-y divide-[var(--am-border-gray)]">
                <li>
                <button
                    onClick={() => setSubOpen((p) => !p)}
                    className="w-full text-left px-4 py-2 hover:bg-[var(--am-bg-light)] transition"
                >
                    Set Visibility ▸
                </button>

                {subOpen && (
                    <div
                    className="absolute right-full top-0 mt-0 mr-1 w-40 rounded-lg border border-[var(--am-border-gray)]
                                bg-[var(--am-white)] shadow-md"
                    >
                    <ul className="text-sm text-[var(--am-text-dark)]">
                        <li>
                        <button
                            onClick={() => {
                            onSetVisibility?.(true);
                            setOpen(false);
                            setSubOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-[var(--am-accent-green)] hover:text-[var(--am-white)]"
                        >
                            Yes
                        </button>
                        </li>
                        <li>
                        <button
                            onClick={() => {
                            onSetVisibility?.(false);
                            setOpen(false);
                            setSubOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-[var(--am-primary-teal)] hover:text-[var(--am-white)]"
                        >
                            No
                        </button>
                        </li>
                    </ul>
                    </div>
                )}
                </li>

                <li>
                <button
                    onClick={() => {
                    onEdit?.();
                    setOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-[var(--am-bg-light)] transition"
                >
                    Edit Contents
                </button>
                </li>

                <li>
                <button
                    onClick={() => {
                    onView?.();
                    setOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-[var(--am-bg-light)] transition"
                >
                    View Blog
                </button>
                </li>

                <li>
                <button
                    onClick={() => {
                    onDelete?.();
                    setOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 transition"
                >
                    Delete
                </button>
                </li>
            </ul>
            </div>
        )}
        </div>
    );
}
