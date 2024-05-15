import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSubastaComponent } from './detalle-subasta.component';

describe('DetalleSubastaComponent', () => {
  let component: DetalleSubastaComponent;
  let fixture: ComponentFixture<DetalleSubastaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetalleSubastaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleSubastaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
