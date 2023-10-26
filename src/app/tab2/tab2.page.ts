import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ReloadListsService } from '../services/reloadLists/reload-lists.service';

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
    imagePath: null,
    
  }
  
  editedRecipeId: any = this.route.snapshot.paramMap.get('id');
  
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    public listService: ReloadListsService,
    private router: Router
    ) {}
    
    ngOnInit(): void {
      this.listService.loadRecipes();
      if (this.editedRecipeId) {
        this.ifRecipeEdit()
      }
      console.log(this.editedRecipeId);    
    };
    
    
    //--Fonction pour empecher à l'input "etape" de faire frappe par frappe--//
    trackByIdx(index: number, obj: any): any {
      return index;
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
    this.recette.steps.push("")
  };
  
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

  ifRecipeEdit() {
    this.http.get("http://localhost:3000/recettes/" + this.editedRecipeId).subscribe(
    (res:any) => {      
      let recipeEdited = res;
      this.recette.id = recipeEdited.id;
      this.recette.name = recipeEdited.name;
      this.recette.time = recipeEdited.time;
      this.recette.steps = recipeEdited.steps;
      this.recette.ingredients = recipeEdited.ingredients;
      this.recette.imagePath = recipeEdited.imagePath;
    },
    (err:any)=> console.log(err)
    )
  }

  
  onEdit(){    
    this.http.put("http://localhost:3000/recettes/" + this.recette.id, this.recette).subscribe((res: any) =>{
      alert("Votre recette à bien été modifiée !");
        this.listService.loadSingleRecipe (this.editedRecipeId);
        this.router.navigateByUrl("/tabs/tab1/" + this.recette.id);
    })
  }

  }







