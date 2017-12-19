import {
  trigger, state, transition, animate, style, group, keyframes,
  AnimationTriggerMetadata
} from '@angular/animations';

export class CollapseAnimations {
  public static slideInOut: AnimationTriggerMetadata = trigger('slideInOut', [
    state('false', style({height: '0px', opacity: '0', display: 'none'})),
    state('true', style({height: '*', opacity: '1'})),
    transition('1 => 0', [
      animate('500ms ease-in', style({height: '0px', opacity: '0'})),
      animate('100ms ease-in', style({display: 'none'}))
    ]),
    transition('0 => 1', [
      animate('500ms ease-out', style({height: '*', opacity: '1'})),
      animate('100ms ease-out', style({display: 'block'}))
    ])
  ]);

  public static slideHide: AnimationTriggerMetadata = trigger('slideHide', [
    state('true', style({display: 'block'})),
    state('false', style({display: 'none'})),
    transition('0 => 1', animate('0ms ease')),
    transition('1 => 0', animate('0ms 200ms ease'))
  ]);

  public static flyInOut: AnimationTriggerMetadata = trigger('flyInOut', [
    state('in', style({width: 120, transform: 'translateX(0)', opacity: 1})),
    transition('void => *', [
      style({width: 10, transform: 'translateX(50px)', opacity: 0}),
      group([
        animate('0.3s 0.1s ease', style({
          transform: 'translateX(0)',
          width: 120
        })),
        animate('0.3s ease', style({
          opacity: 1
        }))
      ])
    ]),
    transition('* => void', [
      group([
        animate('0.3s ease', style({
          transform: 'translateX(50px)',
          width: 10
        })),
        animate('0.3s 0.2s ease', style({
          opacity: 0
        }))
      ])
    ])
  ]);
}

