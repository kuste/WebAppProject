import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { ApiService } from './api.service'


@Injectable({ providedIn: 'root' })

export class AuthService {

    redirectUrl: string
    token: string
    isLoggedIn = false;
    errorMsg: String
    constructor(private apiService: ApiService) { }


    public getError() {
        return this.errorMsg
    }

    public loginUser(email: string, password: string) {
        const loginUser = {
            email: email,
            password: password
        }

        this.apiService.login(loginUser).subscribe(
            res => { console.log(res) },
            error => {
                console.log(error);
                this.errorMsg = error.error.message

            },
            () => {
                console.log('done');
            }

        )




    }


    public registeUser(firstName: String, lastName: String, email: string, password: string) {
        const registerUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }

        this.apiService.signup(registerUser).subscribe(res => {
            console.log(res);

        })



    }



    logout(): void {
        this.isLoggedIn = false
        this.token = ''
    }






    isAuthenticated(): boolean {
        return true
    }




}







