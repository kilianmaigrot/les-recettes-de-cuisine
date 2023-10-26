import { Component } from '@angular/core';
import { ReloadListsService } from 'src/app/services/reloadLists/reload-lists.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})

export class TabsPage {

  constructor(private listService: ReloadListsService) { }

  reloadRecipesTab() {
    this.listService.loadRecipes();
  }

  reloadCartTab() {
    this.listService.loadCart();
    this.listService.loadCartDone();
  }

}
