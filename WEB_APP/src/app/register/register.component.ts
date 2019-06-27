import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'
import { ApiService } from '../services/api.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMsg: String = null;
  isLoading: boolean = false
  registerForm: FormGroup;

  constructor(private authSevice: AuthService, private apiService: ApiService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'first-name': new FormControl(null, Validators.required),
      'last-name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'passwordGroup': new FormGroup({
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
        'confirm-password': new FormControl(null, [Validators.required, Validators.minLength(6)])
      }, { validators: this.checkPasswords })
    });
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value
    let confirmPass = group.get('confirm-password').value

    return pass === confirmPass ? null : { notSame: true }
  }

  onSubmit() {
    console.log(this.registerForm);
    const firstName = this.registerForm.get('first-name').value
    const lastName = this.registerForm.get('last-name').value
    const email = this.registerForm.get('email').value
    const password = this.checkPasswords(this.registerForm)

    console.log(this.registerForm, password);

    /*   this.apiService.signup({ firstName, lastName, email, password })
        .subscribe(
          res => {
            console.log(res)
            this.isLoading = false
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
        ) */

    /*     this.registerForm.reset()
     */

  }
}
