import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GameImageModel } from 'src/app/models/game-image-model';
import { GameSheet } from 'src/app/models/game-sheet';
import { GameSheetService } from 'src/app/services/game-sheet.service';

@Component({
  selector: 'app-game-sheet',
  templateUrl: './game-sheet.component.html',
  styleUrls: ['./game-sheet.component.css'],
})
export class GameSheetComponent implements OnInit {
  id!: number;

  game: GameSheet = new GameSheet();

  constructor(
    private gameSheetService: GameSheetService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id') as unknown as number;
    this.gameSheetService.getById(this.id).subscribe((data: any) => {
      let gameImages: GameImageModel[] = [];
      
      for (const img of data.image) {
        gameImages.push(img);
      }
      this.game = new GameSheet({
        id: data.id,
        name: data.name,
        content: data.content,
        date: data.date,
        images: gameImages,
        link: data.link
      });
    });
    
  }

  ngOnInit(): void {}
}
