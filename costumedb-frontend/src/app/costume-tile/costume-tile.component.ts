import { Component, Input } from '@angular/core';
import { CostumeResponseObject } from '../models/costume-response.model';

@Component({
  selector: 'app-costume-tile',
  templateUrl: './costume-tile.component.html',
  styleUrls: ['./costume-tile.component.scss']
})
export class CostumeTileComponent {
  @Input() costume: CostumeResponseObject = {
    name: '',
    imageUrl: '',
    imageSource: '',
    description: ''
  };

  constructor() { }
}
