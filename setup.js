function setup(){	
	//displayMainWindows(true);
	Scene_Overhead.setup();
	Scene_Player.setup();
	Scene_World.setup();
	Scene_TopMenu.setup();
	Scene_Frame.setup();
	Sites.goHome();
	update();
	Grid.gridSize();
	generateMap(22); //value indicates the amount of terrain that will be unusable.
	setupItems();
	displayEquipmentHolder();
	setupInventory();
	setupEquipment();
	frame._element.style.display = "none";
}



function setupLocation() {
}

function setupItems() {
	itemsInitialize("weapon");
	itemsInitialize("shield");
	itemsInitialize("helm");
	itemsInitialize("armor");
	itemsInitialize("ring");
	Items.initIconY();
}