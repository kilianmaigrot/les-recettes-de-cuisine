import { Component, OnInit } from '@angular/core';
import { ReloadListsService } from 'src/app/services/reloadLists/reload-lists.service';

@Component({
  selector: 'app-list-recette',
  templateUrl: './list-recette.component.html',
  styleUrls: ['./list-recette.component.scss'],
})

export class ListRecetteComponent  implements OnInit {
  
  constructor(public listService: ReloadListsService) { }
  
  ngOnInit(): void {    
    this.listService.loadRecipes()
  }
   
}
