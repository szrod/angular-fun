import { InputCategory } from './input-category';

export interface InputElementInput {
  title: string;
  value: string;
  hide?: boolean;
  active?: boolean;
}

export class InputElement {

  public active: boolean = false;
  public title: string;
  public value: string;
  public hide: boolean = false;

  constructor(input: InputElementInput, public parent: InputCategory) {
    this.title = input.title;
    this.value = input.value;
    if (input.hide) {
      this.hide = input.hide;
    }
    if (input.active) {
      this.active = input.active;
    }
  }

  public click(): void {
    this.active = !this.active;
  }

}
