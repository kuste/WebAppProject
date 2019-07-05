import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, BehaviorSubject } from 'rxjs'
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http'
import { AuthResponseData } from '../models/AuthResponseData';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, tap, take, exhaustMap } from 'rxjs/operators';
import { User } from '../models/user.model'
import { IPostsDto } from '../models/posts'
import { IPostDto } from '../models/post'
import { Router } from '@angular/router'



@Injectable({
    providedIn: 'root'
})
export class ApiService {

    user = new BehaviorSubject<User>(null);
    posts = new Subject<IPostsDto>();

    baseUrl = 'http://localhost:3000/'


    helper = new JwtHelperService();
    constructor(private http: HttpClient, private router: Router) { }

    public login(loginUser) {
        return this.http.post<AuthResponseData>(`${this.baseUrl}user/login`,
            { email: loginUser.email, password: loginUser.password })
            .pipe(catchError(this.handleError), tap(resData => {
                this.handleAuthentication(resData.email, resData.id, resData.token)
            }))
    }
    public signup(registerUser): Observable<AuthResponseData> {

        return this.http.post<AuthResponseData>(`${this.baseUrl}user/signup`,
            { email: registerUser.email, password: registerUser.password, firstName: registerUser.firstName, lastName: registerUser.lastName })
            .pipe(catchError(this.handleError), tap(resData => {
                console.log(resData);
            }))
    }

    public autoLogin() {
        //variables must be named as in user.model.ts
        const userData: {
            id: string;
            email: string;
            _token: string;
            _expirationDate: string
        } = JSON.parse(localStorage.getItem('userData'))
        if (!userData) {
            return
        }
        const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._expirationDate))


        if (loadedUser.token) {
            this.user.next(loadedUser)
        }
        console.log('I auto logged in at -> ' + Date())
    }
    public logout() {
        this.user.next(null)
        this.router.navigate(['/auth/login'])
        localStorage.removeItem('userData')
        console.log('I logged out at -> ' + Date())

    }

    public autoLogout(isTokenExpired: boolean) {
        if (isTokenExpired) {
            console.log('Token expired');
            this.logout()
        }


    }
    public getAllPosts() {
        return this.http.get<IPostsDto>(`${this.baseUrl}posts`)
            .pipe(catchError(this.handleError))

    }

    public getAllUserPosts() {
        return this.http.get<IPostsDto>(`${this.baseUrl}posts/${this.user.value.id}`)
            .pipe(catchError(this.handleError))

    }

    public createPost(post) {
        return this.http.post<IPostDto>(`${this.baseUrl}posts`, post)
            .pipe(catchError(this.handleError))
    }

    private handleAuthentication(email: string, id: string, token: string) {
        const expirationDate = this.helper.getTokenExpirationDate(token)
        const expirationTime = this.helper.isTokenExpired(token)
        const user = new User(
            email,
            id,
            token,
            expirationDate)
        this.user.next(user)
        console.log('I logged in at -> ' + Date())
        this.autoLogout(expirationTime)
        localStorage.setItem('userData', JSON.stringify(user))
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
