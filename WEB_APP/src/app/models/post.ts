import { User } from './user.model'

export interface IPostDto {
    id: Number,
    title: String,
    descr: String,
    qualifications: String,
    payment: String,
    startDate: Date,
    endDate: Date,
    additionalInfo: String,
    whatIsOffered: String,
    user: User
}