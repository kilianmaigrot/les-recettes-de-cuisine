import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReloadListsService } from 'src/app/services/reloadLists/reload-lists.service';

@Component({
  selector: 'app-ingredient-cart',
  templateUrl: './ingredient-cart.component.html',
  styleUrls: ['./ingredient-cart.component.scss'],
})

export class IngredientCartComponent  implements OnInit {
 
  constructor(
    public listService: ReloadListsService,
    private http:HttpClient,
    ) { }
  
  ngOnInit(): void {    
    this.listService.loadCart() 
    this.listService.loadCartDone()
  }

  moveIngtoBought(ingRank: any, ingId: any) {

    this.http.delete("http://localhost:3000/cart/" + ingId).subscribe(
    (res:any) => {    
    },
    (err:any)=> console.log(err)
    );

    this.http.post("http://localhost:3000/cartDone", this.listService.cartList[ingRank]).subscribe(
    // Si pas d'erreur, reload des 2 listes, sinon log de l'erreur
    (res:any) => {
      this.listService.loadCart();
      this.listService.loadCartDone()
     },
    (err:any)=> console.log(err)    
    )

  }
  
  moveIngBacktoCart(ingRank: any, ingId: any) {

    this.http.delete("http://localhost:3000/cartDone/" + ingId).subscribe(
    (res:any) => {    
    },
    (err:any)=> console.log(err)
    );

    this.http.post("http://localhost:3000/cart", this.listService.cartListDone[ingRank]).subscribe(
    // Si pas d'erreur, reload des 2 listes, sinon log de l'erreur
    (res:any) => {
      this.listService.loadCart();
      this.listService.loadCartDone()
     },
    (err:any)=> console.log(err)    
    )

  }

  deleteIngfromBought (ingId: any) {

    this.http.delete("http://localhost:3000/cartDone/" + ingId).subscribe(
    (res:any) => {    
      this.listService.loadCartDone()
    },
    (err:any)=> console.log(err)
    );

  }
    
}