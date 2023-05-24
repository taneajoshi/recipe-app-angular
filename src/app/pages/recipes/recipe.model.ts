import { Ingredient } from "src/app/shared/ingredient.model";

//We can define how a recipe should look like throughout the application.
export class Recipe {
    public id: number;
    public name: string;
    public desc: string;
    public image: string;
    public ingredients: Ingredient[];

    constructor(id: number, name: string, desc: string, image: string, ingredients: Ingredient[]) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.image = image;
        this.ingredients = ingredients;
    }
}
