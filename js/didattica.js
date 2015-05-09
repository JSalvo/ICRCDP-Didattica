//Dipende da dataStructure.js

var offset = { x: 0, y: 0 };


// Disegno l'oggetto objectName nel canvas canvasId
function drawObjectInCanvas(objectName, canvasId, scaleXY, minimize)
{
        var pointList = getPoints(objectName);
        var canvas = document.querySelector('#'+canvasId);
        var ctx = canvas.getContext('2d'); 
        
        // Imposto le proprieta' delle linee che disegnero'
        ctx.lineWidth = 1;
        ctx.fillStyle = 'green';            
    
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
        // I dati memorizzati in localstorage vengono caricati nella struttura dati js
        loadDataStructureFromLocalStorage();    
        
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
            drawObjectInCanvas(obj, obj, 0.325, false);
        }
        
        
        // Esempio di event delegate
        $('#cpn').on('click', '.prova',
                function(e)
                {
                    console.log("hai fatto click");
                }
        
        
            );
        
        
        // Intercetto i click sui canvas di sinistra
        $('.menuEntry').click(
            function(e)
            {               
                // Ottengo le coordinate del rettangolo minimo che contiene la lista di punti 
                var ie = getImageEdge(getPoints(e.target.id));
                
                console.log(e.target.id);
                
                // Genero un id univoco identificativo per il nuovo canvas che andrò a creare
                var canvasId = "canvas"+e.target.id+getProgressiveNumber();                

                // Aggiungo un canvas a #cpn
                //$('<canvas id="' + canvasId  + '" width="' + Math.floor((ie[1] - ie[0])*0.325) + '" height="'+Math.floor((ie[3]-ie[2])*0.325)+'" class="prova"></canvas>').appendTo('#cpn');
                
                var c1 = $('<canvas id="' + canvasId  + '" width="' + Math.floor((ie[1] - ie[0])*0.325) + '" height="'+Math.floor((ie[3]-ie[2])*0.325)+'" class="prova"></canvas>');
                
                c1.draggable();
                //c1.resizable();
                
                c1.appendTo('#cpn');
                c1.zIndex(99);
                
                
                
                
                
                var trashBin = $('#eraseZone');
                
                trashBin.droppable(
                    {
                        drop: function(event, ui)
                        {
                            var draggableId = ui.draggable.attr("id");
                            var droppableId = $(this).attr("id");
                            
                            alert("Scaricamento " + draggableId + " " + droppableId);
                        }                    
                        
                        
                    }
                    
                    
                );
            
                
                
                
                // Disegno sul canvas appena aggiunto a #cpn
                drawObjectInCanvas(e.target.id, canvasId, 0.325, true);                
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