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

function loadModel(){
    let fs = require('fs');
    let recetas;
    fs.readFileSync(data, (err, data) => {
        if (err) throw err;
        recetas = JSON.parse(data);
    });
    //let rawdata = fs.readFile(data);
    //let recetas = JSON.parse(rawdata);
    return recetas;
}

const recetas = loadModel();

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
app.intent('Default Welcome Intent', (conv, params) => {
    conv.ask(`Bienvenido. Que recetas quieres buscar?.`);
    conv.ask(new BasicCard({
        text: `En esta aplicación econtratas recetas de todo tipo y para todas las personas. 
        Busca la receta que te interesa y intenta cocinarla.  \n`,
        subtitle: 'Aquí encontraras recetas de todo tipo',
        title: 'Recetas de cocina para todo el mundo',
        /*buttons: new Button({
            title: 'This is a button',
            url: 'https://assistant.google.com/',
        }),*/
        image: new Image({
        url: HOSTING + 'recetasLogo.png',
        alt: 'Recetas de cocina logo',
        }),
        display: 'CROPPED',
        }));
    /*conv.ask('Which response would you like to see next?');*/
    conv.ask(new Suggestions(['Entrante','Plato principal','Segundo palto']));
});
app.intent('Entrante', (conv, params) => {
    conv.ask(`Esto es una prueba.`);
    conv.ask(new BrowseCarousel({
        items: [
            new BrowseCarouselItem({
            title: recetas[1].name,
            url: recetas[1].url,
            description: recetas[1].description,
            image: new Image({
              url: recetas[1].img,
              alt: 'Image alternate text',
            }),
            footer: 'Item 1 footer',
          })
          
        ]
      }));
    /*for(let i=0; i<recetas.length; i++){
        conv.ask(recetas[i].name);
    }*/
});

exports.fulfillment = functions.https.onRequest(app);
