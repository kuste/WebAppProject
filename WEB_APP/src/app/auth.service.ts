import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiredIn: string,
    localId: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient) { }

    signup(email: string, password: string, firstName:string,lastName:string,) {

        return this.http.post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=AIzaSyDBUds5BILpgZYOHi2ai-cx-RmQzP6x-oE',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        )
    }
}