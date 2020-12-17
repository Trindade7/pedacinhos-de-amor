import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProductHorizontalListComponent} from './product-horizontal-list.component';

describe('ProductHorizontalListComponent', () => {
  let component: ProductHorizontalListComponent;
  let fixture: ComponentFixture<ProductHorizontalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductHorizontalListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductHorizontalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
