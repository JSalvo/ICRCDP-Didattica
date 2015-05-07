//Dipende da dataStructure.js

var offset = { x: 0, y: 0 };


function drawObjectInCanvas(objectName, canvasId, scaleXY, minimize)
{
        var pointList = getPoints(objectName);
        var canvas = document.querySelector('#'+canvasId);
        var ctx = canvas.getContext('2d'); 
        
        // Imposto le proprieta' delle linee che disegnero'
        ctx.lineWidth = 1;
        ctx.fillStyle = 'red';      

        //console.log(JSON.stringify(pointList));
        
        if (minimize)
        {
            var offset = getImageEdge(pointList);
            var w = (offset[1] - offset[0])*scaleXY;
            var h = (offset[3] - offset[2])*scaleXY;       
        
            //canvas.offsetWidth = w;
            //canvas.offsetHeight = h;
            
            
            
            ctx = canvas.getContext('2d');
            
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
            ctx.fill();  
            
            
        }
        else
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
        /*
        ctx.closePath();
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(130, 98);
        ctx.stroke();*/   
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
            var str = '<tr>\n\t<td>\n\t\t<canvas id="'+obj+'" width="130" height="97" class="menu"></canvas>\n\t</td>\n\t<td>\n\t\t<ul>';           
            // Ottengo i tag associati all'oggetto
            var tags = getTags(obj);
            
            //console.log(tags);
            
            if (tags)
            {
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
        
        
        
        $('canvas').click(
            function(e)
            {
               
                var ie = getImageEdge(getPoints(e.target.id));
                //$('<div id="proof" style="background-color: red; left:300px; top:200px; width:40px; height:30px;" class="draggable"></div>').appendTo('#cpn');
                
                console.log(e.target.id);
                
                // Ottengo la lista di punti dell'oggetto da disegnare
                
                
                // Calcolo il rettangolo minimo che lo contiene
                
                
                // Genero un div che lo contenga con le dimensioni opportune
                
                // Genero un canvas su cui disegnarlo con le dimensioni opportune
                
                // Disegno l'oggetto nel canvas
                
                
                // Inserire un valore che renda l'identificativo univoco
                //var divId = "div"+e.target.id;
                var canvasId = "canvas"+e.target.id+getProgressiveNumber();
                
                
                //$('<div id="' + divId + '" style="border: 2px solid; left:400px; top:200px; width:130px; height:97px;" class="draggable"></div>').appendTo('#cpn');
              
                //$('<canvas id="' + canvasId + '" width="130" height="97" class="draggable"></canvas>').appendTo('#cpn');
              
                
                
                $('<canvas id="' + canvasId  + '" width="' + Math.floor((ie[1] - ie[0])*0.325) + '" height="'+Math.floor((ie[3]-ie[2])*0.325)+'" class="draggable"></canvas>').appendTo('#cpn');
                
                
                drawObjectInCanvas(e.target.id, canvasId, 0.325, true);
                
            } 
        
        );
        
         
    }
);



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
        }).inertia(true);

/*
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
  .resizable({
    edges: { left: true, right: true, bottom: true, top: true }
  })
  .on('resizemove', function (event) {
    var target = event.target;

    // update the element's style
    target.style.width  = event.rect.width + 'px';
    target.style.height = event.rect.height + 'px';

    // translate when resizing from top or left edges
    offset.x += event.deltaRect.left;
    offset.y += event.deltaRect.top;

    target.style.transform = ('translate('
                              + offset.x + 'px,'
                              + offset.y + 'px)');

    target.textContent = event.rect.width + '×' + event.rect.height;
  });
*/


//.inertia(true);




