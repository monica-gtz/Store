import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdSelectListComponent } from './bd-select-list.component';

describe('BdSelectListComponent', () => {
  let component: BdSelectListComponent;
  let fixture: ComponentFixture<BdSelectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BdSelectListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BdSelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
