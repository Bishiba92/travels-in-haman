let isMoving = false; // Flag to indicate if movement is in progress
let movementQueue = []; // Track currently pressed keys
const gridSize = 48; // Size of each grid cell in pixels

document.addEventListener('keydown', function(event) {
    let direction = getDirectionFromKeyCode(event.keyCode);
    if (direction && !movementQueue.includes(direction)) {
        movementQueue.push(direction);
        startMovement();
    }
});

document.addEventListener('keyup', function(event) {
    let direction = getDirectionFromKeyCode(event.keyCode);
    if (direction) {
        movementQueue = movementQueue.filter(dir => dir !== direction);
    }
});

function getDirectionFromKeyCode(keyCode) {
    switch (keyCode) {
        case 38: // Arrow up
        case 87: // W
            return "up";
        case 37: // Arrow left
        case 65: // A
            return "left";
        case 39: // Arrow right
        case 68: // D
            return "right";
        case 40: // Arrow down
        case 83: // S
            return "down";
        default:
            return null;
    }
}


document.addEventListener('contextmenu', function(ev) {
    ev.preventDefault();
    return false;
}, false);

function onClickInventory(element) {
	lastClickedInventoryId = parseInt(element.dataset.id);
	console.log(item = P.inventory[lastClickedInventoryId]);
	addEquipment(item);
}

function onRightClickInventory(element) {
	lastRightClickedInventoryId = parseInt(element.dataset.id);
	console.log(item = P.inventory[lastRightClickedInventoryId]);
	destroyItem(item);
}

function onClickEquipment(element) {
	lastClickedEquipmentSlot = element.id;
	let item = Player.equipment[element.id];
	console.log(item);
	//console.log(item = P.equipment[lastClickedEquipmentSlot]);
	console.log("onClickEquipment");
	(Player.inventory.includes("empty")) ? removeEquipment(item, false) : alert("no room in inventory");
}

function onClickHome (element) {
	
}

function mousePosition() {
	var e = window.event;
	
	var posX = e.clientX;
	var posY = e.clientY;
	
	$("itemHover").innerHTML = "mouse x: " + posX + "\nmouse y: " + posY;
	
	var t = setTimeout(mousePosition, 1000);
}