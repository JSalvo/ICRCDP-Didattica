/*
var db;

var request = indexedDB.open("Oggetti");
request.onerror = function(event) {
  alert("Non è stato possibile aprire IndexedDB");
};
request.onsuccess = function(event) {
  db = event.target.result;
    console.log('Database aperto con successo');
};*/









function removeSelectedObject()
{
    var objectName = $('#selectObject option:selcted').text();
    
    removeObject(objectName);
}

        
// Inserisce i possibili oggetti selezionabili nel ComboBox
function populateSelectObjectComboBox()
{    
    removeAllOptionFromSelectObject();
    for (var key in objects)
    {
        console.log(key);
        console.log('<option value="' + key + '">' + key + '</option>');
        $('<option value="' + key + '">' + key + '</option>').appendTo('#selectObject');
    }
}

// MODIFICA DEL CODICE HTML

// Rimuove dal combobox per la selezione dei tag l'opzione correntemente selezionata
function removeSelectedTag()
{
    objectName = $('#selectObject option:selected').text();
    tagName = $('#selectTag option:selected').text();
    
    if (removeTag(objectName, tagName))
    {
        populateSelectTagComboBox();
        $('#'+tagName).remove();
    }
}


// Popola il combobox per la selezione dei tag
function populateSelectTagComboBox(selectedTag)
{
    removeAllOptionFromSelectTag();
    
    // Ricavo il nome dell'oggetto correntemente selezionato
    var selectedObject = $('#selectObject option:selected').text();    
    // Ottengo la lista dei tag associati all'oggetto correntemente selezionato
    var tags = getTags(selectedObject);    
    
    // Per ciascun tag ...
    for (var tag in tags)
    {
        // Inserisco nel combobox, la scelta 
        $('<option value="' + tag + '">' + tag + '</option>').appendTo('#selectTag');
    }
    
    // Nel combobox imposto il tag correntemente selezionato
    if (selectedTag)
        setSelectedObject('selectTag', selectedTag);        
}

// SUL CODICE HTML - Nel combobox per la selezione degli oggetti, rimuove tutte le opzioni 
function removeAllOptionFromSelectObject()
{
    $('#selectObject option').remove();
}


// SUL CODICE HTML - Rimouove dal combobox per la selezione dei tag, tutti i possibili tag selezionabili
function removeAllOptionFromSelectTag()
{
    $('#selectTag option').remove();
}

function removeSelectedObjectFromSelectObject()
{
    $('#selectObject option:selected').remove();
}

// SUL CODICE HTML - Rimuove tutti i div che rappresentano tag
function removeAllDivTags()
{  
    $('.tags').remove();
}

// SUL CODICE HTML - Mostra tutti i tags
function showAllDivTags()
{    
    removeAllDivTags();
    // Ricavo il nome dell'oggetto correntemente selezionato
    var selectedObject = $('#selectObject option:selected');   
    var tags = getTags(selectedObject.text());
    
    for (var tag in tags)
    {    
        // Aggiungo il tag al codice html
        $('<div style="left:' + tags[tag][0] + 'px;top:' + tags[tag][1] + 'px;" ' + 'id="' + tag + '"'+ ' class="draggable tags">' +  tag + '</div>').appendTo('#cpn');
    }    
    setAllTagPosition();
}



/*
function addObjectToLocalStorage(objName, objPoints)
{        
    if (objName in pobjects)
    {
        alert('Un oggetto con questo nome esiste già');
        return false;    
    }
    else
    {   pobjects[objName] = objName;
        localStorage.setItem('pobjects', JSON.stringify(pobjects));        
        localStorage.setItem(objName, JSON.stringify(objPoints));
        
        return true;
    }
}*/

/*
function removeObjectFromLocalStorage(objName)
{
    localStorage.removeItem(objName);    
    delete pobjects[objName];    
    localStorage.setItem('pobjects', JSON.stringify(pobjects));     
}*/


// Dato un tag <select> con id=eid, imposta l'opzione etxt come selezionata
function setSelectedObject(eid, etxt) 
{
    var eid = document.getElementById(eid);
    for (var i = 0; i < eid.options.length; ++i) 
    {
        if (eid.options[i].text === etxt)
            eid.options[i].selected = true;
    }
}


// Per tutti i tag presenti nel codice html, estrae la posizione e la salva nella struttura dati
function setAllTagPosition()
{
    var i;
    var selectedObject = $('#selectObject option:selected').text();
    
    for (i=0; i<$('.tags').length; i++)
    {
        var tagName = $('.tags')[i].id;
        var offset = $('#'+tagName).position();           
        
        setTagPosition(selectedObject, tagName, [Math.floor(offset.left), Math.floor(offset.top)]);

        console.log(offset.left + ", " + offset.top);        
    }
}


// Ottiene le coordinate del puntatore del mouse, relative all'oggetto canvas.
function getMouse(e, canvas) {
    var element = canvas, offsetX = 0, offsetY = 0, mx, my;

    // e e' l'oggetto "evento" che contiene le coordinate assolute del puntatore
    // del mouse
            
    // Per calcolare le coordinate relative sul canvas, devo sottrarre gli offset
    // degli elementi che contengono canvas. Eseguo pertanto un ciclo sulla catena
    // di antenati di canvas
    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }

    // La parte commentata che segue, deve essere implementata solo se il calcolo delle 
    // coordinate relative non risultasse corretto
    // Add padding and border style widths to offset
    // Also add the <html> offsets in case there's a position:fixed bar (like the stumbleupon bar)
    // This part is not strictly necessary, it depends on your styling
                 
    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;

    // We return a simple javascript object with x and y defined
    return {x: mx, y: my};
}      
              
/* Data una lista di punti nello spazio cartesiano, trova le coordinate 
del rettangolo "minimo" che li contiene*/      
function getImageEdge()
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

function paintImageOnLeftCanvas()
{
    var canvas = document.getElementById('paint');                        
    var context = canvas.getContext('2d');                         
    var dataUrl = localStorage.getItem("croppedImage");
    var imageObj = new Image();
                        
    imageObj.src = dataUrl;

    imageObj.onload = function() 
    {
        context.drawImage(imageObj, 0, 0, 400, 300);                            
    };
}

function clearRightCanvas()
{
    var canvas = document.querySelector('#paint2');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 400, 300);
}

        
// Questa funzione viene eseguita quando il documento html e' stato
// integralmente caricato.
$(document).ready(function(){
(
    function() 
    {    
        loadDataStructureFromLocalStorage();
        populateSelectObjectComboBox();
        populateSelectTagComboBox();
        showAllDivTags();
        drawObjectInRightCanvas($('#selectObject option:selected').text());
        
        var canvas = document.querySelector('#paint');
        var ctx = canvas.getContext('2d');	
        var sketch = document.querySelector('#sketch');            
        var sketch_style = getComputedStyle(sketch);
        var mouse = {x: 0, y: 0};
            
        var cntr = document.querySelector('#cntr');
        var cnt = document.querySelector('#cnt');
        var cpn = document.querySelector('#cpn');
            
        //canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        //canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        // Imposto le proprieta' delle linee che disegnero'
        ctx.lineWidth = 1;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'blue';            

        /* Definisco la funzione che gestisca la pressione del tasto sinistro del mouse */
        canvas.addEventListener('mousedown', 
            function(e) 
            {
                // Inizio a disegnare
                ctx.beginPath();                    
                    
                // Converto le coordinate del mouse da assolute a relative
                var risultato = getMouse(e, canvas);
               
                mouse.x = risultato.x;
                mouse.y = risultato.y;                   
                    
                // Salvo il punto in una lista in modo da poterlo riutilizzare poi
                pointList.push([mouse.x, mouse.y]);
               
                // Posiziono la "penna" alle coordinate indicate
                ctx.moveTo(mouse.x, mouse.y);
                // Quando il mouse è premuto inizio ad "ascoltare" anche 
                // l'evento di "movimento" del mouse
                canvas.addEventListener('mousemove', onPaint, false);
            }, false);
	 
            // Definisco la funzione che gestica il rilascio del tasto sinistro del mouse
	       canvas.addEventListener('mouseup', 
                function() 
                {
                    // Quando il pulsante del mouse viene rilasciato, smetto di ascoltare gli
                    // eventi di moviemnto del mouse
			         canvas.removeEventListener('mousemove', onPaint, false);
	            }, false);
	       
            // Definisco la funzione che gestica l'uscita del puntatore del mouse dalla finestra
            canvas.addEventListener('mouseout', 
                function() 
                {
                    // ...anche quando il mouse esce dalla finestra, smetto di "ascoltare"
                    // gli eventi di movimento del mouse
                    canvas.removeEventListener('mousemove', onPaint, false);
	            }, false);            
            
            // Definisco la funzione di disegno. Questa funzione viene richiamata ogniqualvolta il puntatore del
            // mouse si muove sul canvas, mentre il pulsante sinistro del mouse è premuto.
            var onPaint = function(e) 
            {      
                // Converto le coordinate del mouse da assolute a relative
                var risultato = getMouse(e, canvas);
               
                mouse.x = risultato.x;
                mouse.y = risultato.y;
               
                //console.log(risultato.x + ", " + risultato.y);
                //console.log(risultato.x);
                //console.log(risultato.y);
               
                // Salvo il punto in una lista in modo da poterlo riutilizzare poi
                pointList.push([mouse.x, mouse.y]);
               
                // Sposto la penna alle coordinate indicate. Su questo percorso disegnero'
                // una riga quando chiamero' il comando stroke
                ctx.lineTo(mouse.x, mouse.y);
                // Ora disegno una riga
                ctx.stroke();    
	       };        
            paintImageOnLeftCanvas();
    }());            
     
   

    
function drawObjectInRightCanvas(objectName)
{
        var pointList = getPoints(objectName);
        var canvas = document.querySelector('#paint2');
        var ctx = canvas.getContext('2d');	
        var sketch = document.querySelector('#sketch2');            
        var sketch_style = getComputedStyle(sketch);   
        
        if (!objectName)
            return;
    
    
        console.log("" + objectName);
    
        // Imposto le proprieta' delle linee che disegnero'
        ctx.lineWidth = 1;
        // ctx.lineJoin = 'round';
        //ctx.lineCap = 'round';
        ctx.fillStyle = 'red';      
        //ctx.shadowColor = 'black';
        //ctx.shadowBlur = 3;                    

        for (var i = 0; i<pointList.length; i++)
        {            
            if (i==0)
            {
                ctx.beginPath();     
                ctx.moveTo(pointList[i][0], pointList[i][1]);
                continue;
            }
                        
            ctx.lineTo(pointList[i][0], pointList[i][1]);
            ctx.stroke();                              
        }                  
        ctx.fill();     
}
    
    

            
            
$('#myButton').click(
    function() 
    {
        var r = getImageEdge();
                
        var hImg = r[3] - r[2]+10;
        var wImg = r[1] - r[0]+10;
                
        // Creo un immagine PNG con le dimensioni indicate
        var p = new PNGlib(wImg, hImg, 256);
                
        // Imposto il colore di background a trasparente
        var background = p.color(0, 0, 0, 0); 

        // Scandisco la lista e per ciascun elemento ivi presente disegno un
        // punto nell'immagine
        for (var i = 0; i<pointList.length; i++)
        {
            var colore = p.color(0x00, 0x00, 0x00);
            p.buffer[p.index(pointList[i][0]-r[0], pointList[i][1]-r[2])] = colore;        
        }     
                
        pointList = [];
               
        imgURI = "data:image/png;base64," + p.getBase64();                
        
        $('#content').append('<div id="img'+n+'" class="draggable" style="background-image: url('+imgURI+');width:'+wImg+'px;height:'+hImg +'px;"></div>');      
                    
        n = n+1;               
}); 
            
$('#myButton2').click(
    function() 
    {      
        var r = getImageEdge();
                
        var hImg = r[3] - r[2];
        var wImg = r[1] - r[0];                

        $('#content').append('<div>');
                    
        for (var i = 0; i<pointList.length; i++)
        {
            $('#content').append('('+(pointList[i][0]-r[0]));
            $('#content').append(', '+(pointList[i][1]-r[2])+') ');      
        }     
                   
        $('#content').append('</div>');      
                    
        n = n+1;               
    });  
    
// Aggiunge un tag all'oggetto correntemente selezionato e lo rappresenta graficamente
$('#addTag').click(
    function()
    {       
        // Ricavo dal campo newTagName, il nome del tag da associare
        var tagName = document.getElementById('newTagName').value;          
        
        // Se l'associazione del tag va a buon fine
        if (addTag($('#selectObject option:selected').text(), tagName))
        {
            // Aggiungo il tag al codice html
            //$('<div ' + 'id="' + tagName + '"'+ ' class="draggable tags">' +  tagName + '</div>').appendTo('#cpn');
            
            // Vado ad aggiornare la posizione dei tag nella struttura dati
            setAllTagPosition();
            
            // Ripopolo il combo box, così che comprenda anche il nuovo tag  specificando
            // che sarà lui il tag "correntemente" selezionato
            populateSelectTagComboBox(tagName);            
            
            showAllDivTags();
        }
    }    
);    
    
// Aggiunge un oggetto alla struttura dati e lo rappresenta graficamente sul canvas di destra
$('#addNewObject').click(
    function()
    {        
        // Memorizzo nella struttura dati la posizione corrente dei tag (riferiti all'oggetto correntemente selezinato)
        setAllTagPosition();
        
        if (pointList.length == 0)
        {
            alert('Devi ricalcare qualcosa per poi poterlo salvare');
            return;        
        }
        
        // Recupero il nome da assegnare all'oggetto dal campo editObjectName
        var objectName = document.getElementById('editObjectName').value;
            
        // Se l'inserimento nella struttura dati va a buone fine...
        if (newObject(objectName))
        {           
            // Ri-popolo il combobox per la selezione degli oggetti
            populateSelectObjectComboBox(); //
            // Imposto l'oggetto correntemente selezionato
            setSelectedObject('selectObject', objectName); // 
            
            setPoints(objectName, pointList); //
            
            // Ri-popolo il combobox per la selezione dei tag
            populateSelectTagComboBox();
            // Visualizzo i div che rappresentano i tag associati all'oggetto
            showAllDivTags();
            
            // Pulisco il canvas di destra
            clearRightCanvas();
            
            // Disegno l'oggetto nel canvas di destra
            drawObjectInRightCanvas(objectName);
            
            // Ridisegno l'immagine sul canvas di sinistra andando a sovrascrivere altro
            paintImageOnLeftCanvas();
            
            // Svuoto la lista di punti
            pointList = [];       

        }
    });
    
$('#removeTag').click(
    function()
    {
        //$('#o01').remove();
        removeSelectedTag();       
    }
);
    
$('#deleteObject').click(
    function()
    {
        // Dal combo prendo il nome dell'oggetto da eliminare
        objectToRemove = $('#selectObject option:selected').text();
        
        // Rimuovo dal combobox l'oggetto da rimuovere
        removeSelectedObjectFromSelectObject();
        
        // Rimuove l'oggetto dalla struttura dati
        removeObject(objectToRemove);
        
        // Visualizza tutti i tag rappresentati tramite oggetti dv, rimuovemdo quelli presenti in precedenza
        showAllDivTags();
        
        // Rimuove i tag nel combobox corrispondente e ripopola il combobox con i tag del nuovo
        // oggetto selezionato
        populateSelectTagComboBox();
        
        // Ripulisco il canvas di destra
        clearRightCanvas();
        
        // Ridisegno l'oggetto correntemente selezionato
        drawObjectInRightCanvas($('#selectObject option:selected').text());         
    }
);
    
    
$('#selectObject').change(
    function()
    {
                
        // Visualizza tutti i tag rappresentati tramite oggetti div, rimuovemdo quelli presenti in precedenza
        showAllDivTags();
        
        // Rimuove i tag nel combobox corrispondente e ripopola il combobox con i tag del nuovo
        // oggetto selezionato
        populateSelectTagComboBox();
        
        // Ripulisco il canvas di destra
        clearRightCanvas();
        
        // Ridisegno l'oggetto correntemente selezionato
        drawObjectInRightCanvas($('#selectObject option:selected').text());       
    }
);    
    
// Risponde al click sul pulsante Pulisci    
$('#cleanLeftCanvas').click(
    function()
    {
        // Ridisegna l'immagine sul canvas di sinistra andando a sovrascrivere eventuali disegni
        paintImageOnLeftCanvas();
        // Svuoto la lista di punti
        pointList = [];    
    }
);
    
    
$('#saveObjects').click(
    function()
    {
        setAllTagPosition();
        
        saveDataStructureInLocalStorage();    
        alert("Modifiche salvate!");
    }
);   
});       
        

interact('.draggable')
        .draggable({
            onmove: function (event) {
                var target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.webkitTransform =
                target.style.transform = 
                'translate(' + x + 'px, ' + y + 'px)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        })
        
.inertia(true)
      
.resizable(true); 
