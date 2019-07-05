import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service'

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


  constructor(private apiService: ApiService) { }

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
    console.log(this.user);

  }

  onSubmit() {


    const newStartDate = new Date(this.startDate.day, this.startDate.month, this.startDate.year)
    const newEndDate = new Date(this.endDate.day, this.endDate.month, this.endDate.year)
    let valid = newStartDate.getTime() < newEndDate.getTime()
    if (valid && this.createForm.valid && this.user) {
      console.log('valid');

      const post = {

        title: this.createForm.value.title,
        user: this.user,
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

      this.apiService.createPost(post).subscribe(res => {
        console.log(res);

      })

    } else {
      console.log('notvalid');

    }




  }
}
