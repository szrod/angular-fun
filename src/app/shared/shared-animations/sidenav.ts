import { animate, AnimationTriggerMetadata, state, style, trigger, transition } from '@angular/animations';

export enum SidenavState {
  IN = 'in',
  OUT = 'out'
}

export class SidenavAnimation {

  public static slideDrawerLeft: AnimationTriggerMetadata =  trigger('slideDrawerLeft', [
    state(SidenavState.IN, style({
      transform: 'translate3d(0, 0, 0)'
    })),
    state(SidenavState.OUT, style({
      transform: 'translate3d(-100%, 0, 0)'
    })),
    transition(`${SidenavState.IN} => ${SidenavState.OUT}`, animate('400ms ease-in-out')),
    transition(`${SidenavState.OUT} => ${SidenavState.IN}`, animate('400ms ease-in-out'))
  ]);

  public static slideDrawerRight: AnimationTriggerMetadata =  trigger('slideDrawerRight', [
    state(SidenavState.IN, style({
      transform: 'translate3d(0, 0, 0)'
    })),
    state(SidenavState.OUT, style({
      transform: 'translate3d(100%, 0, 0)'
    })),
    transition(`${SidenavState.IN} => ${SidenavState.OUT}`, animate('400ms ease-in-out')),
    transition(`${SidenavState.OUT} => ${SidenavState.IN}`, animate('400ms ease-in-out'))
  ]);
}
