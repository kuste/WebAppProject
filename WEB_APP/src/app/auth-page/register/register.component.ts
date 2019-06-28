import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { ApiService } from '../../services/api.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMsg: String = null;
  successMsg: String = null;
  isLoading: boolean = false
  registerForm: FormGroup;

  constructor(private router: Router, private authSevice: AuthService, private apiService: ApiService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'first-name': new FormControl(null, Validators.required),
      'last-name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'passwordGroup': new FormGroup({
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'confirm-password': new FormControl(null, [Validators.required, Validators.minLength(6)])
      }, this.checkPasswords)
    });
  }
  checkPasswords(group: FormGroup) {
    let pass = group.get('password').value
    let confirmPass = group.get('confirm-password').value

    return pass === confirmPass ? null : { 'mismatch': true }
  }

  onSubmit() {
    const firstName = this.registerForm.get('first-name').value
    const lastName = this.registerForm.get('last-name').value
    const email = this.registerForm.get('email').value
    const password = this.registerForm.get('passwordGroup').get('password').value

    this.isLoading = true
    this.apiService.signup({ firstName, lastName, email, password })
      .subscribe(
        res => {
          console.log(res.message)
          this.isLoading = false
          this.successMsg = res.message
        },
        error => {
          console.log(error);
          this.errorMsg = error
          this.isLoading = false

        },
        () => {
          console.log('done');
          this.isLoading = false
          this.errorMsg = null
          setTimeout(() => {
            this.router.navigateByUrl('/login')
          }, 650);
        }
      )

    /* this.registerForm.reset() */


  }
}
