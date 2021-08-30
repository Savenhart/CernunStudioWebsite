import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GameSheet } from 'src/app/models/game-sheet';
import { GameSheetService } from 'src/app/services/game-sheet.service';

@Component({
  selector: 'app-game-sheet',
  templateUrl: './game-sheet.component.html',
  styleUrls: ['./game-sheet.component.css'],
})
export class GameSheetComponent implements OnInit {

  id!: number;

  game: GameSheet = new GameSheet;

  constructor(private gameSheetService: GameSheetService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id') as unknown as number;
    this.gameSheetService.getById(this.id).subscribe(data => {this.game = new GameSheet(data)});   
    }

  ngOnInit(): void {
  }
}
