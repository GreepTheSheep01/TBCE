	// initialize globals
	let objects = [];
	let game_objects = [];
	const OBJECT_WIDTH = 100;
	const OBJECT_HEIGHT = 100;
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
			url = "https://www.dlf.pt/png/big/4/49557_bullet-sprite-png.png"
			break;
		  case "miku":
			url = "https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/007cb9f291c2090.png"
			break;
			case "cirno":
			url = "https://en.touhouwiki.net/images/a/a9/Touhoudex_2_Cirno.png"
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
			let randomSize = Math.random(Date.now())*(75) +25
			document.getElementById(this.id).style.backgroundSize = randomSize+"px"+" "+randomSize+"px";
			document.getElementById(this.id).style.width=randomSize+"px"
			document.getElementById(this.id).style.height=randomSize+"px"
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
	
	function initializeGame(e){
		console.log(document.getElementById("canvas").innerHTML)
		document.getElementById("canvas").innerHTML = "";

		// Building the Array of objects
	game_objects = [
		{type:"danmaku", x:200, y:80},
		{type:"danmaku", x:900, y:90},
		{type:"danmaku", x:1200, y:150},
		{type:"danmaku", x:1200, y:150},
		{type: "hero", x:250, y:470},
		{type: "miku", x:10,y:480},
		{type:"cirno",x:100,y:160}
	]
    // set intervals to move danmaku
    let danmakuToMove = game_objects.forEach(game_object => {

      if (game_object.type == "danmaku")
        setInterval(function(){moveDanmaku(game_object)}, 50);//every second
    })
	// Loop through objects
	game_objects.forEach(game_object => draw(game_object, true));
	}
	function myFunction(e) {
		initializeGame(e)
	}
	
	var startGame = document.getElementById('resetGameBtn');
		startGame.onclick = myFunction

	function createElement(){
		let newId = "object_"+objects.length;
		let newDiv = '<div id="'+newId+'" class="objOutline"></div>';
		document.getElementById("canvas").innerHTML += newDiv;
		objects.push(document.getElementById(newId));
		return new Element(newId)
	}
	function draw(game_object, randomizeLocation){
		// 2. Now create element like our example
		let element = createElement();
		element.setImage(game_object.type);
		if (game_object.type == "danmaku"){ // TODO: make a switch instead
			game_object.x = Math.floor(Math.random(Date.now())*(1000 - OBJECT_HEIGHT))
			game_object.y = Math.floor(Math.random(Date.now())*(540 - OBJECT_WIDTH))
		}
		else if (game_object.type == "cirno"){
			game_object.x = Math.floor(Math.random(Date.now())*(1000 - OBJECT_HEIGHT))
			game_object.y = Math.floor(Math.random(Date.now())*(540 - OBJECT_WIDTH))
		}
		else if (game_object.type == "hero"){
				game_object.x = Math.floor(Math.random(Date.now())*(1000 - OBJECT_HEIGHT))
		}
		element.setX(game_object.x);
		element.setY(game_object.y);
	}

function moveDanmaku(danmakuToMove){
	console.log(danmakuToMove)
	danmakuToMove.x=danmakuToMove.x+10;; //do whatever we need to move danmaku
	game_objects.forEach(game_object => draw(game_object, true));
}


 initializeGame({});
	



