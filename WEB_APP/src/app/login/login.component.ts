import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { Subscription } from 'rxjs';
import { EventEmitter } from 'events'
import { ApiService } from '../services/api.service'
import { JwtHelperService } from '@auth0/angular-jwt'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isAuthorized;
  errorMsg: String = null;
  isLoading: boolean = false


  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) { }


  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required && Validators.minLength(6)),
    });


  }


  myRawToken;
  helper = new JwtHelperService();




  onSubmit() {

    const email = this.loginForm.get('email').value
    const password = this.loginForm.get('password').value

    this.isLoading = true
    this.apiService.login({ email, password }).subscribe(
      res => {
        console.log(res)
        this.isLoading = false
        this.myRawToken = res.token
      },
      error => {
        console.log(error);
        this.errorMsg = error.error.message
        this.isLoading = false

      },
      () => {
        console.log('done');
        this.isLoading = false
        this.errorMsg = null

      }
    )


    /*    this.loginForm.reset() */
    if (this.authService.isLoggedIn) {
      console.log(this.authService.isLoggedIn);

      /*     let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/content';
          this.router.navigateByUrl(redirect); */
    }








  }

}
