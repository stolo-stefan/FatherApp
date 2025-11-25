import { http } from "./http";

export interface FreeCourseFormDto {
    Name:string,
    Email:string,
    PhoneNumber:string,
    ParticipationChoice:string,
    CourseSource:string
}

export interface EnrollmentCreatedDto {
    enrollmentId: number | null;
    Status: String
}

export async function enrollFreeCourse(courseId: number, form: FreeCourseFormDto): Promise<EnrollmentCreatedDto> {
    const { data } = await http.post<EnrollmentCreatedDto>(`/courses/${courseId}/enroll/free`,form);
    return data;
}
