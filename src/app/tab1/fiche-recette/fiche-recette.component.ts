import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReloadListsService } from 'src/app/services/reloadLists/reload-lists.service';

@Component({
  selector: 'app-fiche-recette',
  templateUrl: './fiche-recette.component.html',
  styleUrls: ['./fiche-recette.component.scss'],
})
export class FicheRecetteComponent  implements OnInit {

  recipeId: any = this.route.snapshot.paramMap.get('id');  
  
  constructor(
    private http:HttpClient,
    public listService: ReloadListsService,
    private route:ActivatedRoute,
    ) { }
  
    ngOnInit() {
      this.listService.loadSingleRecipe (this.recipeId)
    }
    
    exportIngtoCart (rank: any) {
      this.listService.loadSingleRecipe(this.recipeId)
      console.log(this.listService.recipeInformations.ingredients[rank]);

      this.http.post("http://localhost:3000/cart", this.listService.recipeInformations.ingredients[rank]).subscribe(

      // Si pas d'erreur, affichage de l'alerte, sinon log de l'erreur
      (res:any) => { },
      (err:any)=> console.log(err)
      
      )
    }    
  }