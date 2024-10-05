lastCreatedItem = {};


const Location = {
	location: [
		"Haman",
		"Abd'aloo"
	],
	townSprite: "T",
	current: "Haman",
}

const L = Location; //For quick access in the console.

function $(elementId) {
	return document.getElementById(elementId);
}

function $ce(elementId) {
	return document.createElement(elementId);
}
	
function wait(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
	currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}


//Simple math-formula that returns a random rounded value.
Math.myRandom = function(x) { 
	return Math.floor(Math.random() * x);
}

Math.floorRandom = function(x) { 
	return Math.floor(Math.random() * x);
}

Math.roundRandom = function(x) { 
	return Math.round(Math.random() * x);
}

{//MATH==============================================================================================================================================================================================================================================================
	
	{//Distances
		distX = function(origin, dest) {
			return dest.x - origin.x;
		}

		distY = function(origin, dest) {
			return dest.y - origin.y;
		}
		
		distAB = function(origin, destination) {
			return d = Math.sqrt(Math.pow((destination.x - origin.x), 2) + Math.pow((destination.y - origin.y), 2));
		}
		
	}
	
	{//Angles
		angleAB = function(origin, destination) {
			x = this.distX(origin, destination);
			y = this.distY(origin, destination);
			Math.tan(y/x) * (180 / Math.PI);
			if (origin.x < destination.x) {
				return Math.atan(y/x) * (180 / Math.PI);
			} else {
				return Math.atan(y/x) * (180 / Math.PI) +180;
			}
		}

		setAngleAB = function(origin, destination) {
			origin.picture._angle = this.angleAB(origin, destination);
		}
	}
}