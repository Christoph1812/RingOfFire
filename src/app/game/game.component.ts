import { Component, OnInit } from '@angular/core';
import { Game } from '../models/game';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation: boolean = false;
  currentCard: string = '';
  game: Game;

  constructor() {
    this.game = new Game();
    console.log(new Game());
    console.log(this.game.stack[0])
    console.log('Stack:', this.game.stack.pop());
  }

  ngOnInit() {

  }

  takeCard() {
    this.currentCard = String(this.game.stack.pop());
    this.pickCardAnimation = true;
  }
}
