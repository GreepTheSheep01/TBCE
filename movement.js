function handlemovement(event) {
    
    let text = ''; 
    
    switch(event.key){
     case "ArrowRight":
         game_objects[4].x=game_objects[4].x+5; break;
     case "ArrowLeft":
       text += "move miku left"; break;
     case "ArrowUp":
       text += "move miku up"; break;
     case "ArrowDown":
       text += "move miku down"; break;
    }
  
  
  }