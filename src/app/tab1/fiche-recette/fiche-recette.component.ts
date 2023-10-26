import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fiche-recette',
  templateUrl: './fiche-recette.component.html',
  styleUrls: ['./fiche-recette.component.scss'],
})
export class FicheRecetteComponent  implements OnInit {
  
  recipeInformations: any = {
    id: null,
    imagePath: null,
    ingredients: [{
        name: null,
        quantity: null,
        unit: null,
      }],
    name: null,
    steps: [],
    time: null,
    type: null,
  }
  
  constructor(
    private route:ActivatedRoute,
    private http:HttpClient,
    ) { }
    
    ngOnInit() {
      this.loadSingleRecipe ()
    }
    
    loadSingleRecipe () {
      const recipeId = this.route.snapshot.paramMap.get('id');
      this.http.get("http://localhost:3000/recettes/" + recipeId).subscribe(
      (res:any) => {      
        this.recipeInformations = res;
        
        let timeHour = this.recipeInformations.time/60 - this.recipeInformations.time%60/60;
        let timeMin = this.recipeInformations.time - timeHour*60;
        if (timeHour == 0) { this.recipeInformations.time = timeMin + " minutes" }
        else {
          if (timeMin == 0) { this.recipeInformations.time = timeHour + " heures" }
          else { this.recipeInformations.time = timeHour + " heures et " + timeMin + " minutes" }          
        }
        return this.recipeInformations;
      },
      (err:any)=> console.log(err)
      )
    }
    
    exportIngtoCart (rank: any) {
      this.loadSingleRecipe()
      console.log(this.recipeInformations.ingredients[rank]);

      this.http.post("http://localhost:3000/cart", this.recipeInformations.ingredients[rank]).subscribe(

      // Si pas d'erreur, affichage de l'alerte, sinon log de l'erreur
      (res:any) => { },
      (err:any)=> console.log(err)
      
      )
    }    
  }