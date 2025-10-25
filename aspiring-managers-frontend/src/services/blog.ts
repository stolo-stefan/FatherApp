import { http } from "./http";

export interface CreateBlogDto {
    title: string;
    content: string;
    summary: string;
}

export interface BlogSummary {
    id: number;
    title: string;
    content: string;
    summary: string,
    datePosted: string; // ISO from backend
    isVisible: boolean;
}

export interface BlogDetailDto {
    id: number;
    title: string;
    content: string;
    datePosted: string; // ISO
    isVisible: boolean;
    media: MediaDto[];
}

export type MediaKind = 0 | 1 | "Image" | "Video";
export interface MediaDto {
    id: number;
    url: string;
    kind: MediaKind;
}

export function normalizeContent(raw: string) {
  // turn "/n" into actual newlines and "/t" into spaces
  const txt = raw
    .replaceAll("\r\n", "\n")
    .replaceAll("/n", "\n")
    .replaceAll("/t", "    ")
    .replace(/\n{3,}/g, "\n\n") // compress huge gaps
    .trim();
  return txt;
}

export async function listBlogs(): Promise<BlogSummary[]> {
    // backend MapGroup("/api/blogs") + "/all"
    const { data } = await http.get<BlogSummary[]>("/blogs/all");
    return data;
}

export async function listUserBlogs(): Promise<BlogSummary[]> {
    // backend MapGroup("/api/blogs") + "/all"
    const { data } = await http.get<BlogSummary[]>("/user/blogs");
    const threePosts = data
    .sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())
    .slice(0, 3);
    threePosts.map((b)=>{
        return b.datePosted = b.datePosted.slice(0,10);
    })
    return threePosts;
}

export async function createBlog(dto: CreateBlogDto) {
    // backend MapGroup("/api/blogs") + POST "/"
    const { data } = await http.post("/blogs", dto);
    return data;
}

export async function getBlogDetailed(id: number): Promise<BlogDetailDto> {
    const { data } = await http.get<BlogDetailDto>(`/blogs/detailed/${id}`);
    return data;
}

export async function setBlogVisible(id: number) {
    const { data } = await http.put(`/blogs/visible/${id}`);
    return data;
}

export async function setBlogNonVisible(id: number) {
    const { data } = await http.put(`/blogs/non-visible/${id}`);
    return data;
}

export async function deleteBlog(id: number) {
    await http.delete(`/blogs/${id}`);
}