import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gig-display',
  templateUrl: './gig-display.component.html',
  styleUrls: ['./gig-display.component.css']
})
export class GigDisplayComponent implements OnInit {

  @Input() gig: any;

  constructor() { }

  ngOnInit() {
  }

}
