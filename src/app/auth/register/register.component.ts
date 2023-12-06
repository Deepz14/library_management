import { Component } from '@angular/core';
import { FormGroup, FormControl  } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";
import { User } from "../../models/user";
import { NotificationService } from 'src/app/utils/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    role: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router, private notification: NotificationService) {}


  register(){
    const payload: User = {
      ...this.registerForm?.getRawValue(),
      limit: this.registerForm?.getRawValue()?.role === 'admin' ? 'max' : 5
    };
    this.authService.createUser(payload).subscribe(res => {
      if(res){
        sessionStorage.setItem('user', JSON.stringify(res));
        this.router.navigate(['/auth/login']);
      }
    }, error => {
      this.notification.showErrorPrompt(error.message);
    });
  }
}
