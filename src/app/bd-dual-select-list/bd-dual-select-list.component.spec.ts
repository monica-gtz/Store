import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdDualSelectListComponent } from './bd-dual-select-list.component';

describe('BdDualSelectListComponent', () => {
  let component: BdDualSelectListComponent;
  let fixture: ComponentFixture<BdDualSelectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BdDualSelectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BdDualSelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
