import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionSubastasComponent } from './configuracion-subastas.component';

describe('ConfiguracionSubastasComponent', () => {
  let component: ConfiguracionSubastasComponent;
  let fixture: ComponentFixture<ConfiguracionSubastasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguracionSubastasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfiguracionSubastasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
