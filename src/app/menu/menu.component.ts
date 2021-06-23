import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../_services/auth/authentication.service';
import { TokenStorageService } from '../_services/auth/token-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public currentUser$:Observable<any>;
  public connected:boolean=false;
  public subcription:Subscription;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  username?: string;

  constructor(private authenticationService:AuthenticationService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.currentUser$=this.authenticationService.currentUser,
    this.subcription= this.authenticationService.currentUser.subscribe({
      next: user=> {
        if(user)
        {this.connected=true}
        else{ this.connected=false}
      },
      error:console.log,
      complete:console.log}
    );
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');

      this.username = user.username;
    }}
    logout(){
localStorage.clear();
location.reload();
    }


 /* logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }*/








}
