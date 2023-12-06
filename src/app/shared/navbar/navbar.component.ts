import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdminUser: boolean = false;
  userInfo: any;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo();
    this.authService.isAdmin().subscribe(res => this.isAdminUser = res);
  }

  logoutHandler(){
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
