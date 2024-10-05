function fight() {}
function flee() {}
function encounterStart() {
	alert ("A wild mongoose appears before you!");
}

function createCanvas(canvasName) {
	var canvas = $ce("canvas");
	canvas.id = canvasName;
	canvas.className = "canvas";
	canvas.style.width = $("mapWindow").style.width;
	canvas.style.height = $("mapWindow").style.height;
	canvas.style.left = $("mapWindow").style.left;
	canvas.style.top = $("mapWindow").style.top;
	canvas.width = parseInt($("mapWindow").style.width.replace("px",""));
	canvas.height = parseInt($("mapWindow").style.height.replace("px",""));
	document.body.prepend(canvas);
}

function showBattleback(pictureName) {
	var canvas = $("bbCanvas");
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	var image = new Image();
	image.src = "img/battlebacks1/" + pictureName + ".png";
	drawBattleback(canvas, ctx, image);
	canvas.style.display = "block";
}

function drawBattleback(canvas, ctx, image) {
	
	if (!image.complete) {
		setTimeout(function() {
			drawBattleback(canvas, ctx, image)
		}, 50);
		return;
	}
	
	console.log(canvas.width);
	ctx.drawImage(image, 0, 0, image.width, image.height, 0, canvas.height / 4, canvas.width, canvas.height / 2);
}

function prepareTroop(x, y, troopType, troopVariants, troopSize) {
	for (var i = 1; i <= troopSize; i++) {
		var image = $ce("img");
		var canvas = $("bbCanvas");
		image.id = "troop" + i;
		image.style.position = "absolute";
		image.style.zIndex = $("bbCanvas").style.zIndex + 334;
		troopVariant = Math.myRandom(troopVariants + 1) || 1;
		console.log(troopVariant);
		image.src = "img/enemies/" + troopType + "_" + troopVariant + ".png";
		var sprite = new Image();
		sprite.src = image.src;
		drawActor(canvas, image);
		console.log(sprite);
		document.body.appendChild(image);
		var mapWindow = WM.windowObj["mapWindow"]
		console.log(sprite.x)
		let positionX = (i % 2) * -110;
		let positionY = i * 50 - sprite.height;
		image.style.left = WM.getWindowScaleSize(mapWindow._width, mapWindow._height).x / 5 + getElementAbsolutePos(canvas).x + positionX + "px";
		image.style.top = y + Math.floor(canvas.height / (4)) + getElementAbsolutePos(canvas).y + positionY + "px";  
		image.style.display = "block";
	}
}

function drawActor(canvas, image) {
	var sprite = new Image();
	sprite.src = image.src;
	
	if (!sprite.complete) {
		setTimeout(function() {
			drawActor(canvas, image)
		}, 50);
		return;
	}
	
	image.style.width = console.log(sprite.width) + "px";
	image.style.height = sprite.height + "px";
}



































