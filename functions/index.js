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
    SimpleResponse,
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
let items = {};

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

//Función que devuelve un Carousel de recetas en función del tiempo de la receta
function filterBrowseCarouselLongTime(filter){
    let items = [];
    for(let i=0; i<recetas.length; i++){
        if(recetas[i].time>filter){
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

//Función que devuelve un Carousel de recetas en función del tiempo de la receta
function filterBrowseCarouselShortTime(filter){
    let items = [];
    for(let i=0; i<recetas.length; i++){
        if(recetas[i].time<=filter){
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
    items = {};
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

//Función que devuelve un Carousel de recetas en función del tiempo de la receta
function filterCarouselLongTime(filter){
    items = {};
    let index=0;
    for(let i=0; i<recetas.length; i++){
        if(recetas[i].time>filter){
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

//Función que devuelve un Carousel de recetas en función del tiempo de la receta
function filterCarouselShortTime(filter){
    items = {};
    let index=0;
    for(let i=0; i<recetas.length; i++){
        if(recetas[i].time<=filter){
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
    conv.ask(new Suggestions(['Entrante','Plato principal','Segundo palto', 'Recetas cortas', 'Recetas largas']));
});

//Mostrar las recetas clasificadas como entrantes
app.intent('Entrante', (conv) => {
    conv.ask(new SimpleResponse({
        text: 'Aquí podras encontrar diferentes platos para entrante.',
        speech: '<speak><emphasis level="moderate">Aquí podras encontrar diferentes platos para entrante.</emphasis></speak>'
    }))
    conv.ask(filterCarousel('Entrante'));
    conv.ask(new Suggestions('Volver'));
});

//Mostrar las recetas clasificadas como plato principal
app.intent('PlatoPrincipal', (conv) => {
    conv.ask(new SimpleResponse({
        text: 'Aquí podras encontrar diferectes platos para plato principal.',
        speech: '<speak><emphasis level="moderate">Aquí podras encontrar diferectes platos para plato principal.</emphasis></speak>'
    }))
    conv.ask(filterCarousel('Plato principal'));
    conv.ask(new Suggestions('Volver'));
});

//Mostrar las recetas clasificadas como segundo plato
app.intent('SegundoPalto', (conv) => {
    conv.ask(new SimpleResponse({
        text: 'Aquí podras encontrar diferentes platos para segundo plato.',
        speech: '<speak><emphasis level="moderate">Aquí podras encontrar diferentes platos para segundo plato.</emphasis></speak>'
    }))
    conv.ask(filterCarousel('Segundo palto'));
    conv.ask(new Suggestions('Volver'));
});

//Muestra a través de una BasicCard la receta en cuestión, para más información hemos añadido un LinkOutSuggestion
app.intent('Receta', (conv, params, option) => {
    //Recibe un parametro de entrada
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
    }else if(option){ //Recibe una posición de Carousel a través de un evento de DialogFlow
        let receta = getReceta(items[option].title);
        conv.ask(`La receta que ha buscado es: ` + items[option].title);
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

//Muestra recetas con un tiempo mayor a 30 minutos en un Carousel
app.intent('RecetasLargas', (conv) => {
    conv.ask(new SimpleResponse({
        text: 'Aquí podras encontrar diferentes recetas largas.',
        speech: '<speak><emphasis level="moderate">Aquí podras encontrar diferentes recetas largas.</emphasis></speak>'
    }))
    conv.ask(filterCarouselLongTime(30));
    conv.ask(new Suggestions('Volver'));
});

//Muestra recetas con un tiempo menor o igual a 30 minutos en un Carousel
app.intent('RecetasCortas', (conv) => {
    conv.ask(new SimpleResponse({
        text: 'Aquí podras encontrar diferentes recetas cortas.',
        speech: '<speak><emphasis level="moderate">Aquí podras encontrar diferentes recetas cortas</emphasis></speak>'
    }))
    conv.ask(filterCarouselShortTime(30));
    conv.ask(new Suggestions('Volver'));
});

exports.fulfillment = functions.https.onRequest(app);
