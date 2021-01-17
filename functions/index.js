//Creator: Diego Arnnanz Alvaro
const functions = require('firebase-functions');

const {
    dialogflow,
    Image,
    Table,
    Carousel,
    BasicCard,
    Button,
    Suggestions,
    BrowseCarousel,
    BrowseCarouselItem,
} = require('actions-on-google');

const app = dialogflow();
const HOSTING = 'https://conversational-ai.eu/diego/hosting/img/';
const HOSTINGData = 'https://conversational-ai.eu/diego/hosting/data/recetasP.json';
const data ='../public/data/recetasP.json'

//Cargamos en un array las recetas del archivo JSON
function loadModel(){
    let fs = require('fs');
    
    let rawdata = fs.readFileSync(data);
    let recetas = JSON.parse(rawdata);

    return recetas;
};

const recetas = loadModel();


//Función que devuelve un BrowseCarousel de recetas en función del filtro
function filterBrowseCarousel(filter){
    let items = [];
    for(let i=0; i<recetas.length; i++){
        if(recetas[i].meal_type==filter){
            items.push (
                new BrowseCarouselItem({
                    title: recetas[i].name,
                    url: recetas[i].url,
                    description: recetas[i].description,
                    image: new Image({
                        url: recetas[i].img,
                        alt: recetas[i].name
                    }),
                }),
            )
        }
    }
    return new BrowseCarousel({
        title: filter,
        items: items
    });
};

//Función que devuelbe un array con las recetas en función del un filtro
function filterSuggestions(filter){
    let items = [];
    for(let i=0; i<recetas.length; i++){
        if(recetas[i].meal_type==filter){
            items.push(recetas[i].name);
        }
    }
    console.log(items);
    return items;
}
/*app.intent('Default Welcome Intent', (conv, params) => {
    if (params.nombre){
        conv.ask(`Hola, ${params.nombre}`);
        conv.ask(new Image({
            url: HOSTING + 'recetasLogo.png',
            alt: 'A bot',
        }));
    }else {
        conv.ask('Hola, desconocido');
    }
});*/
//Intent de incio muestra una BasicCard con información de la aplicación
app.intent('Default Welcome Intent', (conv, params) => {
    conv.ask(`Bienvenido. Que recetas quieres buscar?.`);
    conv.ask(new BasicCard({
        text: `En esta aplicación econtratas recetas de todo tipo y para todas las personas. 
        Busca la receta que te interesa y intenta cocinarla.  \n`,
        subtitle: 'Aquí encontraras recetas de todo tipo',
        title: 'Recetas de cocina para todo el mundo',
        image: new Image({
        url: HOSTING + 'recetasLogo.png',
        alt: 'Recetas de cocina logo',
        }),
        display: 'CROPPED',
        }));
    conv.ask(new Suggestions(['Entrante','Plato principal','Segundo palto']));
});

//Mostrar las recetas clasificadas como entrantes
app.intent('Entrante', (conv, params) => {
    //let recipeSuggestions = filterSuggestions('Entrante');
    conv.ask(`A quí podras encontrar diferectes platos para entrante.`);
    conv.ask(filterBrowseCarousel('Entrante'));
    conv.ask(new Suggestions('Volver'));
    //conv.ask(new Suggestions(recipeSuggestions));
});

//Mostrar las recetas clasificadas como plato principal
app.intent('Plato principal', (conv, params) => {
    conv.ask(`A quí podras encontrar diferectes platos para plato principal.`);
    conv.ask(filterBrowseCarousel('Plato principal'));
    conv.ask(new Suggestions('Volver'));
    //conv.ask(new Suggestions(filterSuggestions('Plato principal')))
});

//Mostrar las recetas clasificadas como segundo plato
app.intent('Segundo palto', (conv, params) => {
    conv.ask(`A quí podras encontrar diferectes platos para segundo plato.`);
    conv.ask(filterBrowseCarousel('Segundo palto'));
    conv.ask(new Suggestions('Volver'));
    //conv.ask(new Suggestions(filterSuggestions('Segundo palto')));
});


exports.fulfillment = functions.https.onRequest(app);
