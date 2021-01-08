const functions = require('firebase-functions');

const {
    dialogflow,
    Image,
    Table,
    Carousel,
    BasicCard,
    Button,
    Suggestions,
} = require('actions-on-google');

const app = dialogflow();
const HOSTING = 'https://conversational-ai.eu/diego/hosting/img/';
const data = 'https://conversational-ai.eu/diego/hosting/data/recetasP.json'

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
        buttons: new Button({
            title: 'This is a button',
            url: 'https://assistant.google.com/',
        }),
        image: new Image({
        url: HOSTING + 'recetasLogo.png',
        alt: 'Recetas de cocina logo',
        }),
        display: 'CROPPED',
        }));
    /*conv.ask('Which response would you like to see next?');*/
    conv.ask(new Suggestions(['Cocina Española','Suggestion 2']));
});
//Cosa de prueba 
exports.fulfillment = functions.https.onRequest(app);
