import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CollapseAnimations } from '@shared/shared-animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  animations: [CollapseAnimations.slideInOut],
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() public navToggled: EventEmitter<void> = new EventEmitter();
  public optionsOpened: boolean = false;

  constructor() {
  }

  public ngOnInit(): void {
  }

  public toggleNav(): void {
    this.navToggled.next();
  }

}
