import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../services/api.service'
import { take } from 'rxjs/operators'
import { FormGroup, FormControl, Validators } from '@angular/forms'


@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  firstName: string;
  lastName: string;
  email: string;
  isLoading: boolean = true
  isEditMode = false
  showUpdateModal = false;
  userForm: FormGroup
  constructor(private apiService: ApiService) { }




  ngOnInit() {
    this.isLoading = true
    this.apiService.user.subscribe(res => {
      if (res) {
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.email = res.email;
        this.isLoading = false
      }

    })

    this.userForm = new FormGroup({
      'firstName': new FormControl(this.firstName, Validators.required),
      'lastName': new FormControl(this.lastName, Validators.required),
      'email': new FormControl(this.email, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)

    });


  }

  handleEdit() {
    this.showUpdateModal = true
    console.log('click');

  }
  onClose() {
    this.showUpdateModal = false
  }
  onSubmit() {
    this.showUpdateModal = false
    let newUser = null
    if (this.userForm.get('password').value) {
      newUser = this.userForm.value
    } else {
      const { firstName, lastName, email } = this.userForm.value
      newUser = {
        firstName,
        lastName,
        email
      }
    }
    const userId = this.apiService.user.value.id

    this.apiService.updateUser(userId, newUser).subscribe(res => {
      this.firstName = res.firstName
      this.lastName = res.lastName
      this.email = res.email
    

    })
  }

}