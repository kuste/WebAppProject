import { Injectable } from '@angular/core';
import { Subject, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { ApiService } from './api.service'


@Injectable({ providedIn: 'root' })

export class AuthService {

    redirectUrl: string
    token: string
    isLoggedIn = false;
    constructor(private apiService: ApiService) { }


    public loginUser(email: string, password: string) {
        const loginUser = {
            email: email,
            password: password
        }
        this.apiService.login(loginUser)
            .subscribe(res => {
                this.token = res.token,
                    this.isLoggedIn = true,
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







