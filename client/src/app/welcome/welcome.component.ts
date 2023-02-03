import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  backgroundImgUrl = 'assets/welcome-bg.jpg';

  constructor(private router: Router) {}

  onGetStarted() {
    this.router.navigate(['/ancienneRouteParente']);
  }
}
