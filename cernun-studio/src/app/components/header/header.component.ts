import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser!: User;

  constructor(private authentificationService: AuthentificationService, private router: Router) {
    this.authentificationService.currentUser.subscribe(x => this.currentUser = x)
   }

  ngOnInit(): void {
  }

  logout(){
    this.authentificationService.logout();
    this.router.navigate(['/home']);
  }

}
