import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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


  constructor() { }

  ngOnInit() {
    this.createForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'desc': new FormControl(null, Validators.required),
      'qualifications': new FormControl(null, Validators.required),
      'whatIsOffered': new FormControl(null, Validators.required),
      'payment': new FormControl(null, Validators.required),
      'additionalInfo': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),

    });
  }

  onSubmit() {

    console.log(this.createForm);
    console.log(this.startDate);
    console.log(this.endDate);
    const newStartDate = new Date(this.startDate.day, this.startDate.month, this.startDate.year)
    const newEndDate = new Date(this.endDate.day, this.endDate.month, this.endDate.year)
    let valid = newStartDate.getTime() < newEndDate.getTime()
    if (valid) {
      console.log('valid');

    } else {
      console.log('notvalid');

    }




  }
}
