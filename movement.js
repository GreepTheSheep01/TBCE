function getHeroObject(){
  let hero = game_objects.find(game_object => game_object.type == "hero");
  if(hero === undefined){
    console.error("something terrible happened, hero is not in the array");
  }
  return hero;
}

function handlemovement(event) {
    
    let text = ''; 
    let hero = getHeroObject();
    
    switch(event.key){
     case "ArrowRight":
         hero.x=hero.x+10; 
         if(hero.x > 360){
          hero.x = 360
         }
         game_objects.forEach(game_object => draw(game_object, true));
         break;
     case "ArrowLeft":
      hero.x=hero.x-10;
      if(hero.x < 0){
        hero.x = 0
       }
         game_objects.forEach(game_object => draw(game_object, true));
       text += "move hero left"; break;
     case "ArrowUp":
      hero.y=hero.y-10; 
      if(hero.y < 0){
        hero.y = 0
       }
       game_objects.forEach(game_object => draw(game_object, true));
       text += "move hero up"; break;
     case "ArrowDown":
      hero.y=hero.y+10; 
      if(hero.y > 668){
        hero.y = 668
       }
       game_objects.forEach(game_object => draw(game_object, true));
       text += "move hero down"; break;
    }
  
  
  }