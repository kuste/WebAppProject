import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isAuthorized;
  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required && Validators.minLength(6)),
    });
  }


  onSubmit() {
    const email = this.loginForm.get('email').value
    const password = this.loginForm.get('password').value


    this.authService.loginUser(email, password)
    if (this.authService.isLoggedIn) {
      console.log(this.authService.isLoggedIn);

  /*     let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/content';
      this.router.navigateByUrl(redirect); */
    }








  }

}
