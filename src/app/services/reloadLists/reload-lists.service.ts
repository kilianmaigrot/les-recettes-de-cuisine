import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ReloadListsService {
  
  public recipesList: any[]= [];
  public cartList: any[]= [];
  public cartListDone: any[]= [];

  constructor(
    public http: HttpClient,    
    ) { }

  public recipeInformations: any = {
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
  
  public loadRecipes() {
    this.http.get("http://localhost:3000/recettes").subscribe(
    (res:any) => {      
      this.recipesList = res;
      return this.recipesList;
    },
    (err:any)=> console.log(err)
    )
  }  
  
  loadCart() {
    this.http.get("http://localhost:3000/cart").subscribe(
    (res:any) => {      
      this.cartList = res;
      return this.cartList;
    },
    (err:any)=> console.log(err)
    )
  }
  
  loadCartDone() {
    this.http.get("http://localhost:3000/cartDone").subscribe(
    (res:any) => {      
      this.cartListDone = res;
      return this.cartListDone;
    },
    (err:any)=> console.log(err)
    )
  }
  
  loadSingleRecipe (idRecipe: any) {

    console.log(idRecipe);
    
    this.http.get("http://localhost:3000/recettes/" + idRecipe).subscribe(
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


}
