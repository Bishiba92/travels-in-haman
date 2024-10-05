const ItemHolder = {
	equipmentClass: "class='equipmentHolder'",
	equipmentHolderSize: "width:" + 64 + "px; " + "height:" + 64 + "px;",
	equipmentEmpty: "nothingEquipped",	
	
	inventoryHolder: "id='inventorySlot",
	inventoryHolderSize: "width:" + 32 + "px; " + "height:" + 32 + "px;",
	inventoryBaseX: 5,
	inventoryBaseY:140,
	inventoryGrid: 35,
	
	weaponSlot: [-22, 148],
	shieldSlot: [10+32*6, 148],
	helmSlot: 	[10+32*3, 148],
	armorSlot: 	[10+32*3, 148+32],
	ring1Slot: 	[10+32*2, 148+16],
	ring2Slot: 	"",
	
	equipmentSlotFiller: [],
}
IH = ItemHolder; //For quick access in the console.
IH.equipmentSlotAttributes = 
			IH.equipmentClass +  
			" onclick='onClickEquipment(this)' " +
			" oncontextmenu='onRightClickEquipment(this)' " +
			" onmouseover='showItemWindow(this)' "+
			" onmouseout='hideItemWindow(this)' ";
		
		
function refreshItemDisplays() {
	displayInventory("refresh");
}


{//EQUIPMENT
	function createEquipmentSlotsElements() {
		let string = "";
		for (i = 0; i < Items.itemTypes.length -4; i++) {
			let left = eval("IH." + Items.itemTypes[i] + "Slot[0]");
			let top = eval("IH." + Items.itemTypes[i] + "Slot[1]");
			string += "<li id='" + Items.itemTypes[i] + "Slot' style='" + IH.equipmentHolderSize + " left:" + left + "px; top:" + top + "px;'></li>";
		}
		console.log(string);
		$("equipmentSlots").innerHTML = string;
	}
	
	function equipmentChange(item, fooType) { //fooType = "add" or "remove"
		console.log(item._itemSlot);
		
		eval(fooType + "Equipment(item)");		
	}
	
	function addEquipment(item) {
		changeRingSlotNo(item);
		let equipmentSlot = item._itemSlot;
		lastEquippedItem = item;
		
		if (Player.equipment[equipmentSlot] != IH.equipmentEmpty){ 
			removeEquipment(item, true);
		}
		
		$(equipmentSlot).style.background = lastEquippedItem._image[2];
		Player.equipment[equipmentSlot] = lastEquippedItem;
		
		changeInventoryItem(lastEquippedItem, "remove");
		console.log(equipmentSlot);
		$(equipmentSlot).dataset.item = item._getItemEval;
		refreshPlayerStats();
	}
	
	function changeRingSlotNo(item) {
		let ringSlot = "";
		if (item._itemType == "ring") {
			(P.equipment["ringSlot1"] == IH.equipmentEmpty) ? ringSlot = 1 : ringSlot = 2;
			item._itemSlot = "ringSlot" + ringSlot;
		}
	}
	
	function removeEquipment(item, swapEquipment) {
		var itemSlot = item._itemSlot;
		lastRemovedEquipment = Player.equipment[itemSlot];
		console.log(itemSlot);
		$(itemSlot).style.background = "";
		console.log(swapEquipment)
		if (swapEquipment) {
			changeInventoryItem(lastRemovedEquipment, lastClickedInventoryId)
		} else {
			changeInventoryItem(lastRemovedEquipment, "add"); 
			P.equipment[lastClickedEquipmentSlot] = IH.equipmentEmpty;
			refreshPlayerStats();
		}
	}
	
	function displayEquipmentHolder() {
		let i = 0;
		let grid = 70;
		let baseX = 145;
		let baseY = -64*0.75;
		let string = "";
		
		let x = 0;
		let y = 2;
		string += addItemElement(baseX, baseY, grid, x,y,"id='" + Items.itemTypes[i++] + "Holder'" + IH.equipmentSlotAttributes, IH.equipmentHolderSize);
		IH.weaponSlot[0] = baseX + grid * x;
		IH.weaponSlot[1] = baseY + grid * y;
		
		x = 2;
		y = 2;
		string += addItemElement(baseX, baseY, grid, x,y,"id='" + Items.itemTypes[i++] + "Holder'" + IH.equipmentSlotAttributes, IH.equipmentHolderSize);
		IH.shieldSlot[0] = baseX + grid * x;
		IH.shieldSlot[1] = baseY + grid * y;
		
		x = 1;
		y = 1;
		string += addItemElement(baseX, baseY, grid, x,y,"id='" + Items.itemTypes[i++] + "Holder'" + IH.equipmentSlotAttributes, IH.equipmentHolderSize);
		IH.helmSlot[0] = baseX + grid * x;
		IH.helmSlot[1] = baseY + grid * y;

		x = 1;
		y = 2;
		string += addItemElement(baseX, baseY, grid, x,y,"id='" + Items.itemTypes[i++] + "Holder'" + IH.equipmentSlotAttributes, IH.equipmentHolderSize);
		IH.armorSlot[0] = baseX + grid * x;
		IH.armorSlot[1] = baseY + grid * y;
		
		x = 0.5;
		y = 3;
		string += addItemElement(baseX, baseY, grid, x,y,"id='" + Items.itemTypes[i] + "Holder1'" + IH.equipmentSlotAttributes, IH.equipmentHolderSize);
		IH.ring1Slot[0] = baseX + grid * x;
		IH.ring1Slot[1] = baseY + grid * y;
		
		x = 1.5;
		y = 3;
		
		string += addItemElement(baseX, baseY, grid, x,y,"id='" + Items.itemTypes[i] + "Holder2'" + IH.equipmentSlotAttributes, IH.equipmentHolderSize);
		IH.ring2Slot[0] = baseX + grid * x;
		IH.ring2Slot[1] = baseY + grid * y;
		$("equipmentHolder").innerHTML = string;
		$("equipmentSlots").innerHTML = string.replaceAll("Holder", "Slot");
	}
	
}


{//INVENTORY
	function changeInventoryItem(item, fooType) { //"add" or "remove"
		let inv = Player.inventory;
		if (typeof fooType === "number") {
			inv[fooType] = item;
		} else if (fooType == "add") { 
			for (let i = 1; i < P.inventorySize; i++) {
				if (inv[i] == "empty") {
					inv[i] = item;
					$("inventorySlot" + i).dataset.item = item._getItemEval;
					break;
				}
			}
		} else { 
		
			inv[inv.indexOf(item)] = "empty";
			console.log(P.inventory[inv.indexOf(item)]);
		}
		refreshInventory();
		
	}

	

	function refreshInventory() {
		let image = "";
		for (let i = 1; i < P.inventorySize; i++) {
			if (P.inventory[i] != "empty") { 
				image = P.inventory[i]._image[1]
				$("inventorySlot" + (i)).style.background = image;
			} else if (P.inventory[i] == "empty") {
				image = "";
				$("inventorySlot" + (i)).style.background = image;
			}
		}
	}
	
	function destroyItem(item) {
		P.inventory[lastRightClickedInventoryId] = "empty";
		refreshInventory();
	}
}


function addItemElement(baseX = 0, baseY = 0, grid = 0, x = 1, y = 1, objectString, objectStyle) {	
	let string = "";
	string += "<li " + objectString + " ";
	string += "coord='" + x+","+y + "' ";
	string += "style='"; //Style
	string += objectStyle + " ";
	string += "left:" + (baseX + x * grid) + "px; ";
	string += "top:" + (baseY + y * grid) + "px; ";
	string += "'></li>";
	//console.log(string);
	return string;
}

function addRandomItem() {
	Items.item[Items.itemsCount + 1] = new Item(Items.itemTypes[Math.myRandom(5)], Math.myRandom(3)+1);
	changeInventoryItem(lastCreatedItem, "add");
	//console.log(lastCreatedItem);
	
}

ar = addRandomItem;


























