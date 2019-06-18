import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface user {
    type: "object",
    properties: {
        id: "integer",
        email: "string",
        firstName: "string",
        lastName: "string",
        address: "string",
        postalCode: "string",
        city: "string",
        phone: "string",


    }
}

@Injectable({ providedIn: 'root' })

export class ApiService {


    constructor(private http: HttpClient) { }



    getMe(): Observable<user> {
        return this.http.get<user>('')

    }

}
