function handlemovement(event) {
    
    let text = ''; 
    
    switch(event.key){
     case "ArrowRight":
         game_objects[4].x=game_objects[4].x+10; 
         if(game_objects[4].x > 1000){
          game_objects[4].x = 1000
         }
         game_objects.forEach(game_object => draw(game_object, true));
         break;
     case "ArrowLeft":
      game_objects[4].x=game_objects[4].x-10;
      if(game_objects[4].x < 0){
        game_objects[4].x = 0
       }
         game_objects.forEach(game_object => draw(game_object, true));
       text += "move miku left"; break;
     case "ArrowUp":
      game_objects[4].y=game_objects[4].y-10; 
      if(game_objects[4].y < 0){
        game_objects[4].y = 0
       }
       game_objects.forEach(game_object => draw(game_object, true));
       text += "move miku up"; break;
     case "ArrowDown":
      game_objects[4].y=game_objects[4].y+10; 
      if(game_objects[4].y > 540){
        game_objects[4].y = 540
       }
       game_objects.forEach(game_object => draw(game_object, true));
       text += "move miku down"; break;
    }
  
  
  }