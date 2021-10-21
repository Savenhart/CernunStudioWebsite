import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  userToView: string = '';

  user: User = {
    userName: '',
    password: '',
    id: '',
  };

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.userToView = this.route.snapshot.paramMap.get(
      'userName'
    ) as unknown as string;
    this.userService.getByUserName(this.userToView).subscribe((data: any) => {
      this.user = {
        userName: data.userName,
        password: data.password,
        id: data.id,
      };
    });
  }

  ngOnInit(): void {}
}
