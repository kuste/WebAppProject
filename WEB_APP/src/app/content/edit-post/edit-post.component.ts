import { Component, OnInit, EventEmitter, Output } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { ApiService } from '../../services/api.service'
import { Router } from '@angular/router'
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

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit() {

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

        },
          err => {
            console.log(err);
          },
          () => {
            this.createForm = new FormGroup({
              'title': new FormControl(this.post.title, Validators.required),
              'descr': new FormControl(this.post.descr, Validators.required),
              'qualifications': new FormControl(this.post.qualifications, Validators.required),
              'whatIsOffered': new FormControl(this.post.whatIsOffered, Validators.required),
              'payment': new FormControl(this.post.payment, Validators.required),
              'additionalInfo': new FormControl(this.post.additionalInfo, Validators.required),
              'email': new FormControl(this.post.email, [Validators.required, Validators.email]),

            });
          })
      }
    )



  }

  onSubmit() {

    const newStartDate = new Date(this.startDate.year, this.startDate.month, this.startDate.day).getTime()
    const newEndDate = new Date(this.endDate.year, this.endDate.month, this.endDate.day).getTime()
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
/*           this.createForm.reset()
 */          this.isLoading = false
        

        }
      )

    }
  }


}
