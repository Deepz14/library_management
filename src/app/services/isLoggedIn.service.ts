import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class IsLoggedIn {

    constructor(private router: Router, private authService: AuthService) {}

    resolve() {
        this.authService.isUserLoggedIn().subscribe(res => {
            if(res){
               this.router.navigate(['/bookList/info']); 
            }
        })
    }

}