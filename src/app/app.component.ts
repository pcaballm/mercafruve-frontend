import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  mostrarMenus = false;
  constructor(private authService: AuthService) {
    this.mostrarMenus = this.authService.getDatosToken() !== null;
  }
  title = 'mercafruve-front';
  helloWorld() {
    alert('Hello world!');
  }
}
