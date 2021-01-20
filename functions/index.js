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
    LinkOutSuggestion,
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
                    image: new Image({
                        url: recetas[i].img,
                        alt: recetas[i].name,

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

//Función que devuelve un Carousel de recetas en función del filtro
function filterCarousel(filter){
    let items = {};
    let index=0;
    for(let i=0; i<recetas.length; i++){
        if(recetas[i].meal_type==filter){
            items[index] = {
                optionInfo: {
                    key: recetas.name,
                    synonyms: recetas[i].name,
                  },
                title: recetas[i].name,
                url: recetas[i].url,
                image: new Image({
                    url: recetas[i].img,
                    alt: recetas[i].name,

                }),
            }
            index++;
        }
    }
    return new Carousel({
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

//Función que devuelve una receta en función del nombre de la receta
function getReceta(receta){
    for(let i=0; i<recetas.length; i++){
        if(recetas[i].name==receta){
            return recetas[i];
        }
    }
    return "";
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
app.intent('Default Fallback Intent', (conv) => {
    conv.ask(`Losiento, no le he entendido. Qué receta desea buscar?`);
    conv.ask(new Suggestions('Volver'));
});
//Intent de incio muestra una BasicCard con información de la aplicación
app.intent('Default Welcome Intent', (conv) => {
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
        display: 'DEFAULT',
        }));
    conv.ask(new Suggestions(['Entrante','Plato principal','Segundo palto']));
});

//Mostrar las recetas clasificadas como entrantes
app.intent('Entrante', (conv) => {
    conv.ask(`A quí podras encontrar diferectes platos para entrante.`);
    conv.ask(filterCarousel('Entrante'));
    conv.ask(new Suggestions('Volver'));
});

//Mostrar las recetas clasificadas como plato principal
app.intent('PlatoPrincipal', (conv) => {
    conv.ask(`A quí podras encontrar diferectes platos para plato principal.`);
    conv.ask(filterCarousel('Plato principal'));
    conv.ask(new Suggestions('Volver'));
});

//Mostrar las recetas clasificadas como segundo plato
app.intent('SegundoPalto', (conv) => {
    conv.ask(`A quí podras encontrar diferectes platos para segundo plato.`);
    conv.ask(filterCarousel('Segundo palto'));
    conv.ask(new Suggestions('Volver'));
});

app.intent('Receta', (conv, params, option) => {
    if(params.receta){
        let receta = getReceta(params.receta);
        conv.ask(`La receta que ha buscado es: ` + params.receta );
        if(receta==""){
            conv.ask(`Lo sentimos, no encontramos la receta que desea buscar`);
        }else{
            conv.ask(new BasicCard({
                text: `En esta aplicación econtratas recetas de todo tipo y para todas las personas. 
                Busca la receta que te interesa y intenta cocinarla.  \n`,
                subtitle: receta.description,
                title: receta.name,
                image: new Image({
                url: receta.img,
                alt: receta.name,
                ratio: "square"
                }),
                display: 'DEFAULT',
            }));
            conv.ask(new LinkOutSuggestion({name: 'Receta url', url: receta.url}))
        }
    }else{
        conv.ask(`Lo sentimos, no encontramos la receta que desea buscar`);
    }
    if(option){
        let receta = getReceta(option);
        conv.ask(`La receta que ha buscado es: ` + option);
        console.log(option);
        if(receta==""){
            conv.ask(`Lo sentimos, no encontramos la receta que desea buscar`);
        }else{
            conv.ask(new BasicCard({
                text: `En esta aplicación econtratas recetas de todo tipo y para todas las personas. 
                Busca la receta que te interesa y intenta cocinarla.  \n`,
                subtitle: receta.description,
                title: receta.name,
                image: new Image({
                url: receta.img,
                alt: receta.name,
                ratio: "square"
                }),
                display: 'DEFAULT',
            }));
            conv.ask(new LinkOutSuggestion({name: 'Receta url', url: receta.url}))
        }
    }else{
        conv.ask(`Lo sentimos, no encontramos la receta que desea buscar`);
    }
    conv.ask(new Suggestions('Volver'));
});


exports.fulfillment = functions.https.onRequest(app);
