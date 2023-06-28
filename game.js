	// initialize global
	let objects = [];
	const OBJECT_WIDTH = 100;
	const OBJECT_HEIGHT = 100;
	class Element{
	  constructor(id) {
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
	   
	   let randomWidth = Math.random(Date.now())*(100)
	   let randomHeight = Math.random(Date.now())*(100)
		
		document.getElementById(this.id).style.backgroundSize = randomWidth+"px"+" "+randomWidth+"px";
		
		document.getElementById(this.id).style.width=randomWidth+"px"
	document.getElementById(this.id).style.height=randomWidth+"px"

	}

	else if (type == "cirno"){

	   let randomWidth = Math.random(Date.now())*(100)
	   let randomHeight = Math.random(Date.now())*(100)
		
		 document.getElementById(this.id).style.backgroundSize = randomWidth+"px"+" "+randomWidth+"px";
		
		document.getElementById(this.id).style.width=randomWidth+"px"
	document.getElementById(this.id).style.height=randomWidth+"px"

	}

	else {

	 document.getElementById(this.id).style.backgroundSize = "100px 100px";

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
	  if (game_object.type == "danmaku"){
		game_object.x = Math.floor(Math.random(Date.now())*(500 - OBJECT_HEIGHT))
		game_object.y = Math.floor(Math.random(Date.now())*(370 - OBJECT_WIDTH))
		
	  }
	  
	  else if (game_object.type == "cirno"){
	  
		game_object.x = Math.floor(Math.random(Date.now())*(500 - OBJECT_HEIGHT))
		game_object.y = Math.floor(Math.random(Date.now())*(370 - OBJECT_WIDTH))
	  
	  }
	  
		element.setX(game_object.x);
	  element.setY(game_object.y);
	 }
	// YOUR CODE HERE like our example we worked through
	// Building the Array of objects
	const game_objects = [
	{type:"danmaku",
	 x:200, y:50}, {type:"danmaku", x:500, y:50}, {type:"danmaku", x:750,
	y:100}, {type:"danmaku", x:750, y:100}, {type: "hero", x:250, y:300}, {type: "miku", x:100,y:20},{type:"cirno",x:50,y:80}
	]
	// Loop through objects
	game_objects.forEach(game_object => draw(game_object, true));



