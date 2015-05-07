var pointList = [];    
var n=0; 
var objects = {};
var sets = {}; 


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
        // Sarebbe meglio una eccezione visto che questo errore non può essere generato dall'utente
        //alert('L\'oggetto di cui vuoi la lista di punti non esite. Contattare l\'assistenza.');
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
        sets[name] = {"objects": [], "info": {}};
        return true;
    }        
}


// Aggiunge l'oggetto objectName all'insieme setName
function addObjectToSet(setName, objectName)
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
            sets['setName']['objects'][objectName] = {'position': [0, 0]};
            return(true);        
        }    
    }
    else
    {
        alert("L'insieme a cui stai tentando di associare il nuovo oggetto non esiste");
        return false;
    }
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

// Rimouve dalla struttura dati un oggetto nominato name
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

// Rimuovere dalla struttura dati un oggetto objectName associato all'insieme setName
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
    
    dataStructureToSave['objects'] = objects;
    dataStructureToSave['sets'] = sets;
    
    //localStorage.setItem('ircdp_obj_datastructures', JSON.stringify(objects));

    localStorage.setItem('ircdp_obj_datastructures', JSON.stringify(dataStructureToSave));

}

// Carica la struttura dati con i dati recuperati da localStorage
function loadDataStructureFromLocalStorage()
{
    if (localStorage.getItem('ircdp_obj_datastructures'))
    {    
        var dataStructure = {};
        
                
        //objects = JSON.parse(localStorage.getItem('ircdp_obj_datastructures'));  
        dataStructure = JSON.parse(localStorage.getItem('ircdp_obj_datastructures'));
        objects = dataStructure['objects'];
        sets = dataStructure['sets'];
    }
    else
    {
        localStorage.setItem('ircdp_obj_datastructures', "{'objects': {}, 'sets': {}}");
        console.log("ircdp_obj_datastructures non esiste in localstorage");
    }
}

// Ad ogni chiamata questa funzione genera un valore progressivo
function getProgressiveNumber()
{
    if (localStorage.getItem("automaticId"))
    {
        var result = parseInt(localStorage.getItem("automaticId")) + 1;   
        localStorage.setItem("automaticId", ""+result);
        return result;
    }
    else
    {
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


function tr(stringValue)
{
    return(stringValue);
}