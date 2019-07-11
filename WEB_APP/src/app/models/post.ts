import { User } from './user.model'

export interface IPostDto {
    id: string,
    title: string,
    descr: string,
    qualifications: string,
    payment: string,
    startDate: Date,
    endDate: Date,
    additionalInfo: string,
    whatIsOffered: string,
    user: User,
    contactEmail: string
}