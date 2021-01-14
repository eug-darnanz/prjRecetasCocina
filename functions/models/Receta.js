class Receta {
    //Contructor de la clase Receta
    constructor(name,url,img,scrappy,description,categories,ingredients,steps,tags,meal_type,difficulty,time,dinners,last_update,languages){
        this.name = name;
        this.url = url;
        this.img = img;
        this.scrappy = scrappy;
        this.description = description;
        this.categories = categories.slice();
        this.ingredients = ingredients.slice();
        this.steps = steps.slice();
        this.tags = tags.slice();
        this.meal_type = meal_type;
        this.difficulty = difficulty;
        this.time = time;
        this.dinners = dinners;
        this.last_update = last_update;
        this.languages = languages;
    }
    constructor(name){
        this.name=name;
    }

    // set y get de las variables del modelo
    set name(name) {
        this.name=name;
    }
    get name() {
        return this.name;
    }
    set url(url) {
        this.url=url;
    }
    get url() {
        return this.url;
    }
    set img(img) {
        this.img=img;
    }
    set scrappy(scrappy) {
        this.scrappy=scrappy;
    }
    get scrappy() {
        return this.scrappy;
    }
    set description(description) {
        this.description=description;
    }
    get description() {
        return this.description;
    }
    set categories(categories) {
        this.categories=categories.slice();
    }
    get categories() {
        return this.categories;
    }
    set ingredients(ingredients){
        this.ingredients=ingredients.slice();
    }
    get ingredients(){
        return this.ingredients;
    }
    set steps(steps){
        this.steps=steps.slice();
    }
    get steps(){
        return this.steps;
    }
    set tags(tags){
        this.tags=tags.slice();
    }
    get tags(){
        return this.tags;
    }
    set meal_type(meal_type) {
        this.meal_type=meal_type;
    }
    get meal_type() {
        return this.meal_type;
    }
    set difficulty(difficulty){
        this.difficulty=difficulty;
    }
    get difficulty(){
        return this.difficulty;
    }
    set time(time){
        this.time=time;
    }
    get time(){
        return this.time;
    }
    set dinners(dinners){
        this.dinners=dinners;
    }
    get dinners(){
        return this.dinners;
    }
    set last_update(last_update){
        this.last_update=last_update;
    }
    get last_update(){
        return this.last_update;
    }
    set languages(languages){
        this.languages=languages;
    }
    get languages(){
        return this.languages;
    }


}