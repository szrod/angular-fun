import { Observable } from 'rxjs/Observable';
import { InputElement, InputElementInput } from './input-element';

export class InputCategory {

  public elements: InputElement[] = [];
  public disabled: boolean = false;
  public hideToggle: boolean = false;

  constructor(public prop: string, public title: string) {

  }

  /**
   * Insert stream for upgrade switch to tell this class to be on or off
   * @param {Observable<boolean>} isUpgradeChange
   */
  public requiresUpgrade(isUpgradeChange: Observable<boolean>): void {
    isUpgradeChange.subscribe((upgrade: boolean) => {
      this.disabled = !upgrade; // if upgrade then enable
    });
  }

  public addElement(input: InputElementInput): void {
    this.elements.push(new InputElement(input, this));
  }

  public clear(): void {
    this.elements.forEach((element: InputElement) => {
      element.active = false;
    });
  }
}
