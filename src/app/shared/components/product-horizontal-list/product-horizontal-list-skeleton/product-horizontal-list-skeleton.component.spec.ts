import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductHorizontalListSkeletonComponent } from './product-horizontal-list-skeleton.component';

describe('ProductHorizontalListSkeletonComponent', () => {
  let component: ProductHorizontalListSkeletonComponent;
  let fixture: ComponentFixture<ProductHorizontalListSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductHorizontalListSkeletonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductHorizontalListSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
