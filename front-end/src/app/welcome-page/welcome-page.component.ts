import { Component, OnInit, Input } from '@angular/core';
import { FairShareProxyService } from '../fair-share-proxy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.css'
})
export class WelcomePageComponent implements OnInit{
  title = 'fair-share-angular';
  isUserAuthenticated: boolean = false;
  userID: any;
  username: any; 
  userEmail: any;


  constructor( private fairShareProxyService: FairShareProxyService, private router: Router) {}

  ngOnInit(): void {
    this.fairShareProxyService.checkAuth().subscribe(
      (response: any) => {
        this.isUserAuthenticated = response.authenticated;
        this.username = response.username;
        this.userEmail = response.userEmail[0].value;

        console.log(response.userEmail[0].value);
        
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
