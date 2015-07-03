//Dipende da dataStructure.js

var selectedSet = null;

var offset = { x: 0, y: 0 };


function findNotZero(m, r, c)
{
    for (var i=r; i<m.length(); i++)
    {
        if (m[i][c] != 0)
            return i;    
    }
    
    return -1;
}


function pivot(m, r1, c)
{
    var tmp;
    var r2;
    
    if (m[r1][c] != 0)
        return m;   
    
    r2 = findNotZero(m, r1+1, c);
    
    if (r2 == -1)
        return null;    
    
    for (var j=0; j<m[0].length(); j++)
    {
        tmp = m[r2][j];
        
        m[r2][j] = m[r1][j];
        m[r1][j] = tmp;      
    }
    
    return m;
}

function gauss(m, row, column)
{   
    for (var i=0; i<row-1; i++)
    {
        m = pivot(m, i, i);
        
        if (!m)
            return null;

        for (var k=i+1; k<row; k++)
        {       
            var mol = (1.0 / m[k][i])*m[i][i];
            
            console.log("mol: " + mol);
            
            for (var j=i; j<column; j++)    
            {
                m[k][j] = m[k][j]*mol - m[i][j];   
            }
        }    
    }
    
    return m;
}

function vect(p1, p2)
{
    return [p2[0]-p1[0], p2[1]-p1[1]];
}

function printArray(m)
{
    console.log(m[0][0] + ", " + m[0][1] + ", " + m[0][2]);
    console.log(m[1][0] + ", " + m[1][1] + ", " + m[1][2]);

}


function interesection(p1, p2, p3, p4)
{
    var v1 = vect(p1, p2);
    var v2 = vect(p3, p4);
    var m;
    var r1, r2;
    var result;   
    
    r1 = [v1[0], -v2[0], -p1[0] + p3[0]];
    r2 = [v1[1], -v2[1], -p1[1] + p3[1]];
    
    
    m = [r1, r2];   
    
    m = gauss(m, 2, 3);   
    
    if (m)
    {
        var u, t;
        
        u = m[1][2] / m[1][1];
        t = (m[0][2] - m[0][1]*u) / m[0][0];
        
        return [t, u];    
    }
    
    return null;
}

function removeSelectedSet()
{
    var setName = $('#selectSet option:selected').text();
    
    removeSet(setName);
}

// Inserisce i possibili insiemi selezionabili nel ComboBox
function populateSelectSetComboBox()
{    
    removeAllOptionFromSelectSet();
    for (var key in sets)
    {
        $('<option value="' + key + '">' + key + '</option>').appendTo('#selectSet');    
        
        
    }
    
    selectedSet = $('#selectSet option:selected').text();
}


function removeCanvasById(canvasId)
{
    $('#'+canvasId).remove();
}


// SUL CODICE HTML - Nel combobox per la selezione degli oggetti, rimuove tutte le opzioni 
function removeAllOptionFromSelectSet()
{
    $('#selectSet option').remove();
}

function drawObjectsSet(setName)
{
    cancellAllObjectsSet();
    
    // Ricavo il nome dell'oggetto correntemente selezionato
    //var selectedSet = $('#selectSet option:selected');                        
                 
    console.log("setName: " + setName);
    
    if (setName != null && setName != "")
    {
        for (objectName in sets[setName]['objects'])
        {
            // Ottengo le coordinate del rettangolo minimo che contiene la lista di punti
            var ie = getImageEdge(getPoints(objectName));
            var canvasId = "canvas"+objectName+getProgressiveNumber();
            var cposition = sets[setName]['objects'][objectName].position;

            sets[setName]['objects'][objectName]['canvas_id'] = canvasId;


            console.log("Position: ", cposition);

            // Creo un nuovo canvas
            var c1 = $('<canvas id="' +
                                canvasId  +
                       '" width="' +
                                Math.floor((ie[1] - ie[0])*0.325) +
                       '" height="'+
                                Math.floor((ie[3]-ie[2])*0.325) +
                       '" class="canvasInRightPanel"></canvas>');

            c1.draggable();


            c1.css('position', 'absolute');
            c1.css('left', cposition[0]);
            c1.css('top', cposition[1]);


            // Aggiungo il canvas c1 a #cpn
            c1.appendTo('#cpn');
            c1.zIndex(99);


            // Disegno sul canvas appena aggiunto a #cpn
            drawObjectInCanvas(objectName, canvasId, 0.325, true, 'blue');
        }
    }

}

function cancellAllObjectsSet()
{
    $('.canvasInRightPanel').remove();

}


function setSelectedSet(selectionElementId, setName) 
{
    var selectionElement = document.getElementById(selectionElementId);
   
    for (var i = 0; i < selectionElement.options.length; ++i) 
    {
        if (selectionElement.options[i].text === setName)
            selectionElement.options[i].selected = true;
    }
    
    selectedSet = setName;
}




// Disegno l'oggetto objectName nel canvas canvasId
function drawObjectInCanvas(objectName, canvasId, scaleXY, minimize, fillStyle)
{
        var pointList = getPoints(objectName);
        var canvas = document.querySelector('#'+canvasId);
        var ctx = canvas.getContext('2d'); 
        
        // Imposto le proprieta' delle linee che disegnero'
        ctx.lineWidth = 1;
        ctx.fillStyle = fillStyle;           
                   
    
        if (minimize)
        {
            // Ottengo le coordinate del rettangolo minimo che contiene i punti di pointList
            var offset = getImageEdge(pointList);
            // Ottengo larghezza e altezza del suddetto rettangolo minimo
            var w = (offset[1] - offset[0])*scaleXY;
            var h = (offset[3] - offset[2])*scaleXY;               
            
            // Ottengo il contesto del canvas canvasId
            ctx = canvas.getContext('2d');
            
            // Disegno nel canvas, congiungendo i punti contenuti in pointList
            for (var i = 0; i<pointList.length; i++)
            {            
                if (i==0)
                {
                    ctx.beginPath();     
                    ctx.moveTo(Math.floor((pointList[i][0]-offset[0])*scaleXY), Math.floor((pointList[i][1]-offset[2])*scaleXY));
                    continue;
                }
                        
                ctx.lineTo(Math.floor((pointList[i][0]-offset[0])*scaleXY), Math.floor((pointList[i][1]-offset[2])*scaleXY));
                ctx.stroke();                              
            }      
            
            // Riempio il disegno
            ctx.fill();              
            
        }
        else // Questa alternativa è da sistemare ...
        {   
            for (var i = 0; i<pointList.length; i++)
            {            
                if (i==0)
                {
                    ctx.beginPath();     
                    ctx.moveTo(Math.floor(pointList[i][0]*scaleXY), Math.floor(pointList[i][1]*scaleXY));
                    continue;
                }
                        
                ctx.lineTo(Math.floor(pointList[i][0]*scaleXY), Math.floor(pointList[i][1]*scaleXY));
                ctx.stroke();                              
            }                  
            ctx.fill();     
        }
}

// Questa funzione viene eseguita quando il documento html e' stato
// integralmente caricato.
$(document).ready(
    function()
    {       
       
        $('#setNotes').css('visibility', 'hidden' );
        $('#cognitiveAgents').css('visibility', 'hidden');
        
        // I dati memorizzati in localstorage vengono caricati nella struttura dati js
        loadDataStructureFromLocalStorage();    
        // Riempio il combobox per la selezione degli insiemi
        populateSelectSetComboBox();        

        drawObjectsSet(selectedSet);
        loadInfoFromSet($('#selectSet option:selected').text());
        //addInfoToSet(setName);
        
        
        // Imposto l'aera di cancellazione degli oggetti
        var trashBin = $('#eraseZone');
                
        trashBin.droppable(
        {
            drop: function(event, ui)
            {
                var draggableId = ui.draggable.attr("id");
                var droppableId = $(this).attr("id");
                
                //var setName = document.getElementById('newSetNameEdit').value;
                var setName = $('#selectSet option:selected').text();
                
                
                if (setName != "")
                {
                    if (removeObjectFromSetByCanvasId(setName, draggableId))
                        $('#'+draggableId).remove();                
                }
                            
                console.log("Scaricamento " + draggableId + " " + droppableId);
            }                 
        } );        
        
        
        // Per ciascun obj contenuto in objects
        for (var obj in objects)
        {               
            // Compongo il codice html per la generazione dei canvas di visualizzazione oggetto
            var str = '<tr>\n\t<td>\n\t\t<canvas id="'+obj+'" width="130" height="97" class="menu menuEntry"></canvas>\n\t</td>\n\t<td>\n\t\t<ul>';           
            
            // Ottengo i tag associati all'oggetto
            var tags = getTags(obj);
            
            // Se ci sono tag ...
            if (tags)
            {
                // ... per ciascun tag ...
                for (tag in tags)
                {                    
                    str = str + '\n\t\t\t<li>'+tag+'</li>';                   
                }  
            }
            
            str = str + '\n\t\t</ul>\n\t</td>\n</tr>';
            
            $(str).appendTo('#tableObject');
         
            // Disegno l'oggetto nella tabella
            drawObjectInCanvas(obj, obj, 0.325, false, 'black');
        }       
        
        // Esempio di event delegate
        $('#cpn').on('click', '.prova',
                function(e)
                {
                    console.log("hai fatto click");
                }       
            );
        
        $('#newSetButton').on('click', function(e)
        {            
            var setName = document.getElementById('newSetNameEdit').value;
            
            // Salvo la posizione corrente degli oggetti visualizzati
            setAllObjectsSetPosition(selectedSet);
           
            // Creo un nuovo insieme
            newSet(setName);
            
            // Ripopolo i combobox per selezionare gli insiemi
            populateSelectSetComboBox();
                        
            // Seleziono il nuovo insieme
            setSelectedSet('selectSet', setName);
            
            drawObjectsSet(selectedSet);

        });
        
        $('#saveButton').on('click', function(e)
        {
            
            setAllObjectsSetPosition($('#selectSet option:selected').text());
            //objects = {};
            //sets = {};
                      
            addInfoToSet($('#selectSet option:selected').text());
            saveDataStructureInLocalStorage();  

            alert("Modifiche Salvate");
            
           // saveDataStructureInLocalStorage();      
        
        });
                            
        
        
        $('#selectSet').on('change', function(e)
        {
            if (selectedSet != null)
            {
                console.log("Selezionato: " + selectedSet);
                setAllObjectsSetPosition(selectedSet);
                addInfoToSet(selectedSet);                
            }
            
            
            selectedSet = $('#selectSet option:selected').text();        
                    
            
            
            drawObjectsSet(selectedSet);
            loadInfoFromSet(selectedSet);
            console.log("selectedSet: " + selectedSet);        
        });        
        
        $('#showObjectListButton').css('background-color', 'blue');
         $('#show5WButtons').css('background-color', 'gray');
         $('#showSetNotesButton').css('background-color', 'gray');
        
        $('#showObjectListButton').on('click', function(e)
        {
                $('#objectMenu').css('visibility', 'visible' );
                $('#cognitiveAgents').css('visibility', 'hidden');
                $('#setNotes').css('visibility', 'hidden');       
            
                $('#showObjectListButton').css('background-color', 'blue');
                $('#show5WButtons').css('background-color', 'gray');
                $('#showSetNotesButton').css('background-color', 'gray');
            
                                      
        });
        
        $('#show5WButtons').on('click', function(e)
        {
                $('#objectMenu').css('visibility', 'hidden' );
                $('#cognitiveAgents').css('visibility', 'visible');
                $('#setNotes').css('visibility', 'hidden');
                
                $('#showObjectListButton').css('background-color', 'gray');
                $('#show5WButtons').css('background-color', 'blue');
                $('#showSetNotesButton').css('background-color', 'gray');
            
                                      
        });
        
        $('#showSetNotesButton').on('click', function(e)
        {
                $('#objectMenu').css('visibility', 'hidden' );
                $('#cognitiveAgents').css('visibility', 'hidden');
                $('#setNotes').css('visibility', 'visible');        
            
                $('#showObjectListButton').css('background-color', 'gray');
                $('#show5WButtons').css('background-color', 'gray');
                $('#showSetNotesButton').css('background-color', 'blue');
                                      
        });
        
        $('#deleteSetButton').on('click', function(e)
        {
            var setToDelete = $('#selectSet option:selected').text();
            
            
            if (setToDelete in sets)
            {
                delete sets[setToDelete];
                
                populateSelectSetComboBox();        
                drawObjectsSet(selectedSet);
                loadInfoFromSet($('#selectSet option:selected').text());
            }
            else
                console.log("L'insieme che si sta tentando di eliminare non esiste");       
        
        });
        
        // Intercetto i click sui canvas di sinistra
        $('.menuEntry').click(
            function(e)
            {                 
                var selectedSetName = $('#selectSet option:selected').text();

                console.log(selectedSetName);
                
                if (selectedSetName != "")
                {
                    
                    // Genero un id univoco identificativo per il nuovo canvas che andrò a creare
                    var canvasId = "canvas"+e.target.id+getProgressiveNumber();  
                    
                    if (addObjectToSet(selectedSetName, e.target.id, canvasId))
                    {
                        
                        

                        // Ottengo le coordinate del rettangolo minimo che contiene la lista di punti 
                        var ie = getImageEdge(getPoints(e.target.id));

                        console.log(e.target.id);                                      

                        // Creo un nuovo canvas
                        var c1 = $('<canvas id="' + 
                                            canvasId  + 
                                   '" width="' + 
                                            Math.floor((ie[1] - ie[0])*0.325) + 
                                   '" height="'+
                                            Math.floor((ie[3]-ie[2])*0.325) +
                                   '" class="canvasInRightPanel"></canvas>');

                        c1.draggable();                        
                        
                        //c1.position = [300, 300];
                        
                        // Aggiungo il canvas c1 a #cpn
                        c1.appendTo('#cpn');
                        c1.zIndex(99);
                        

                        // Disegno sul canvas appena aggiunto a #cpn
                        drawObjectInCanvas(e.target.id, canvasId, 0.325, true, 'blue'); 
                    }                    
                }
                else
                {
                    alert("Non esiste alcun insieme a cui aggiungere l'oggetto. Prima, creane uno.");
                }
            }            
        );
    }
);



// Il codice seguente gestisce la "mobilità" degli oggetti dichiarati di classe draggable

/*
interact('.draggable')
  .resizable({
    edges: { left: true, right: true, bottom: true, top: true }
  })
  .on('resizemove', function (event) {
    var target = event.target;
    var targetId = target.id;    
    target.style.width  = parseInt(target.style.width) + event.dx  + 'px';
    target.style.height = parseInt(target.style.height) + event.dy  + 'px';

  })
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
        }).inertia(true); */
