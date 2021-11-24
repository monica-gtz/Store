import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductoPopUpComponent } from './add-producto-pop-up.component';

describe('AddProductoPopUpComponent', () => {
  let component: AddProductoPopUpComponent;
  let fixture: ComponentFixture<AddProductoPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProductoPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductoPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
