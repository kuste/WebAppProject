import { Component, OnInit, EventEmitter, Output, AfterViewInit } from '@angular/core'
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms'
import { ApiService } from '../../services/api.service'
import { take } from 'rxjs/operators'


@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

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
  post;
  postId;
  @Output() submit = new EventEmitter<void>()
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

    this.apiService._updateId.pipe(take(1)).subscribe(res => {
      this.postId = res

    },
      err => {
        console.log(err);
      },
      () => {
        this.apiService.getOnePost(this.postId).subscribe(res => {
          this.post = res
          const sDate = new Date(res.startDate)
          const eDate = new Date(res.endDate)

          this.startDate = {
            year: sDate.getFullYear(),
            month: sDate.getMonth() + 1,
            day: sDate.getDate()
          }

          this.endDate = {
            year: eDate.getFullYear(),
            month: eDate.getMonth() + 1,
            day: eDate.getDate()
          }
        },
          err => {
            console.log(err);
          },
          () => {
            this.createForm.get('title').setValue(this.post.title)
            this.createForm.get('descr').setValue(this.post.descr)
            this.createForm.get('qualifications').setValue(this.post.qualifications)
            this.createForm.get('whatIsOffered').setValue(this.post.whatIsOffered)
            this.createForm.get('payment').setValue(this.post.payment)
            this.createForm.get('additionalInfo').setValue(this.post.additionalInfo)
            this.createForm.get('email').setValue(this.post.contactEmail)

          })
      }
    )

  }

  onSubmit() {

    const newStartDate = new Date(this.startDate.year, this.startDate.month - 1, this.startDate.day)
    const newEndDate = new Date(this.endDate.year, this.endDate.month - 1, this.endDate.day)
    let valid = newStartDate < newEndDate

    if (valid && this.createForm.valid) {
      console.log('valid');

      const post = {
        user: this.user.id,
        title: this.createForm.value.title,
        descr: this.createForm.value.descr,
        qualifications: this.createForm.value.qualifications,
        whatIsOffered: this.createForm.value.whatIsOffered,
        payment: this.createForm.value.payment,
        additionalInfo: this.createForm.value.additionalInfo,
        startDate: newStartDate,
        endDate: newEndDate,
        contactEmail: this.createForm.value.email

      }
      console.log(this.post);


      this.isLoading = true
      this.apiService.updatePost(this.postId, post).subscribe(res => {
        console.log(res);
        this.isLoading = false


      },
        error => {
          console.log(error);
          this.isLoading = false

        },
        () => {
          this.isLoading = false
          this.submit.emit()

        }
      )

    }
  }


}
