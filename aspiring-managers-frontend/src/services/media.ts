import { http } from "@/services/http";

export type MediaKind = 0| 1 | "Image" | "Video";

export interface ReadMediaDto {
    id: number;
    blogId: number;
    url: string;
    originalFileName?: string | null;
    sizeBytes: number;
    contentType?: string | null;
    storageProvider: string;
    kind: MediaKind;
}

// GET /api/blogs/{blogId}/media
export async function listMedia(blogId: number): Promise<ReadMediaDto[]> {
    const { data } = await http.get<ReadMediaDto[]>(`/blogs/${blogId}/media`);
    return data;
}

// POST /api/blogs/{blogId}/media  (multipart/form-data)
export async function uploadMedia(blogId: number, files: FileList | File[]) {
    const form = new FormData();
    Array.from(files).forEach((f) => form.append("files", f));
    const { data } = await http.post(`/blogs/${blogId}/media`, form, { headers: { "Content-Type": undefined } });
    return data as ReadMediaDto[];
}

// DELETE /api/blogs/{blogId}/media/{mediaId}
export async function deleteMedia(blogId: number, mediaId: number) {
    await http.delete(`/blogs/${blogId}/media/${mediaId}`);
}