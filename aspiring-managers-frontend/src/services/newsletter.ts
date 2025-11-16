import { http } from "./http";

export interface NewsLetterSignUpDto{
    email : string;
}

export async function subscribeNewsletter(dto: NewsLetterSignUpDto){
    await http.post<void>(`/user/sign-up`, dto);
    return true;
}