import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getBlogDetailed, type BlogDetailDto } from "@/services/blog";
import { listUserBlogs, type BlogSummary } from "@/services/blog";
import { isVideo, normalizeContent } from "@/lib/blogFormat";
import { mediaUrl } from "@/lib/url";

export default function BlogReadPage() {
  const { id } = useParams();
  const blogId = Number(id);

  const [blog, setBlog] = useState<BlogDetailDto | null>(null);
  const [others, setOthers] = useState<BlogSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const detail = await getBlogDetailed(blogId);
        setBlog(detail);

        // other blogs (latest 6, excluding current)
        const all = await listUserBlogs();
        setOthers(all.filter(o => o.id !== blogId).slice(0, 6));
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [blogId]);

  if (loading) return <div className="container mx-auto px-4 py-10">Loading…</div>;
  if (!blog)   return <div className="container mx-auto px-4 py-10">Post not found.</div>;

  const content = normalizeContent(blog.content);
  const paragraphs = content.split(/\n{2,}/); // blank line = new paragraph

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT 2/3 */}
        <article className="lg:col-span-2">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--am-text-dark)]">
            {blog.title}
          </h1>
          <p className="mt-3 text-sm text-[var(--am-text-muted)]">
            {new Date(blog.datePosted).toLocaleDateString()}
          </p>

          <div className="my-5 h-px bg-[var(--am-border-gray)]" />

          {/* Normalized, paragraph-formatted content */}
          <div className="space-y-4 text-[var(--am-text-dark)] leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i} className="whitespace-pre-wrap">{p}</p>
            ))}
          </div>
        </article>

        {/* RIGHT 1/3 */}
        <aside className="lg:col-span-1 space-y-6">
          {/* Media */}
            <Card>
            <CardHeader>
              <CardTitle className="text-[var(--am-text-dark)]">Media</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {blog.media.length === 0 && (
                    <p className="text-sm text-[var(--am-text-muted)]">No media.</p>
                )}

                {blog.media.map((m) => (
                    <Dialog key={m.id}>
                    <DialogTrigger asChild>
                        <figure
                        className="rounded-lg border overflow-hidden cursor-zoom-in"
                        title="Click to zoom"
                        >
                        {isVideo(m.kind) ? (
                            <video
                            src={mediaUrl(m.url)}
                            className="block w-full aspect-video"
                            // keep controls off in the thumbnail so clicks open the zoom
                            muted
                            />
                        ) : (
                            <img
                            src={mediaUrl(m.url)}
                            alt={blog.title}
                            className="block w-full h-auto"
                            loading="lazy"
                            />
                        )}
                        </figure>
                    </DialogTrigger>

                    <DialogContent
                        // big, clean canvas for media
                        className="max-w-[95vw] sm:max-w-[85vw] md:max-w-[70vw] p-0 bg-transparent border-none"
                    >
                        <div className="flex items-center justify-center max-h-[85vh]">
                        {isVideo(m.kind) ? (
                            <video
                            src={mediaUrl(m.url)}
                            controls
                            autoPlay={false}
                            className="max-h-[85vh] w-auto rounded-lg shadow-lg"
                            />
                        ) : (
                            <img
                            src={mediaUrl(m.url)}
                            alt={blog.title}
                            className="max-h-[85vh] w-auto rounded-lg shadow-lg cursor-zoom-out"
                            />
                        )}
                        </div>
                    </DialogContent>
                    </Dialog>
                ))}
            </CardContent>
            </Card>

          {/* Other blogs */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[var(--am-text-dark)]">Other blogs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {others.length === 0 && (
                <p className="text-sm text-[var(--am-text-muted)]">No other posts.</p>
              )}
              {others.map((p) => (
                <div key={p.id} className="border rounded-md p-3 hover:bg-[var(--am-bg-light)]">
                  <Link
                    to={`/blog/${p.id}`}
                    className="font-medium text-[var(--am-primary-teal)] hover:underline"
                  >
                    {p.title}
                  </Link>
                  <p className="text-xs text-[var(--am-text-muted)]">
                    {new Date(p.datePosted).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
