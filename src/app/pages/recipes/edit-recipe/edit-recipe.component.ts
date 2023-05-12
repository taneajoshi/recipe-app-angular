import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  id: number;
  editMode = false;
  constructor(public route: ActivatedRoute){}
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        //Params will be null only in the case when there is no recipe in edit mode and we can consider it a new recipe addition mode.
        this.editMode = +params['id'] != null;
      }
    )
  }

}
