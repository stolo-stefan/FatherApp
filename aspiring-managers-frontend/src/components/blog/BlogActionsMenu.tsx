import { deleteBlog, setBlogNonVisible, setBlogVisible } from "@/services/blog";
import { useEffect, useRef, useState } from "react";

interface BlogActionsMenuProps {
    onView?: () => void;
    onEdit?: () => void;
    onDelete?: () => void;
    onSetVisibility?: (visible: boolean) => void;
    onVisibilityChange?: (visible: boolean) => void; 
    blogId: number; 
}


export default function BlogActionsMenu({
    blogId,
    onView,
    onEdit,
    onDelete,
    onVisibilityChange,
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
    
    async function handleSetVisibility(visible: boolean) {
        try {
        if (visible) 
            await setBlogVisible(blogId);
        else 
            await setBlogNonVisible(blogId);
            onVisibilityChange?.(visible);
        } catch (err) {
            console.error("Failed to update visibility:", err);
            alert("Failed to update visibility.");
        } finally {
            setOpen(false);
            setSubOpen(false);
        }
    }
    async function handleDelete() {
        const confirmDelete = confirm("Are you sure you want to delete this blog?");
        if (!confirmDelete) return;

        try {
            await deleteBlog(blogId);
            onDelete?.(); // optional callback to refresh table
        } catch (err) {
            console.error("Failed to delete blog:", err);
            alert("Failed to delete blog. It may not exist.");
        } finally {
            setOpen(false);
        }
    }

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
                                handleSetVisibility(true)
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-[var(--am-accent-green)] hover:text-[var(--am-white)]"
                        >
                            Visible
                        </button>
                        </li>
                        <li>
                        <button
                            onClick={() => {
                                handleSetVisibility(false)
                            }}
                            className="block w-full text-left px-4 py-2 hover:bg-[var(--am-primary-teal)] hover:text-[var(--am-white)]"
                        >
                            Non-visible
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
                    onClick={() => handleDelete()}
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
