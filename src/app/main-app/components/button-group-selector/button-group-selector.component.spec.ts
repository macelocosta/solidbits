import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGroupSelectorComponent } from './button-group-selector.component';

describe('ButtonGroupSelectorComponent', () => {
  let component: ButtonGroupSelectorComponent;
  let fixture: ComponentFixture<ButtonGroupSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonGroupSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGroupSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
