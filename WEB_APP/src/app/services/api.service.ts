import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { AuthResponseData } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, tap } from 'rxjs/operators';



@Injectable({
    providedIn: 'root'
})
export class ApiService {

    baseUrl = 'http://localhost:3000/'
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": 'application/json'
        }
        ),
    };
    constructor(private http: HttpClient) { }

    public login(loginUser) {
        return this.http.post<AuthResponseData>(`${this.baseUrl}user/login`,
            { email: loginUser.email, password: loginUser.password }, this.httpOptions)

    }
    public signup(registerUser): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(`${this.baseUrl}user/signup`,
            { email: registerUser.email, password: registerUser.password, firstName: registerUser.firstName, lastName: registerUser.lastName }, this.httpOptions)

    }

    /* public getAllPosts(): Observable<IGigDto> {
        return this.http.get<IGigDto>(`${this.baseUrl}posts`, this.httpOptions)
    } */


}
