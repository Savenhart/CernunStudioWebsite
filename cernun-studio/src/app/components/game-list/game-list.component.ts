import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GameSheetService } from 'src/app/services/game-sheet.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
 
  games$: Observable<any> = this.gameSheetService.getAll();

  constructor(private gameSheetService: GameSheetService) {
    }

  ngOnInit(): void {
  }
}
