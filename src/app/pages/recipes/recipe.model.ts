//We can define how a recipe should look like throughout the application.
export class Recipe {
    public name: string;
    public description: string;
    public imageUrl: string;

    constructor(name: string, desc: string, imageUrl: string) {
        this.name = name;
        this.description = desc;
        this.imageUrl = imageUrl;
    }
}