import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardStackedBarHorizontalComponent } from './card-stacked-bar-horizontal.component';

describe('CardStackedBarHorizontalComponent', () => {
  let component: CardStackedBarHorizontalComponent;
  let fixture: ComponentFixture<CardStackedBarHorizontalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardStackedBarHorizontalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardStackedBarHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
