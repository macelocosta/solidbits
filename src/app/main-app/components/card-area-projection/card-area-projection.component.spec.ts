import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAreaProjectionComponent } from './card-area-projection.component';

describe('CardAreaProjectionComponent', () => {
  let component: CardAreaProjectionComponent;
  let fixture: ComponentFixture<CardAreaProjectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardAreaProjectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardAreaProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
