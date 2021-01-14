const HOSTINGData = 'https://conversational-ai.eu/diego/hosting/data/recetasP.json';
const data ='../public/data/recetasP.json'

function loadModel(){
    let fs = require('fs');
    
    let rawdata = fs.readFileSync(data);
    let recetas = JSON.parse(rawdata);

    console.log(recetas[1].name);
    for (let i=0; i<recetas.length ; i++){
        console.log(recetas[i].steps[1]);
    }

    return recetas;
}

const recetas = loadModel();