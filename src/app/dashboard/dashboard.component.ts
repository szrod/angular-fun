import { Component, OnInit } from '@angular/core';
import { CaseBackendService } from '../backend/case-backend';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() {
  }

  public ngOnInit(): void {
  }

}
