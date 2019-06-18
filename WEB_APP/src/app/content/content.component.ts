import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  user
  constructor(private apiService: ApiService) { }

  ngOnInit() {

    this.apiService.getMe().subscribe(item =>{
      this.user = item,
      console.log(item);
      
    })
  }

}
