import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCasesComponent } from './current-cases.component';

describe('CurrentCasesComponent', () => {
  let component: CurrentCasesComponent;
  let fixture: ComponentFixture<CurrentCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
