Items = {
	itemsAlive: [],
	itemsDead: [],
	item: [],
	itemsCount: 0,
	itemTypes: ["weapon", "shield", "helm", "armor", "ring", "key", "potion"],
	iconBaseSize: 32,
	
	initIconY: function() {
		let i = 0;
		this.itemY = [];
		this.itemY["weapon"] = i++;
		this.itemY["shield"] = i++;
		this.itemY["helm"] = i++;
		this.itemY["armor"] = i++;
		this.itemY["ring"] = i++;
		this.itemY["key"] = i++;
	},
	
	armorLevels: [
		"",
		"Steel ",
		"Adamantite ",
		"Dragon Glass ",
	],
	
	prefixes: [
		"Corrupted ",
		"Legendary ",
		"Frozen ",
		"Firey ",
		"Thundering ",
		"Fierce ",
	],
	
	names: [
		"",
	],
	
	suffixes: [
		" of Willpower",
		" of Mortality",
		" of Decay",
		" of the Damned",
		" of Prejudice",
		" of Blessed Light",
		" of the Guardian",
		" of Empowerment",
	],


	weapon: [0, {},{},{}],
	shield: [0, {},{},{}],
	helm: [0, {},{},{}],
	armor: [0, {},{},{}],
	ring: [0, {},{},{}],
	key: [0, {},{},{}],
	potion: [0, {},{},{}],
	
	
	weaponHpMod: 0,
	weaponAtkMod: 3,	
	weaponDefMod: 0,

	shieldHpMod: 1,
	shieldAtkMod: 1,	
	shieldDefMod: 3,

	helmHpMod: 2,
	helmAtkMod: 0,	
	helmDefMod: 1,

	armorHpMod: 3,
	armorAtkMod: 0,	
	armorDefMod: 2,

	ringHpMod: 2,
	ringAtkMod: 3,	
	ringDefMod: 1,	
	
	neckHpMod: 3,
	neckAtkMod: 2,	
	neckDefMod: 1,
}
I = Items;

class Item {
	constructor(itemType, level) {
		this.initialize(itemType, level);		
	}
	
	initialize(itemType, level) {
		this._id = Items.itemsCount + 1;
		Items.itemsCount++;
		this._itemLevel = level;
		
		this.itemType(itemType);
		this.itemSlot(this._itemType);
		this.stats(this._itemType, level);
		this.iconPosition(this._itemType, level);
		this.giveUniqueName(itemType);
		this._image = [];
		this.image(this._itemType, level, 1);
		this.image(this._itemType, level, 2);
		
		this._getItemEval = "Items.item[" + this._id + "]";
		lastCreatedItem = this;
	}
	
	itemType(itemType) {
		if (itemType == "sword" || itemType == "axe" || itemType == "mace") {
			this._itemType = "weapon"
		} else {
			this._itemType = itemType;
		}
	}

	itemSlot(itemType) {
		this._itemSlot = itemType + "Slot";
	}

	stats(itemType, level) {
		let itemHpMod = eval("Items." + itemType + "HpMod");
		let itemAtkMod = eval("Items." + itemType + "AtkMod");
		let itemDefMod = eval("Items." + itemType + "DefMod");
		this._stats = [];
		this._stats[0] = Math.myRandom(level) + itemHpMod * (level);		//MaxHealth
		this._stats[1] = Math.myRandom(level) + itemAtkMod * (level);	//Attack
		this._stats[2] = Math.myRandom(level) + itemDefMod * (level);	// Defense
	}
	
	iconPosition(itemType, level) {
		this._iconPosition = [];
		let iconSize = 32;
		console.log(itemType);
		console.log(Items.itemY[itemType]);
		this._iconPosition[0] = (level - 1) * iconSize;
		this._iconPosition[1] = (Items.itemY[itemType]) * iconSize;
	}

	image(itemType, level, index) {	
		let url = "url('img/iconset"
		if (index == 2) url += "Big";
		url += ".png') ";
		url += -this._iconPosition[0] * index + "px " + -this._iconPosition[1] * index + "px ";
		this._image[index] = url;
	}

	giveUniqueName(itemType) {
		let name = itemType.substring(0,1).toUpperCase() + itemType.substring(1,itemType.length);
		let quality = Items.armorLevels[this._itemLevel];
		(Math.myRandom(10) > 2) ? this._prefix = Items.prefixes[Math.myRandom(Items.prefixes.length)] : this._prefix = "";
		
		(Math.myRandom(10) > 4) ? this._suffix= Items.suffixes[Math.myRandom(Items.suffixes.length)] : this._suffix = "";
		
		this._name = this._prefix + quality + name + this._suffix;
		console.log(this._name);
	}
}






function itemsInitialize(itemType) {
	let item = eval("Items." + itemType);
	let itemHpMod = eval("Items." + itemType + "HpMod");
	let itemAtkMod = eval("Items." + itemType + "AtkMod");
	let itemDefMod = eval("Items." + itemType + "DefMod");
	
	for (let i = 1; i < 4; i++) {
		item[i].id = i;
		item[i].stats = [];
		item[i].posX = item[i].id * -32;
		item[i].posY = y * -32;
		item[i].stats[0] = Math.myRandom(i) + itemHpMod * (i);
		item[i].stats[1] = Math.myRandom(i) + itemAtkMod * (i);
		item[i].stats[2] = Math.myRandom(i) + itemDefMod * (i);
		item[i].equipmentType = itemType;
		item[i].equipmentSlot = itemType + "Slot";
		item[i].itemString = '<li id="' + itemType + (i) + '" imgType="item" ></li>';
		item[i].equipmentPlace = eval("IH." + itemType + "Slot");
	}
}

function iconsetChangeSize(mod) {
	let x = 2;
	let URL = "url(img/iconsetBig.png)" + x + y;
}
























