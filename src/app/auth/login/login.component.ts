import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { NotificationService } from 'src/app/utils/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authservice: AuthService, private router: Router, private notification: NotificationService) {}

  login() {
    if(this.loginForm?.invalid){
      this.notification.showErrorPrompt('Please fill all the fields');
      return;
    } 
    this.authservice.login(this.loginForm.getRawValue()).subscribe((res: any) => {
      if(res?.length > 0){
        sessionStorage.setItem('user', JSON.stringify(res[0]));
        this.notification.showSuccessPrompt('Login successful');
        this.router.navigate(['/bookList']);
      }else{
        this.notification.showErrorPrompt('Invalid credentials');
      }
    }, error => {
      this.notification.showErrorPrompt(error.message);
    })
  }
} 
