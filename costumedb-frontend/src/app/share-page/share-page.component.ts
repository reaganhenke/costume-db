import { Component } from '@angular/core';

@Component({
  selector: 'app-share-page',
  templateUrl: './share-page.component.html',
  styleUrls: ['./share-page.component.scss']
})
export class SharePageComponent {
  constructor() { }

  demo = { "name": "Ross and Rachel", "origin": "Friends", "imageUrl":
    "https://static.wikia.nocookie.net/friends/images/c/c9/Ross_and_Rachel_-_Final_Kiss_-_10x18.png",
    "fandomLink": "https://friends.fandom.com/wiki/Ross_and_Rachel",
    "description": "On again off again Rachel and Ross are one of the central couples on Friends",
    "theme": [],
    "size": 2, "characters": [ { "hair": "brown", "gender": "male" }, { "hair": "brown", "gender": "female" } ] 
  }
}
