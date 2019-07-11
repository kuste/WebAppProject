
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpHeaders, HttpParams } from '@angular/common/http'
import { ApiService } from './api.service'
import { take, exhaustMap } from 'rxjs/operators'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private apiService: ApiService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.apiService.user.pipe(
            //takes one value from user and then unsubscribes
            take(1),
            //executes after take is done and gets user as response then returnes new observable
            exhaustMap(user => {
                if (!user) {
                    return next.handle(req)
                }

                else {
                    //clone request and update it with custom header
                    const modifiedReq = req.clone({
                        headers: new HttpHeaders({
                            "Content-Type": 'application/json',
                            "Authorization": `Bearer ${user.token}`
                        })
                    })
                    return next.handle(modifiedReq)
                }
            })
        )

    }
}