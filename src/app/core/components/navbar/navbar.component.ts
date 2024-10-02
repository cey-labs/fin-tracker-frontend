import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { NavbarService } from '../../services/navbar-service/navbar.service';
import { AuthService } from '../../services/auth-service/auth.service';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatToolbarModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent implements OnInit{
  showMenuButton = false;
  toggleMenuButton = false;

  isLoggedIn = false; // To store login state

  constructor(private navBarService: NavbarService,
    private authService: AuthService,
    private router: Router
  ){}

  ngOnInit() {
    this.navBarService.showMenuButton$.subscribe(show =>{this.showMenuButton = show});

    // Subscribe to authState$ to track login status
    this.authService.authState$.subscribe(user => {
      this.isLoggedIn = !!user; // If user is not null, set isLoggedIn to true
    });
  }

  onMenuButtonClick(){
    this.toggleMenuButton = ! this.toggleMenuButton;
    this.navBarService.toggleMenuButton(this.toggleMenuButton);
  }
  onLoginButtonClick() {
    if (this.isLoggedIn) {
      // If user is logged in, log them out
      this.authService.logout().then(() => {
        console.log("Logged out successfully");
        this.router.navigate(['/home']); // Redirect to login page after logout
      }).catch(error => {
        console.error('Logout failed: ', error); // Handle logout errors if needed
      });
    } else {
      // If user is not logged in, navigate to the login page
      this.router.navigate(['/login']);
    }
  }

}
