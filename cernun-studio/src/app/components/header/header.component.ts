import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenficationService } from 'src/app/services/authenfication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser!: User;

  constructor(private authenficationService: AuthenficationService, private router: Router) {
    this.authenficationService.currentUser.subscribe(x => this.currentUser = x)
   }

  ngOnInit(): void {
  }

  logout(){
    this.authenficationService.logout();
    this.router.navigate(['/home']);
  }

}
