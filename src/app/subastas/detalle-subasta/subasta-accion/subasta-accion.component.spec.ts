import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubastaAccionComponent } from './subasta-accion.component';

describe('SubastaAccionComponent', () => {
  let component: SubastaAccionComponent;
  let fixture: ComponentFixture<SubastaAccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubastaAccionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubastaAccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
