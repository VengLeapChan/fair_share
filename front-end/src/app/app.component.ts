import { Component, OnInit } from '@angular/core';
import { FairShareProxyService } from './fair-share-proxy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'fair-share-angular';
  isUserAuthenticated: boolean = false;
  user: any;

  isNavbarCollapsed = true;

  constructor( private fairShareProxyService: FairShareProxyService, private router: Router) {}

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  ngOnInit(): void {
    this.fairShareProxyService.checkAuth().subscribe(
      (authenticated: boolean) => {
        this.isUserAuthenticated = authenticated;
      },
      (error) => {
        console.error('Error checking authentication status:', error);
      }
    );
  }

  logout() {
    this.fairShareProxyService.logoutAPI().subscribe(
      () => {

        this.isUserAuthenticated = false;

        window.location.reload();
      },
      (error) => {
        console.error('Error logging out:', error);
      }
    );
  }
}
