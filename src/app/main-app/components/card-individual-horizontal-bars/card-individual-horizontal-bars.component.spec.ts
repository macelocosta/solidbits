import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardIndividualHorizontalBarsComponent } from './card-individual-horizontal-bars.component';

describe('CardIndividualHorizontalBarsComponent', () => {
  let component: CardIndividualHorizontalBarsComponent;
  let fixture: ComponentFixture<CardIndividualHorizontalBarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardIndividualHorizontalBarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardIndividualHorizontalBarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
