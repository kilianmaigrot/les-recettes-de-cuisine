import { Component, OnInit } from '@angular/core';
import { ReloadListsService } from 'src/app/services/reloadLists/reload-lists.service';

@Component({
  selector: 'app-list-recette',
  templateUrl: './list-recette.component.html',
  styleUrls: ['./list-recette.component.scss'],
})

export class ListRecetteComponent  implements OnInit {

  public results: any[]= [];

  
  constructor(public listService: ReloadListsService) { }
  
  ngOnInit(): void {    
    this.listService.loadRecipes()    
    this.results = this.listService.recipesList
    console.log(this.listService.recipesList);
    
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();    
    this.results = this.listService.recipesList.filter((recipe) => recipe.name.toLowerCase().indexOf(query) > -1);
  }
   
}
