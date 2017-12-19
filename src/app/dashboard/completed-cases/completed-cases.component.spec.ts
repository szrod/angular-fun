import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedCasesComponent } from './completed-cases.component';

describe('CompletedCasesComponent', () => {
  let component: CompletedCasesComponent;
  let fixture: ComponentFixture<CompletedCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompletedCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletedCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
