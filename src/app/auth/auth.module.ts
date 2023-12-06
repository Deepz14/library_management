import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes  } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IsLoggedIn } from '../services/isLoggedIn.service';

const routes: Routes = [
  {path: '', redirectTo: 'register', pathMatch: 'full'},
  { path: 'login', component: LoginComponent, resolve: [IsLoggedIn] },
  { path: 'register', component: RegisterComponent, resolve: [IsLoggedIn] }
]

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
