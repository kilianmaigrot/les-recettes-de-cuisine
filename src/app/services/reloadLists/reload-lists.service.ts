import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ReloadListsService {
  
  public recipesList: any[]= [];
  public cartList: any[]= [];
  public cartListDone: any[]= [];

  constructor(public http: HttpClient) { }
  
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


}
