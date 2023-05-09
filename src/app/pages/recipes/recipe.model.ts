import { Ingredient } from "src/app/shared/ingredient.model";

//We can define how a recipe should look like throughout the application.
export class Recipe {
    public name: string;
    public description: string;
    public imageUrl: string;
    public Ingredients: Ingredient[];

    constructor(name: string, desc: string, imageUrl: string, ingredients: Ingredient[]) {
        this.name = name;
        this.description = desc;
        this.imageUrl = imageUrl;
        this.Ingredients = ingredients;
    }
}
