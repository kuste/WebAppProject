import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ApiService } from '../../services/api.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  errorMsg: String = null;
  successMsg: String = null;
  isLoading: boolean = false
  createForm: FormGroup;
  model
  model1
  model2
  startDate;
  endDate;
  user;


  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.createForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'descr': new FormControl(null, Validators.required),
      'qualifications': new FormControl(null, Validators.required),
      'whatIsOffered': new FormControl(null, Validators.required),
      'payment': new FormControl(null, Validators.required),
      'additionalInfo': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),

    });

    this.user = JSON.parse(localStorage.getItem('userData'))

  }

  onSubmit() {




    const newStartDate = new Date(this.startDate.year, this.startDate.month-1, this.startDate.day)
    const newEndDate = new Date(this.endDate.year, this.endDate.month-1, this.endDate.day)
    let valid = newStartDate < newEndDate

      
    if (valid && this.createForm.valid && this.user) {
      console.log('valid');

      const post = {

        title: this.createForm.value.title,
        user: this.user.id,
        descr: this.createForm.value.descr,
        qualifications: this.createForm.value.qualifications,
        whatIsOffered: this.createForm.value.whatIsOffered,
        payment: this.createForm.value.payment,
        additionalInfo: this.createForm.value.additionalInfo,
        startDate: newStartDate,
        endDate: newEndDate,
        contactEmail: this.createForm.value.email

      }
      console.log(post);

      this.isLoading = true
      this.apiService.createPost(post).subscribe(res => {
        console.log(res);
        this.isLoading = false

      },
        error => {
          console.log(error);
          this.isLoading = false

        },
        () => {
/*           this.createForm.reset()
 */          this.isLoading = false
          this.router.navigate(['content'])
        }
      )

    }
  }




}
