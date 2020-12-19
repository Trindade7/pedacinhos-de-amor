import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomiseBasketItemComponent } from './customise-basket-item.component';

describe('CustomiseBasketItemComponent', () => {
  let component: CustomiseBasketItemComponent;
  let fixture: ComponentFixture<CustomiseBasketItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomiseBasketItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomiseBasketItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
