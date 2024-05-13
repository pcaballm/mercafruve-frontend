import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionProductosComponent } from './configuracion-productos.component';

describe('ConfiguracionProductosComponent', () => {
  let component: ConfiguracionProductosComponent;
  let fixture: ComponentFixture<ConfiguracionProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfiguracionProductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfiguracionProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
