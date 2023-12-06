import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { BookListModule } from './book-list/book-list.module';
import { UserProfileModule } from './user-profile/user-profile/user-profile.module';

const routes: Routes = [
  {path: 'auth', loadChildren: () => AuthModule},
  {path: 'bookList', loadChildren: () => BookListModule},
  {path: 'userProfile', loadChildren: () => UserProfileModule},
  {path: '', redirectTo: 'bookList', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
