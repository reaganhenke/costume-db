import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  loadingMessage: string = "searching...";
  possibleMessages = [
    "digging up graves...", 
    "assembling skeletons...",
    "tasting eye of newt...",
    "cursing our enemies...",
    "raising the dead...",
    "summoning demons...",
    "flying broomsticks...",
    "carving jack o' lanterns...",
    "haunting old houses..."
  ]

  constructor() {
    this.getLoadingMessage();
  }

  getLoadingMessage(): void {
    let index = Math.floor(Math.random() * this.possibleMessages.length);
    this.loadingMessage = this.possibleMessages[index];
    setTimeout(() => {
      this.getLoadingMessage();
    }, 2500);
  }
}
