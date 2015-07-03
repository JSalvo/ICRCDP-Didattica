var pointList = [];    
var n=0; 
var objects = {};
var sets = {}; 



/*
function GraphicObject(name)
{
    this.name = name;
    this.canvas = $('<canvas></canvas>');
    this.objectPosition = [0,0];    
    
    this.getX = function()
    {
        return this.objectPosition[0];   
    };

    this.getY = function()
    {
        return this.objectPosition[1];
    };
    
    this.setX = function(x)
    {
        this.objectPosition[0] = x;
    };
    
    this.setY = function(y)
    {
        this.objectPosition[1] = y;
    };
    
    
}

var go = new GraphicObject("prova");

go.setX(12);
go.setY(13);

console.log(go.getX());*/




/*
function Set(name)
{
    this.name = name;
    this.objects = {};
    

}*/



/********************************************/
// VISUALIZZAZIONE DATI DELLA STRUTTURA DATI
/********************************************/

// Produce la lista di punti associata ad un determinato oggetto
function getPoints(objectName)
{
    if (objectName in objects)
    {        
        return objects[objectName]["points_list"];
    }
    else
    {
        console.log('L\'oggetto di cui vuoi la lista di punti non esite.');
        return null;
    }     
}


// Produce il dizionario di tag associati a objectName
function getTags(objectName)
{
    if (objectName in objects)
    {        
        return objects[objectName]['tags'];
    }
    else
    {
        console.log('L\'oggetto di cui richiedi i tag, non esiste.');
        //alert('L\'oggetto di cui richiedi i tag, non esiste. Contattare l\'assistenza');
        return null;
    }
}




/********************************************/
// INSERIMENTO NELLA STRUTTURA DATI
/********************************************/

// Inserisce nella struttura dati un nuovo oggetto e lo nomina name
function newObject(name)
{
    if (name in objects)
    {
        alert('Un oggetto con questo nome esiste già');
        return false;
    }
    else
    {    
        objects[name] = {"points_list": [], "tags": {}};
        return true;
    }
}


// Inserisce nella struttura dati un nuovo insieme e lo nomina name
function newSet(name)
{
    if (name in sets)
    {
        alert('Un insieme con questo nome esiste già');
        return false;
    }
    else
    {    
        sets[name] = {"objects": {}, "info": {}};
        return true;
    }        
}


// Aggiunge l'oggetto objectName all'insieme setName
function addObjectToSet(setName, objectName, canvasId)
{
    if (setName in sets)
    {
        if (objectName in sets[setName]['objects'])
        {
            // Temporaneamente funziona così, poi permetteremo l'introduzione di ulteriori oggetti dello stesso nome
            alert("Oggetto già presente nell'insieme");
            return(false);        
        }
        else
        {
            sets[setName]['objects'][objectName] = {'position': [0, 0], 'canvas_id': canvasId};
            return(true);        
        }    
    }
    else
    {
        alert("L'insieme a cui stai tentando di associare il nuovo oggetto non esiste");
        return false;
    }
}


function addInfoToSet(setName)
{
    if (setName in sets)
    {
        var fiveW = {};
        var notes;
        
        fiveW['who'] = document.getElementById('whoedit').value;
        fiveW['what'] = document.getElementById('whatedit').value;
        fiveW['when'] = document.getElementById('whenedit').value;
        fiveW['where'] = document.getElementById('whereedit').value;
        fiveW['why'] = document.getElementById('whyedit').value;

        notes = document.getElementById('notetextarea').value;
        
        console.log(notes);
        
        sets[setName]['fiveW'] = fiveW;
        sets[setName]['notes'] = notes;
    
    }
    else
    {
        alert("L'insieme a cui stai tentando di aggiungere info non esiste");
        console.log("L'insieme a cui stai tentando di aggiungere info non esiste");
        return false;
    } 
}


function loadInfoFromSet(setName)
{
    if (setName in sets)
    {
        if ('fiveW' in sets[setName] && 'notes' in sets[setName])
        {
            var fiveW = sets[setName]['fiveW'];
            var notes = sets[setName]['notes'];
            console.log("Sono qui");
            
            document.getElementById('whoedit').value = fiveW['who'];
            document.getElementById('whatedit').value = fiveW['what'];
            document.getElementById('whenedit').value = fiveW['when'];
            document.getElementById('whereedit').value = fiveW['where'];
            document.getElementById('whyedit').value = fiveW['why']; 
    
            document.getElementById('notetextarea').value = notes;
            
        }
        else
        {
            document.getElementById('whoedit').value = "";
            document.getElementById('whatedit').value = "";
            document.getElementById('whenedit').value = "";
            document.getElementById('whereedit').value = "";
            document.getElementById('whyedit').value = ""; 
    
            document.getElementById('notetextarea').value = "";  
            
            
            console.log("fiveW e notes non esistono");  
        }
    
    
    }
    else
    {
        alert("L'insieme da cui stai tentanto di prelevare info non esiste");
        console.warn("L'insieme da cui stai tentanto di prelevare info non esiste");
        return false;
    }    
}




// Re-imposta il canvasId associate all'objectName appartenente all'insieme setName
function setCanvasIdObjectSet(setName, objectName, canvasId)
{
    if (setName in sets)
    {
        if (objectName in sets[setName]['objects'])
        {
            sets[setName]['objects'][objectName]['canvas_id'] = canvasId;
            
            return(true);        
        }
        else
        {           
            alert("Oggetto non presente nell'insieme specificato");
            return(false);        
        }    
    }
    else
    {
        alert("L'insieme specificato non esiste");
        return false;
    }

}

function removeObjectFromSetByCanvasId(setName, canvasId)
{
    //console.log("Set Name: " + setName + " Canvas id: " + canvasId );
    
    for (var objectName in sets[setName]['objects'])
    {
        console.log("Nome dell'oggetto: " + objectName);
        
        if (sets[setName]['objects'][objectName]['canvas_id'] == canvasId)
        {
            delete sets[setName]['objects'][objectName];
            return true;
        }    
    }
    return false;
}

// Imposta la posizione dell'oggetto objectName, associato all'insieme setName
function setObjectSetPosition(setName, objectName, objectPosition)
{
    if (setName in sets)
    {
        if (objectName in sets[setName]['objects'])
        {
            sets[setName]['objects'][objectName]['position'] = objectPosition;
            return true;
        }
        else
        {
            alert('L\'oggetto a cui stai tentando di impostare la posizione non esiste!!!');
            return false;
        }    
    }
    else
    {
        alert('L\'insieme del cui oggetto stai tentando di impostare la posizione non esiste');
        return false;    
    }   
}

function setAllObjectsSetPosition(setName)
{
    /*
    var i;
    var = $('#selectObject option:selected').text();
    
    for (i=0; i<$('.tags').length; i++)
    {
        var tagName = $('.tags')[i].id;
        var offset = $('#'+tagName).position();           
        
        setTagPosition(selectedObject, tagName, [Math.floor(offset.left), Math.floor(offset.top)]);

        console.log(offset.left + ", " + offset.top);        
    }*/
    
    console.log("SetName: " + setName);


    if (setName != null && setName != "")
    {
        for (var objectName in sets[setName]['objects'])
        {
            var canvasId = sets[setName]['objects'][objectName]['canvas_id'];
            console.log(canvasId);
            var offset = $('#'+canvasId).position();



            setObjectSetPosition(setName, objectName, [Math.floor(offset.left), Math.floor(offset.top)]);
        }
    }
}


// Associa ad un determinato oggetto della strutturadati una lista di punti
function setPoints(objectName, pointsList)
{
    if (objectName in objects)
    {
        objects[objectName]["points_list"] = pointsList;
        return true;
    }
    else
    {
        // Sarebbe meglio una eccezione visto che questo errore non può essere generato dall'utente
        alert('L\'oggetto a cui vuoi associare la lista di punti non esite. Contattare l\'assistenza.');
        return false;
    }    
}

// Associa il tagName all'oggetto objectName
function addTag(objectName, tagName)
{
    if (objectName in objects)
    {        
        if (tagName in objects[objectName]["tags"])
        {
            alert('Il tag è già esistente');
            return false;
        }
        else
        {   
            objects[objectName]["tags"][tagName] = [761,215];           
            return true;      
        }
    }
    else
    {
        alert('L\'oggetto a cui stai tentando di associare un tag, non esiste. Contattare l\'assistenza');
        return false;
    }      
}

// Memorizza la posizione del tag indicato associato all'oggetto objectName
function setTagPosition(objectName, tagName, tagPosition)
{
    // Se l'oggetto indicato esiste nella struttura dati...
    if (objectName in objects)
    {        
        // Se il tag indicato esiste nella struttura dati ed è associato a objectName...
        if (tagName in objects[objectName]["tags"])
        {
            // Modifica la posizione di tagName
            objects[objectName]["tags"][tagName] = tagPosition;
            return true;  
        }
        else
        {
            // ... non esiste un tag tagName associato a objectName nella struttura dati
            alert('Il tag la cui posizione stai tentando di modificare non esiste.');
            return false;
        }     
    }
    else
    {
        // ... non esiste un oggetto objectName nella struttura dati
        alert('L\'oggetto a cui stai tentando di associare un tag, non esiste. Contattare l\'assistenza');
        return false;
    }        
}




/********************************************/
// RIMOZIONE DATI DELLA STRUTTURA DATI
/********************************************/

// Rimuove dalla struttura dati un oggetto nominato name
function removeObject(name)
{
    if (name in objects)
    {
        delete objects[name];
        return true;
    }
    else
    {
        alert('L\'oggetto che stai tentato di eliminare non esiste');
        return false;
    }
}

// Rimuove dalla struttura dati un insieme di nome name
function removeSet(name)
{
    if (name in sets)
    {
        delete sets[name];
        return true;
    }
    else
    {
        alert('L\'insieme che stai tentato di eliminare non esiste');
        return false;
    }
}

// Rimuove dalla struttura dati un oggetto objectName associato all'insieme setName
function removeObjectFromSet(setName, objetName)
{
    if (setName in sets)
    {
        if (objectName in sets[setName]['objects'])
        {
            delete sets[setName]['objects'][objectName];
            return true;        
        }
        else
        {
            alert('Non l\'loggetto che stati tentando di rimuovere associato all\'insieme');
            return false;    
        }
    
    }
    else
    {
        alert('Non esiste l\'insieme da cui stai tentando di rimuovere l\'loggetto');
        return false;
    }   

}


// Rimuove tagName associate a objectName
function removeTag(objectName, tagName)
{
    if (objectName in objects)
    {        
        if (tagName in objects[objectName]["tags"])
        {
            delete objects[objectName]["tags"][tagName];
            return true;  
        }
        else
        {
            alert('Il tag che stai tentando di eliminare non esiste: ' + tagName);
            return false;
        }     
    }
    else
    {
        alert('L\'oggetto a cui stai tentando di rimuovere un tag, non esiste. Contattare l\'assistenza');
        return false;
    }        
}


/********************************************/
// SALVATAGGIO IN localstorage
/********************************************/

// Salva la struttura dati in localStorage
function saveDataStructureInLocalStorage()
{
    var dataStructureToSave = {};
    
    // Inserisco objects e sets in un unica struttura dati
    dataStructureToSave['objects'] = objects;
    dataStructureToSave['sets'] = sets;    

    // Converto la struttura dati in codice json e salvo la stringa risultato in localStorage
    localStorage.setItem('ircdp_obj_datastructures', JSON.stringify(dataStructureToSave));

}

// Carica la struttura dati con i dati recuperati da localStorage
function loadDataStructureFromLocalStorage()
{
    if (localStorage.getItem('ircdp_obj_datastructures'))
    {    
        var dataStructure = {};        
                
        // Converto la stringa json contenuta in ircdp_ojb_datastructures in una struttura dati
        dataStructure = JSON.parse(localStorage.getItem('ircdp_obj_datastructures'));
       
        // Estraggo dalla struttura dati gli oggetti objects e sets
        objects = dataStructure['objects'];
        sets = dataStructure['sets'];
    }
    else // ... se ircdp_ojb_datastructures non è definito in localStorage, lo definisco
    {
        localStorage.setItem('ircdp_obj_datastructures', "{'objects': {}, 'sets': {}}");
        console.log("ircdp_obj_datastructures non esiste in localstorage e verrà creato");
    }
}

// Ad ogni chiamata questa funzione genera un valore progressivo
function getProgressiveNumber()
{
    // Uso una variabile in localStorage per memorizzare il progresso di un valore intero

    // Se automaticId esiste in local storage
    if (localStorage.getItem("automaticId"))
    {
        // Prendo il valore di automaticId lo converto ad int e lo incremento di 1
        var result = parseInt(localStorage.getItem("automaticId")) + 1;   
       
        // Re-imposto il nuovo valore di automaticId
        localStorage.setItem("automaticId", ""+result);
        return result;
    }
    else
    {
        // Creo la variabile automaticId in localStorage e la imposto a 0
        localStorage.setItem("automaticId", "0");
        return 0;    
    }
}


/********************************************/
// FUNZIONI DI UTILITA'
/********************************************/


// Data una pointList lista di punti, produce le coordinate del rettangolo minimo che li contiene
function getImageEdge(pointList)
{
    var minx=10000, maxx=0, miny=10000, maxy=0;
            
    for (var i = 0; i<pointList.length; i++)    
    {
        if (pointList[i][0] < minx)
            minx = pointList[i][0];
                
        if (pointList[i][0] > maxx)
            maxx = pointList[i][0];
                
        if (pointList[i][1] < miny)
            miny = pointList[i][1];
                
        if (pointList[i][1] > maxy)
            maxy = pointList[i][1];            
    }
            
    return([minx, maxx, miny, maxy]);
}

// Questa la utilizzeremo per le traduzioni
function tr(stringValue)
{
    return(stringValue);
}
