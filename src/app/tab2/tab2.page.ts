import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  id!: number;

  recette: any = {

    id: null,
    name: null,
    time: null,
    steps: [""],
    ingredients: [{
      name: null,
      quantity: null,
      unit: null,
  }],

  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadRecette();
  };


  //--Fonction pour empecher à l'input "etape" de faire frappe par frappe--//
  trackByIdx(index: number, obj: any): any {
    return index;
  }

  loadRecette(){

    
    this.http.get("http://localhost:3000/recettes").subscribe((res: any) => {

      console.log(res);

})  
      
}

  //-- Création d'un ingrédient--//
  createIng(): any{
    
    this.recette.ingredients.push({
      name: null,
      quantity: null,
      unit: null,
    });
    
    
  };

  //-- Création d'une étape--//
  createStep(): any{
    this.recette.steps.push(
      ""
    )};

  //-- Supprimer un ingredient--//
  onDeleteIng(rang: any){
    
    this.recette.ingredients.splice(rang,1);
    
  }
  //-- supprimer une étape--//
  onDeleteStep(rang: any){
    this.recette.steps.splice(rang,1);
  }

  //--Soumission du formulaire--//
  onSubmit(){

    this.http.post("http://localhost:3000/recettes", this.recette).subscribe((res: any) =>{

      alert("Votre recette à bien été crée!");

      console.log(this.recette);
    })
    
    
  }

  
}








