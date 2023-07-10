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
	
	function initializeGame(e){
		console.log(document.getElementById("canvas").innerHTML)
		document.getElementById("canvas").innerHTML = "";

		// Building the Array of objects
		game_objects = [
			{id:1,type:"danmaku", x:200, y:80},
			{id:2,type:"danmaku", x:900, y:90},
			{id:3,type:"danmaku", x:1200, y:150},
			{id:4,type:"danmaku", x:1200, y:150},
			{id:5,type: "hero", x:250, y:470},
			{id:6,type: "miku", x:5,y:5},
			{id:7,type:"cirno",x:100,y:160}
		]
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
		
		setInterval(function(){
			for(var i = game_objects.length; i > 0; i--){
				const index_to_check = i - 1;
				const game_object = game_objects[index_to_check];
				if (game_object.type == "danmaku"){
					if (game_object.x > 360){
						Destroydanmaku(index_to_check)
					} else {
						moveDanmaku(game_object)
					}
				}
			}
		}, 100); // 1000 = every second

	game_objects.splice(2,0,{type: "danmaku", x: 200, y:500})

		game_objects.forEach(game_object => draw(game_object, true));
	}
	function Destroydanmaku(index){
		game_objects.splice(index,1)
	}
	function myFunction(e) {
		initializeGame(e)
	}
	
	function moveDanmaku(danmakuToMove){
		console.log(danmakuToMove)
		danmakuToMove.x=danmakuToMove.x+10;; //do whatever we need to move danmaku
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
		else if (game_object.type == "cirno"){
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
 initializeGame({});
