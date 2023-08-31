import { Component, OnInit, inject } from '@angular/core';
import { Game } from '../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation: boolean = false;
  currentCard: string = '';
  game: Game;
  games$: Observable<any>;

  constructor(public firestore: Firestore, public dialog: MatDialog) {
    this.game = new Game();
    const coll = collection(firestore, 'games');
    this.games$ = collectionData(coll);

    this.games$.subscribe((game: any) => {
      console.log('upadte', game);
    })

  }

  ngOnInit() {


  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = String(this.game.stack.pop());
      this.pickCardAnimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      setTimeout(() => {
        this.pickCardAnimation = false;
        this.game.playedCards.push(this.currentCard);
      }, 1000);
    }
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0)
        this.game.players.push(name);
    });
  }
}

