import { Injectable } from '@angular/core';
import { ApiService } from './api.service'
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, UrlTree, Router } from '@angular/router'
import { Observable } from 'rxjs'
import { map, take } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private apiService: ApiService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot)
    : boolean | Promise<boolean> | Observable<boolean | UrlTree> {
    return this.apiService.user.pipe(
      //use take here to prevent bugs
      take(1),
      map(user => {
        const isAuth = !!user
        if (isAuth) {
          return true
        }
        return this.router.createUrlTree(['/home'])
      }))

  }




}
