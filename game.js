	// initialize globals
	let objects = [];
	let game_objects = [];
	let MOVEMENT_INTERVAL = null;
	let collisionInterval = null;
	const OBJECT_WIDTH = 100;
	const OBJECT_HEIGHT = 100;
	const CIRNO_INITIAL_X = 130
	const CIRNO_INITIAL_Y = 50
	class Element{

	  constructor(id){
		this.id = id;
	  }
	
	  setImage(type){
		let url = "";
		switch(type){
			case "hero":
			url = "https://www.spriters-resource.com/resources/sheet_icons/49/52585.png";
			break;
		  case "danmaku":
			url = "https://i.imgur.com/s5WNIAl.png"
			break;
		  case "miku":
			url = "https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/007cb9f291c2090.png"
			break;
			case "cirno":
			url = "https://i.imgur.com/J8C14PQ.png"
			break;
		  default:
			url = ""; // console.error("invalid type specified")
			break;
	  	}

	  	document.getElementById(this.id).style.background = "url('"+url+"')";

	    if (type == "danmaku"){
			let randomSize = Math.random(Date.now())*(75) +25
			document.getElementById(this.id).style.backgroundSize = randomSize+"px"+" "+randomSize+"px";
			document.getElementById(this.id).style.width=randomSize+"px"
			document.getElementById(this.id).style.height=randomSize+"px"
		}

		else if (type == "cirno"){
			document.getElementById(this.id).style.backgroundSize = 85+"px"
			document.getElementById(this.id).style.width=75+"px"
			document.getElementById(this.id).style.height=125+"px"
		}
		else {
			document.getElementById(this.id).style.backgroundSize = "80px 80px";
			document.getElementById(this.id).style.width="80px"
			document.getElementById(this.id).style.height="80px"
		}
	}
	  setX(x){
		document.getElementById(this.id).style.position="absolute"
		document.getElementById(this.id).style.left = x + "px"
	  }
	  setY(y){
		document.getElementById(this.id).style.position="absolute"
		document.getElementById(this.id).style.top = y + "px"
	  }
	}
	
	let currentHighestId = 7;
	function getNewGameObjectId(){
		currentHighestId++;
		return currentHighestId;
	}

	function adddan(){
		game_objects.splice(0,0,{id: getNewGameObjectId(), type: "danmaku", x: 0, y:0})
    }

	function initializeGame(e){
		//console.log(document.getElementById("canvas").innerHTML)
		document.getElementById("canvas").innerHTML = "";

		// Building the Array of objects
		game_objects = [
			{id:1,type:"danmaku", x:0, y:0, collided:false},
			{id:2,type:"danmaku", x:0, y:0}, // x and y are randomized for danmaku
			{id:3,type:"danmaku", x:0, y:0},
			{id:4,type:"danmaku", x:0, y:0},
			{id:5,type: "hero", x:130, y:590,health:100},
			{id:6,type: "miku", x:5,y:5},
			{id:7,type:"cirno",x:CIRNO_INITIAL_X,y:CIRNO_INITIAL_Y}
		]

		setHealth(getHeroObject(), 100)

		adddan()

		// Loop through objects, first to set an interval for moving bullets, then to draw
		/*game_objects.forEach((game_object, index) => {
			if (game_object.type == "danmaku"){
				setInterval(function(){
					if (game_object.x > 360){
						Destroydanmaku(index)
					} else {
						moveDanmaku(game_object)
					}
				}, 100); // 1000 = every second
			}
		})*/
		// loop in a better way for this case
		
		clearInterval(MOVEMENT_INTERVAL);
		MOVEMENT_INTERVAL = setInterval(function(){
			for(var i = game_objects.length; i > 0; i--){
				const index_to_check = i - 1;
				const game_object = game_objects[index_to_check];
				if (game_object.type == "danmaku"){
					if (game_object.x > 360 || game_object.y > 668){
						Destroydanmaku(index_to_check)
						adddan()
					} else {
						moveDanmaku(game_object)
					}
				}
			}
		}, 200); // 1000 = every second

		collisionInterval = setInterval(function(){
			checkForCollisions();
		}, 200)

		game_objects.forEach(game_object => draw(game_object, true));
	}
	function Destroydanmaku(index){
		document.getElementById(game_objects[index].element.id).remove()
		game_objects.splice(index,1)
	}
	function myFunction(e) {
		initializeGame(e)
	}
	
	function moveDanmaku(danmakuToMove){
		//console.log(danmakuToMove)
		danmakuToMove.y=danmakuToMove.y+10; //do whatever we need to move danmaku
		game_objects.forEach(game_object => draw(game_object, true));
	}

	var startGame = document.getElementById('resetGameBtn');
		startGame.onclick = myFunction

	function createElement(game_object){
		let newId = "object_"+game_object.id;
        let newDiv = '<div id="'+newId+'" class="objOutline"></div>';
        document.getElementById("canvas").innerHTML += newDiv;
        game_object.element = new Element(newId)

		if (game_object.type=='hero'){
			document.onkeydown=handlemovement
		}
		let element = game_object.element;
		element.setImage(game_object.type);
		if (game_object.type == "danmaku"){ // TODO: make a switch instead
			game_object.x = Math.floor(Math.random(Date.now())*(360 - OBJECT_HEIGHT))
			game_object.y = Math.floor(Math.random(Date.now())*(668 - OBJECT_WIDTH))
		}
        return
	}
	function draw(game_object, randomizeLocation){
		// 2. Now create element like our example
		if(!game_object.element){
            createElement(game_object);
        }
		
		game_object.element.setX(game_object.x);
		game_object.element.setY(game_object.y);
	}

function gameObjectElement(game_object){
	if(game_object.element){
		return document.getElementById(game_object.element.id);
	}
}

function getWidthByType(game_object){
	switch(game_object.type){
  	case "danmaku":
		DANMAKU_WIDTH = gameObjectElement(game_object).offsetWidth;
    	return DANMAKU_WIDTH; // you have to define all of these! let's use a fixed hitbox for now
    case "hero":  
		HERO_WIDTH = 60;      // we can change to using the randomized size later
    	return HERO_WIDTH;    // if you want to try that as a challenge, use the .element of game_object
    case "miku":
		MIKU_WIDTH = 100;       // (check console to see what it is) and find size dynamically for $50
    	return MIKU_WIDTH;
    case "cirno":
		CIRNO_WIDTH = 100;
    	return CIRNO_WIDTH;
  }
}
function getHeightByType(game_object){
	switch(game_object.type){
  	case "danmaku":
		DANMAKU_HEIGHT = gameObjectElement(game_object).offsetHeight || 100;
    	return DANMAKU_HEIGHT; // you have to define these!
    case "hero":
		HERO_HEIGHT = 80;
    	return HERO_HEIGHT;
    case "miku":
		MIKU_HEIGHT = 100;
    	return MIKU_HEIGHT;
    case "cirno":
		CIRNO_HEIGHT = 100;
    	return CIRNO_HEIGHT;
  }
}
function isCollide(a, b) {
    const a_height = getHeightByType(a);
    const b_height = getHeightByType(b);
    const a_width = getWidthByType(a);
    const b_width = getWidthByType(b);
    return !(
        ((a.y + a_height) < (b.y)) ||
        (a.y > (b.y + b_height)) ||
        ((a.x + a_width) < b.x) ||
        (a.x > (b.x + b_width))
    );
}

function findGameObjectsIndexById(id){
	for (var i=1; i<game_objects.length; i++){
		const game_object = game_objects[i]
		if(game_object.id == id){
			return i;
		}
	}
	return -1;
}

function updateHealth(hero, deltaHealth){ //can be negative or positive
	hero.health += deltaHealth //reduced health?
	let health = document.getElementById("health")
	health.value += deltaHealth
	if (hero.health <= 0){ 
		endgame()
	}
}

function setHealth(hero, newHealth){
	hero.health = newHealth
	let health = document.getElementById("health")
	health.value = newHealth
}

function endgame(){
	alert("you suck, restart by clicking start again ")
	clearInterval(MOVEMENT_INTERVAL)
	clearInterval(collisionInterval)
}

function checkForCollisions(){
	// collisions matter between hero and danmaku for the purposes of our game
  // other collisions don't matter
  const hero = game_objects.find(game_object => game_object.type === "hero");
  const danmakus = game_objects.filter(game_object => game_object.type === "danmaku");
  for(var i=0; i<danmakus.length; i++){
    const danmakuToCheck = danmakus[i];
	if(!danmakuToCheck.collided){
		if(isCollide(hero, danmakuToCheck)){
			//collision happened! handle it any way you want (reduce health, etc)
			updateHealth(hero, -10)
			let tryToFindId = findGameObjectsIndexById(danmakuToCheck.id);
			if(tryToFindId != -1){
				Destroydanmaku(tryToFindId);
				adddan()
			}
			danmakuToCheck.collided = true;
			console.log("collision occured between hero and danmaku:", danmakuToCheck, hero.health);
		}
	}
  }
}

 // think about how to manage this when re-starting game (remember the speed thing)

/* 
var score = 0;{
	if = true;
	score = +10 
}
	*/

 initializeGame({});