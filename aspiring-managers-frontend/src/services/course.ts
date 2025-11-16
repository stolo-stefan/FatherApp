import { http } from "./http";

export interface ReadCourseDto {
    id: number,
    title: string,
    description: string,
    startDate: string,
    earlierDate: string,
    nrOfSeats: number,
    isFree: boolean,
    currency: string,
    priceInCents: number
}

export interface CreateCourseDto {
    title: string,
    description: string,
    startDate: string,
    earlierDate: string,
    nrOfSeats: number,
    isFree: boolean,
    priceInCents: number
}

export interface EnrolledSummaryPerCourseDto{
    email: string,
    id: number,
    status: string
}

export interface EnrolledUserDto {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    participationChoice: string;
    courseSource: string;
    status: string;
    paymentChoice: number; // 0=free, 1=pending, 2=enrolled, 3=cancelled
}

export interface ReadCourseDto {
  id: number;
  title: string;
  description: string;
  startDate: string;
  earlierDate: string;
  nrOfSeats: number;
  isFree: boolean;
  currency: string;
  priceInCents: number;
}

export async function listCourses(): Promise<ReadCourseDto[]> {
    const { data } = await http.get<ReadCourseDto[]>("/courses");
    return data;
}

export async function createCourse(dto: CreateCourseDto): Promise<ReadCourseDto> {
  const { data } = await http.post<ReadCourseDto>("/courses", dto);
  return data;
}

export async function readEnrolledUsers(courseId: number): Promise<EnrolledSummaryPerCourseDto[]> {
    const {data} = await http.get(`/admin/${courseId}/enrolled`);
    return data;
}

export async function readUserDetails(courseId: number, userId: number): Promise<EnrolledUserDto> {
    const {data} = await http.get(`/admin/${courseId}/enrolled/${userId}`);
    return data;
}

export async function deleteCourse(id: number): Promise<boolean> {
  try {
    await http.delete(`/courses/${id}`);
    return true;
  } catch {
    return false;
  }
}

export async function readCourse(id: number): Promise<ReadCourseDto> {
  const { data } = await http.get<ReadCourseDto>(`user/courses/${id}`);
  return data;
}

export async function readLatestCourse(): Promise<ReadCourseDto | null> {
  const { data } = await http.get<ReadCourseDto>(`user/courses/latest`);
  return data;
}