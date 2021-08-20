import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSheetComponent } from './components/game-sheet/game-sheet.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'gameSheet', component: GameSheetComponent},
  {path: 'userProfile', component: UserProfileComponent},
  {path: "**", redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
