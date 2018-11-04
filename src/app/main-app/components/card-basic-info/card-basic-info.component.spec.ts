import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardBasicInfoComponent } from './card-basic-info.component';

describe('CardBasicInfoComponent', () => {
  let component: CardBasicInfoComponent;
  let fixture: ComponentFixture<CardBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
