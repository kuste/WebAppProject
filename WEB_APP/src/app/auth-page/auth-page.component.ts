import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router'

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {



  url;
  subs;

  constructor(private router: Router) { }

  ngOnInit() {
    if (this.router.url === '/auth/login') {
      this.url = '/auth/login'

    }
    if (this.router.url === '/auth/register') {
      this.url = '/auth/register'
    }

    this.subs = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
/*         console.log(this.router.url);
 */        this.url = this.router.url
      }
    })

    if (this.url === '/auth/login') {
      this.router.navigate(['/auth/login'])
    }
    if (this.url === '/auth/register') {
      this.router.navigate(['/auth/register'])
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  onLoginClick() {
    this.router.navigate(['/auth/login'])


  }
  onRegisterClick() {

    this.router.navigate(['auth/register'])



  }
}
