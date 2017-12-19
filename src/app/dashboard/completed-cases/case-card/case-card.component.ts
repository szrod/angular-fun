import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-case-card',
  templateUrl: './case-card.component.html',
  styleUrls: ['./case-card.component.scss']
})
export class CaseCardComponent implements OnInit {

  @Input() public title: string;
  @Input() public value: number;

  constructor() {
  }

  public ngOnInit(): void {
  }

}
