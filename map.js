const Grid = {
	sizeX: 5,
	sizeY: 5,
	totalSize: 0,
	counter: 0,
	grid: [], //Unique multidimensional array concept for javascript created by Henrik Lindholm(Bishiba). How to use: array = [x+','+y]; Multidimensional arrays are not supported by javascript natively. Mostly suited for making grids.
	tileSize: 48,
	map: "",
	
	gridSize: function() {
		this.sizeX = Math.floor(getWindowSize(document.getElementsByTagName("div").mapWindow.style).x / 48);
		this.sizeY = Math.floor(getWindowSize(document.getElementsByTagName("div").mapWindow.style).y / 48);
		return (this.sizeX * this.sizeY);
	},
}

G=Grid; //For quick access in the console.

falseTiles = [];
const Tiles = {
	tileCount: 0,
	
	coordList: [],
	
	tile: [],
	
	impassable: [
		"mapMountain",
	],
	
	passable: [
		"mapGrass",
		"mapGrass",
		"mapGrass",
		"mapGrass",
		"mapGrass",
		"mapGrass",
		"mapTrees",
	],
	
	objectCount: 0,
	object: [],
	objects: [
		"mapTown",
		"mapTavern",
		"mapLargeRuins",
		"mapSmallRuins",
		"mapCatacombs",
		"mapTemple",
	],
	
	getTile: function(x, y) {
		return this.tile[coord(x, y)];
	},
	
}

T = Tiles; //For quick access in the console.

class Tile {
	constructor(x, y, tileObject) {
		this.initialize(x, y, tileObject)
	}
	
	initialize(x, y, tileObject) {
		this._x = x;
		this._y = y;
		this._coord = coord(x, y);
		this._passable = this.setPassable(tileObject);
		this._tileObject = tileObject;
		this._element = $ce("li");
		this._element.className = "map-tile";
		this._element.id = tileObject;
		this._element.style.left = this._x * Grid.tileSize + "px";
		this._element.style.top = this._y * Grid.tileSize + "px";
		this._element.style.position = "absolute";
		this._element.dataset.tile = "Tiles.tile['" + this._coord + "']";
		this._element.dataset.coord = this._coord;
		this._element.dataset.passable = this._passable;
		(tileObject == "characterDown") ? Player.tile = this : Tiles.tile[this._coord] = this;
		(Grid.gridSize() > Tiles.tileCount) ? Tiles.coordList[Tiles.tileCount++] = this._coord : Tiles.coordList[Tiles.coordList.indexOf(this._coord)] = this._coord;
		
		setLastCreatedTile(this);
	}
	
	setPassable(tileObject) {
		var passable;
		(Tiles.passable.includes(tileObject)) ? passable = true : passable = false;
		return passable;
	}
}

function setLastCreatedTile(tileObject) {
	lastCreatedTile = tileObject;
}

function coord(x, y) {
	var coord = (x + "," + y);
	return coord;
}

function realCoord(x, y) {
	x = x * Grid.tileSize;
	y = y * Grid.tileSize;
	return {x, y};
}

function getElementByCoord(x, y) {
	let coord = '[coord="' + x + "," + y + '"]';
	return document.querySelector(coord);
}

function checkTilePassability(x, y) {
	// console.log(x + "," + y)
	if (Tiles.tile[coord(x, y)] == undefined) return false;
	let tilePassable = Tiles.tile[coord(x, y)]._passable;
	return tilePassable;
}

function objectStatus(object) {
	let string = object.name + " status:";
	string += "\ncoord: " + coord(object._x, object._y);
	string += "\ndirection: " + object._direction;
	console.log(string);
}

function newTile(x, y, tileName) {
	Tiles.tile[coord(x, y)] = new Tile(x, y, tileName);
}

function addPlayer(x, y, tileName) {
	Player.tile[coord(x, y)] = new Tile(x, y, tileName);
}

function newRandomTile(tileName) {
	var x = 0;
	var y = 0;
	while (true) {
		x = Math.myRandom(Grid.sizeX);
		y = Math.myRandom(Grid.sizeY);
		if (Tiles.tile[coord(x, y)]._tileObject == "mapGrass") break;
	}
	Tiles.tile[coord(x, y)] = new Tile(x, y, tileName);
}

function generateObjectsMod(partsOfTotalTiles, tileObject) {
	for (let i = 0; i < Math.floor(Grid.gridSize() / partsOfTotalTiles); i++) {
		newRandomTile(x, y, tileObject);
	}
}

function getAllBadTiles() {
	for(var i = 0; i < Grid.gridSize(); i++) {
		console.log(i);
		var tile = Tiles.tile[Tiles.coordList[i]]
		if (tile._tileObject == "mapGrass" || tile._tileObject == "mapTrees") {
			
			if (tile._passable == false) {
				falseTiles.push(tile);
			}
		}
		if (i > 20000) return;
	}
	console.log(falseTiles);
}

//GENERATION############################################################################################################################################
function generateMap(density) {
	for (let y = 0;y < G.sizeY; y++) {
		for (let x = 0; x < G.sizeX; x++) {
			rand = Math.myRandom(100);
			if (density > rand) {
				newTile(x, y, T.impassable[0])
			} else {
				newTile(x, y, T.passable[Math.myRandom(T.passable.length)]);
			}
		}
	}
	
	let i = 0;
	newRandomTile(Tiles.objects[i++]);
	Tiles.object[i] = lastCreatedTile;
	newRandomTile(Tiles.objects[i++]);
	Tiles.object[i] = lastCreatedTile;
	newRandomTile(Tiles.objects[i++]);
	Tiles.object[i] = lastCreatedTile;
	newRandomTile(Tiles.objects[i++]);
	Tiles.object[i] = lastCreatedTile;
	newRandomTile(Tiles.objects[i++]);
	Tiles.object[i] = lastCreatedTile;
	newRandomTile(Tiles.objects[i++]);
	Tiles.object[i] = lastCreatedTile;
	Tiles.objectCount = i;
	
	drawMap();
	generatePlayer();
}

function drawMap() {
	for (i = 0; i < Grid.gridSize(); i++) {
		
		$("map").appendChild(Tiles.tile[Tiles.coordList[i]]._element);
	}
}

function generatePlayer() {
	while (true) {
		Player._x = Math.floor(Math.random() * Grid.sizeX);
		Player._y = Math.floor(Math.random() * Grid.sizeY);
		
		if (checkTilePassability(Player._x, Player._y)) break;
	}
	addPlayer(P._x, P._y, "characterDown");	
	Player._tile = lastCreatedTile;
	Player._element = lastCreatedTile._element;
	Player._coord = lastCreatedTile._coord;
	$("walkMap").appendChild(Player._element);
}

//MOVING################################################################################################################################################
function startMovement() {
    if (isMoving || movementQueue.length === 0) return; // If already moving or no directions are queued, return

    isMoving = true;

    // Get the latest direction from the movement queue
    let direction = movementQueue[movementQueue.length - 1];

    // Set player direction
    setPlayerDirection(direction);
	
    // Determine target grid coordinates
    let dx = 0, dy = 0;
    switch (direction) {
        case "up":
            dy = -1;
            break;
        case "down":
            dy = 1;
            break;
        case "left":
            dx = -1;
            break;
        case "right":
            dx = 1;
            break;
    }

    // Calculate the target position on the grid
    let targetX = Player._x + dx;
    let targetY = Player._y + dy;

    // Check if target tile is passable
    if (!eval(checkTilePassability(targetX, targetY))) {
        // If the tile is not passable, unlock movement and return, but keep the character facing the right direction
        isMoving = false;
        return;
    }

    // Smoothly animate movement to the target position
    const startTime = performance.now();
    const startX = Player._x;
    const startY = Player._y;
    const duration = 300; // Duration of the movement in milliseconds

    function animateMove(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1); // Progress from 0 to 1

        // Interpolate player position for smooth movement
        Player._x = startX + (targetX - startX) * progress;
        Player._y = startY + (targetY - startY) * progress;

        // Update player drawing
        drawPlayer();

        if (progress < 1) {
            requestAnimationFrame(animateMove); // Continue animation if not finished
        } else {
            // Snap to final grid position
            Player._x = targetX;
            Player._y = targetY;

            // Unlock movement input
            isMoving = false;

            // Continue moving if keys are still pressed
            if (movementQueue.length > 0) {
                startMovement();
            }
        }
    }

    // Start the animation
    requestAnimationFrame(animateMove);
}

function setPlayerDirection(direction) {
    switch (direction) {
        case "up":
            Player._direction = Player._sprite[0];
            break;
        case "down":
            Player._direction = Player._sprite[3];
            break;
        case "left":
            Player._direction = Player._sprite[1];
            break;
        case "right":
            Player._direction = Player._sprite[2];
            break;
    }
    drawPlayer(); // Ensure the character always faces the correct direction
}


function drawPlayer() {
	Player._element.style.left = realCoord(Player._x, Player._y).x + "px";
	Player._element.style.top = realCoord(Player._x, Player._y).y + "px";
	Player._element.id = Player._direction;
}

function applyCellAuto(iterations) {
	for (i = 0; i < iterations; i++) {
	let tempGrid = Grid.grid.slice();
		for (j = 0; j <Grid.size; j++) {
			for (k = 0; k <Grid.size; j++) {
			let count = 0;
			for (x = j-1; x < j+1; x++) {
				for (y = k-1; y < k+1; y++) {
					if (Grid.g[x + "," + y] !== "undefined") {
						if (tempGrid[x + "," + y] == tWall) count++;		
					} else {
						count++
					}
				}
				if (count => 4) {
					Grid.grid[j + "," + k] = tWall;
				} else {
					Grid.grid[j + "," + k] = tFloor;
				}
				
				}
			}
		}
	}
	drawGrid();
}

























