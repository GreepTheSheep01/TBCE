function handlemovement(event) {
    
    let text = ''; 
    
    switch(event.key){
     case "ArrowRight":
         game_objects[4].x=game_objects[4].x+5; 
         game_objects.forEach(game_object => draw(game_object, true));
         break;
     case "ArrowLeft":
      game_objects[4].x=game_objects[4].x-5; 
         game_objects.forEach(game_object => draw(game_object, true));
       text += "move miku left"; break;
     case "ArrowUp":
       text += "move miku up"; break;
     case "ArrowDown":
       text += "move miku down"; break;
    }
  
  
  }