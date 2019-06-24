
import { AuthResponseData } from '../models/user';
import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'



@Injectable({ providedIn: 'root' })

export class ApiService {

    url = 'ec2-46-137-187-23.eu-west-1.compute.amazonaws.com'
    httpOptions = {
        headers: new HttpHeaders({
             
             'Database':'d9oqstb3ttf4ou',
             'User':'rourrnllgplnrh',
             'Port':'5432',
             'Password':'0860957b4bf2674cc94bca0d30ee7d58b62d16029f34bcce617a221e6f1a4bd1'

        }
        ),
    };
    constructor(private http: HttpClient) { }

    public login(loginUser) {
        return this.http.post<AuthResponseData>(this.url,
            { email: loginUser.email, password: loginUser.password }, this.httpOptions)
    }
    public signup(email: string, password: string): Observable<AuthResponseData> {
        return this.http.post<AuthResponseData>(this.url,
            { email: email, password: password }, this.httpOptions)

    }
  
}
