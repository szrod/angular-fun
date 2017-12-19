import { Component, OnInit } from '@angular/core';
import { CollapseAnimations } from '@shared/shared-animations';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  animations: [CollapseAnimations.slideInOut],
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  // @TODO make dynamic
  public homeOpen: boolean = false;
  public settingsOpen: boolean = false;

  constructor() { }

  public ngOnInit(): void {
  }

}
