const Player = {
	//Map
	tile: {},
	_x: 0,
	_y: 0,
	_coord: "",
	_direction: 'down',
	_sprite: [
		"characterUp",
		"characterLeft",
		"characterRight",
		"characterDown",
	],


	//Info
	name:"Aramiz",
	gold: 42,
	
	statNames: [
		"Health",
		"Attack",
		"Defense",	
	],
	
	baseStats: [ //MHP, ATK, DEF
		14,
		1,
		1,
	],
	
	//Stats
	stats: [1,0,0],
	
	equipStats: [0,0,0],
	
	health: 1,

	
	equipment: [],
	inventorySize: 0,
	inventory: [],
	
	getItemSlotEquip: function(itemSlot) {
		return this.equipment[itemSlot];
	}
}

P = Player;

function changePlayerHealth(x) {
	P.health += x;
	if (P.health > P.stats[0]) P.health = P.stats[0];
	if (P.health < 0) P.health = 0;
	update();
}

function setPlayerAttribute(attributeIndex, x) {
	P.baseStats[attributeIndex] += x;
	update();
}

function refreshEquipStats() {
	for(let i = 0; i < P.stats.length; i++) {
		P.equipStats[i] = 0;
		for (var key in P.equipment) {
			var value = P.equipment[key];
			if (typeof value == "object") { 
				value = value._stats[i]
				P.equipStats[i] += value;
			}
		}
	}
}

function refreshPlayerStats() {
	refreshEquipStats();
	for(let i = 0; i < P.stats.length; i++) {
		P.stats[i] = P.baseStats[i] + P.equipStats[i];
	}
	changePlayerHealth(3333);
	update();
}

function setupInventory() {
		inventoryVisible = true;
		let string = "";
		let i = 1;
		for (let y = 0; y < 4; y++) {
			for (let x = 0; x < 3; x++) {
				string += addItemElement(IH.inventoryBaseX, IH.inventoryBaseY, IH.inventoryGrid, x, y, IH.inventoryHolder + i + "' class='inventoryHolder'" + "data-id='" + i + "'" + " oncontextmenu='onRightClickInventory(this)' ", IH.inventoryHolderSize);
				Player.inventorySize = (1+x) * (1+y) + 1 ;
				Player.inventory[i] = "empty";
				i++;
			}
		}
		P.inventory[0] = null;
		
		$("inventoryHolder").innerHTML = string.replaceAll("inventorySlot", "inventoryHolder");
		$("inventorySlots").innerHTML = string.replaceAll("class='inventoryHolder'", "class='inventorySlots' onclick='onClickInventory(this)'");
		
		for (let i = 1; i < P.inventorySize; i++) {
			$("inventorySlot" + i).setAttribute("onmouseover", "showItemWindow(this)");
			$("inventorySlot" + i).setAttribute("onmouseout", "hideItemWindow(this)");
		}
		
	}

function setupEquipment() {
	for (i = 0; i < Items.itemTypes.length-1; i++) {
		let Slot = "Slot";
		let ringSlot = 1;
		if (Items.itemTypes[i].includes("ring")){ 
			Slot = "Slot" + ringSlot++;
			Player.equipment[Items.itemTypes[i] + Slot] = IH.equipmentEmpty;
			Slot = "Slot" + ringSlot;
		};
		Player.equipment[Items.itemTypes[i] + Slot] = IH.equipmentEmpty;
	}
}


// Animate the player continuously to give a "walking in place" or idle effect
function animatePlayerContinuously() {
    let frame = 0;
    const frameInterval = 200; // Time between frames (in ms)
    const frameSequence = ["0px", "-48px", "-96px", "-48px"]; // Updated frame sequence

    setInterval(() => {
        // Update the background position to simulate animation
        if (P._element) {
            // Cycle through the frames with the desired sequence
            P._element.style.backgroundPositionX = frameSequence[frame];
            frame = (frame + 1) % frameSequence.length;
        }
    }, frameInterval);
}


// Start the continuous animation when the page loads
window.onload = function() {
    animatePlayerContinuously();
}
























