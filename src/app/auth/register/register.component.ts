import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators  } from "@angular/forms";
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
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router, private notification: NotificationService) {}


  register(){
    if(this.registerForm?.invalid){
      this.notification.showErrorPrompt('Please fill all the fields');
      return;
    }
    const payload: any = {
      ...this.registerForm?.getRawValue(),
      limit: this.registerForm?.getRawValue()?.role === 'admin' ? 'max' : 5
    };
    this.authService.createUser(payload).subscribe(res => {
      if(res){
        sessionStorage.setItem('user', JSON.stringify(res));
        this.notification.showSuccessPrompt('User created successful');
        this.router.navigate(['/auth/login']);
      }
    }, error => {
      this.notification.showErrorPrompt(error.message);
    });
  }
}
