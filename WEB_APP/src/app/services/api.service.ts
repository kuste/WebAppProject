import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs'
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http'
import { AuthResponseData } from '../models/AuthResponseData';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model'
import { IPostsDto } from '../models/posts'



@Injectable({
    providedIn: 'root'
})
export class ApiService {

    user = new BehaviorSubject<User>(null);
    userId;
    posts = new Subject<IPostsDto>();

    baseUrl = 'http://localhost:3000/'
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": 'application/json'
        }
        ),
    };


    helper = new JwtHelperService();
    constructor(private http: HttpClient) { }

    public login(loginUser) {
        return this.http.post<AuthResponseData>(`${this.baseUrl}user/login`,
            { email: loginUser.email, password: loginUser.password }, this.httpOptions)
            .pipe(catchError(this.handleError), tap(resData => {

                this.handleAuthentication(resData.email, resData.id, resData.token)
            }))
    }
    public signup(registerUser): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(`${this.baseUrl}user/signup`,
            { email: registerUser.email, password: registerUser.password, firstName: registerUser.firstName, lastName: registerUser.lastName }, this.httpOptions)
            .pipe(catchError(this.handleError), tap(resData => {

            }))
    }

    public getAllPosts() {
        return this.http.get<IPostsDto>(`${this.baseUrl}posts`, this.httpOptions)

    }

    public getAllUserPosts() {
        return this.http.get<IPostsDto>(`${this.baseUrl}posts/${this.userId}`, this.httpOptions)
    }
    private handleAuthentication(email: string, id: number, token: string) {
        const expirationData = this.helper.getTokenExpirationDate(token)
        /*    console.log(expirationData);
           console.log(new Date().toTimeString());
           console.log(new Date(expirationData).toTimeString());
           const expiresIn = new Date(expirationData).getTime() - new Date().getTime()
           console.log(expiresIn);
           console.log(new Date(expirationData).getTime() + new Date().getTime()); */

        const user = new User(
            email,
            id,
            token,
            expirationData)
        this.userId = id;
        this.user.next(user)
    }

  

    private handleError(errorRes: HttpErrorResponse) {
        let errorMsg = 'An unknown error occured!'
        if (!errorRes.error.message || !errorRes.error) {
            return throwError(errorMsg)
        } else {

            return throwError(errorRes.error.message)

        }
    }





}
