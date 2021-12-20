import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcionesCategoriaComponent } from './opciones-categoria.component';

describe('OpcionesCategoriaComponent', () => {
  let component: OpcionesCategoriaComponent;
  let fixture: ComponentFixture<OpcionesCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpcionesCategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpcionesCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
