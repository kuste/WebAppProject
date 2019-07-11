import { Injectable } from '@angular/core';
import { Observable, throwError, Subject, BehaviorSubject, observable } from 'rxjs'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { AuthResponseData } from '../models/AuthResponseData';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, tap, exhaustMap, map } from 'rxjs/operators';
import { User } from '../models/user.model'
import { IPostsDto } from '../models/posts'
import { IPostDto } from '../models/post'
import { Router } from '@angular/router'
import { DataHandlerService } from './data-handler.service';
import { IUserDto } from '../models/user'



@Injectable({
    providedIn: 'root'
})
export class ApiService {
    _updateId = new BehaviorSubject<string>(null);
    user = new BehaviorSubject<User>(null);
    private userPosts: IPostDto[] = []
    postUpdated = new Subject<IPostDto[]>();

    baseUrl = 'http://localhost:3000/'

    private tokenExpirationTimer: any;
    helper = new JwtHelperService();
    constructor(private http: HttpClient, private router: Router, private dataHandlerService: DataHandlerService) { }

    public login(loginUser) {
        return this.http.post<AuthResponseData>(`${this.baseUrl}user/login`,
            { email: loginUser.email, password: loginUser.password })
            .pipe(catchError(this.handleError), tap(resData => {
                this.handleAuthentication(resData.email, resData.id, resData.token, resData.firstName, resData.lastName)
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
            firstName: string,
            lastName: string,
            id: string;
            email: string;
            _token: string;
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'))


        if (!userData) {
            return
        }
        const loadedUser = new User(
            userData.firstName,
            userData.lastName,
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate))


        if (loadedUser.token) {
            this.user.next(loadedUser)
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
            this.autoLogout(expirationDuration)
        }
        console.log('I auto logged in at -> ' + Date())
    }
    public logout() {
        this.user.next(null)
        this.router.navigate(['/auth/login'])
        localStorage.removeItem('userData')
        console.log('I logged out at -> ' + Date())
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null
    }

    private autoLogout(tokenEpirationTime: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            console.log('Token expired');
            this.logout()
        }, tokenEpirationTime);

    }





    public setUpdateId(id: string) {
        this._updateId.next(id)
    }

    public getAllPosts() {
        return this.http.get<IPostsDto>(`${this.baseUrl}posts`)
            .pipe(catchError(this.handleError))

    }

    public getOnePost(id: string) {
        return this.http.get<IPostDto>(`${this.baseUrl}posts/${id}`)
            .pipe(catchError(this.handleError))

    }

    public getAllUserPosts() {
        return this.http.get<IPostsDto>(`${this.baseUrl}posts/user/${this.user.value.id}`)
            .pipe(catchError(this.handleError))

    }


    public createPost(post) {
        return this.http.post<IPostDto>(`${this.baseUrl}posts`, post)
            .pipe(catchError(this.handleError))
    }

    public updatePost(id: string, post) {
        return this.http.patch<IPostDto>(`${this.baseUrl}posts/${id}`, post)
            .pipe(catchError(this.handleError), tap(() => {
                this.postUpdated.next(this.userPosts.slice())
            }))
    }


    public deletePosts(id: string) {
        return this.http.delete<IPostDto>(`${this.baseUrl}posts/${id}`)
            .pipe(catchError(this.handleError))
    }


    public updateUser(id: string, user) {
        return this.http.patch<IUserDto>(`${this.baseUrl}user/${id}`, user)
            .pipe(catchError(this.handleError), map(res => {
                return res.updatedUser
            }))
    }

    private handleAuthentication(email: string, id: string, token: string, firstName: string, lastName: string, ) {
        const expirationDate = this.helper.getTokenExpirationDate(token)
        const user = new User(
            firstName,
            lastName,
            email,
            id,
            token,
            expirationDate)
        this.user.next(user)

        console.log('I logged in at -> ' + Date())

        const expirationDuration = new Date(expirationDate).getTime() - new Date().getTime()
        this.autoLogout(expirationDuration)
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
