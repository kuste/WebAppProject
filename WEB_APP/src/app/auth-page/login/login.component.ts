import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ApiService } from '../../services/api.service'
import { DataHandlerService } from '../../services/data-handler.service'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: String = null;
  isLoading: boolean = false


  constructor(private apiService: ApiService, private router: Router,private dataHandlerService:DataHandlerService) { }


  ngOnInit() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required && Validators.minLength(6)),
    });


  }


  onSubmit() {

    const email = this.loginForm.get('email').value
    const password = this.loginForm.get('password').value

    this.isLoading = true
    this.apiService.login({ email, password }).subscribe(
      res => {
        this.isLoading = false
        console.log(res);
      
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
        this.router.navigate([`/content`])


      }
    )

    this.loginForm.reset()




  }

}
