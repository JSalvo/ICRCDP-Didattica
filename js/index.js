
$(document).ready(
    function()   
    {
        
        function handleFileSelect(evt)
        {
            alert("ok");
        };
        
        
       // document.getElementById('files').addEventListener('change',  handleFileSelect, false);
        
        
    
        $('#openFileDialogButton').on('click', function()
        {
            var fileToLoad = $('#files').val().split("\\").pop();
            
            localStorage.setItem('ImageToLoad', fileToLoad);
            location.reload(); 
            
           // alert("Aggiornato local storage " + fileToLoad);
        });                               
        

        
    });