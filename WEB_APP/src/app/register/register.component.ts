import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'first-name': new FormControl(null, Validators.required),
      'last-name':new FormControl(null,Validators.required),
      'email':new FormControl(null,Validators.required),
      'password':new FormControl(null,Validators.required && Validators.minLength(6)),
      'confirm-password':new FormControl(null,Validators.required && Validators.minLength(6))
    });
  }
  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.controls.password.value;
  let confirmPass = group.controls.confirmPass.value;

  return pass === confirmPass ? null : { notSame: true }     
}
  onSubmit() {
  console.log(this.registerForm);
  

  }
}
