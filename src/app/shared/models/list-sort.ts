import { Sorter } from './sorter';

/**
 * Map to help map column id to object properties
 * 1-1 relationship between column id and class properties associated
 */
export interface ListSortInput {
  [name: string]: string;
}

export class ListSort<Type> {

  constructor(private sorter: Sorter, private input: ListSortInput) {

  }

  /**
   * Get Sorted Data
   * @param {Type[]} items
   * @return {Type[]}
   */
  public sort(items: Type[]): Type[] {
    if (!this.sorter.active || this.sorter.direction === '') {
      return items;
    }

    // @TODO include sort properties
    return items.sort((a: Type, b: Type) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      // These properties are based on the columns in table component
      const property: string = this.input[this.sorter.active];
      [propertyA, propertyB] = [a[property], b[property]];
      const valueA: string | number = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB: string | number = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this.sorter.direction === 'asc' ? 1 : -1);
    });
  }

  /**
   * @TODO build this
   * Checks if mapping input is valid
   */
  private checkValid(): void {
    // if (this.items && this.items.length > 0) {
    //   console.warn('Items is not provided or is empty');
    //   return;
    // } else {
    //   const itemKeys: string[] = Object.keys(this.items[0]);
    //   const mapKeys: string[] = Object.keys(this.input);
    //   return;
    // }
  }
}
