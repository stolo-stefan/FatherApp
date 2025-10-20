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
    datePosted: string; // ISO from backend
    isVisible: boolean;
}

export async function listBlogs(): Promise<BlogSummary[]> {
    // backend MapGroup("/api/blogs") + "/all"
    const { data } = await http.get<BlogSummary[]>("/blogs/all");
    return data;
}

export async function createBlog(dto: CreateBlogDto) {
    // backend MapGroup("/api/blogs") + POST "/"
    const { data } = await http.post("/blogs", dto);
    return data;
}