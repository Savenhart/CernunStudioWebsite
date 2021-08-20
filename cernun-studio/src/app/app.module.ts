import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { BlogPostComponent } from './components/blog-post/blog-post.component';
import { CreateblogPostComponent } from './components/createblog-post/createblog-post.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { GameSheetComponent } from './components/game-sheet/game-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BlogPostComponent,
    CreateblogPostComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    GameSheetComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
