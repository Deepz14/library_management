import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/utils/notification.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit, OnDestroy {

  userId: number | any;
  routerSubs: Subscription = new Subscription();
  userProfileForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    mobile_no: new FormControl()
  })
  constructor(private activateRouter: ActivatedRoute, private router: Router,
    private authService: AuthService, private notification: NotificationService) { }

  ngOnInit() {
    this.routerSubs = this.activateRouter.params.subscribe((params:any) => {
      if(params.id){
        this.userId = params.id;
        this.fetchUserProfile(params.id);
      }
    })
  }

  fetchUserProfile(id: any){
    this.authService.getUserById(id).subscribe((res: any) => {
      if(res){
        this.userProfileForm.patchValue({
          name: res.name,
          email: res.email,
          mobile_no: res?.mobile_no ? res?.mobile_no : '',
        });
      }
    }, error => {
      this.notification.showErrorPrompt(error.message);
    })
  }

  updateUserProfile(){
    if(this.userProfileForm?.invalid){
      this.notification.showErrorPrompt('Please fill all the fields');
      return;
    }
    this.authService.updateUser(this.userProfileForm.getRawValue(), this.userId).subscribe((res: any) => {
      if(res){
        this.notification.showSuccessPrompt('User profile updated successfully');
        this.router.navigate(['/bookList/info']);
      }
    },  error => {
      this.notification.showErrorPrompt(error.message);
    })
  }

  ngOnDestroy(): void {
    this.routerSubs.unsubscribe();
  }

}
