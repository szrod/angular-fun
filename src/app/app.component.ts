import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, Event, NavigationEnd } from '@angular/router';
import { RouteTransition, SidenavAnimation, SidenavState } from '@shared/shared-animations';

@Component({
  selector: 'app-root',
  animations: [RouteTransition.animation, SidenavAnimation.slideDrawerLeft],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public menuState: SidenavState = SidenavState.OUT;

  constructor(private router: Router) {

  }

  public ngOnInit(): void {
    // Close the Side Nav every route change
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.menuState = SidenavState.OUT;
      }
    });
  }

  public getState(outlet: RouterOutlet): string {
    return outlet.activatedRouteData.state;
  }

  public toggleMenu(): void {
    // 1-line if statement that toggles the value:
    this.menuState = this.menuState === SidenavState.OUT ? SidenavState.IN : SidenavState.OUT;
  }

}
