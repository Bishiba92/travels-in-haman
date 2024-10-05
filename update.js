function update() {
	updateLocationName(0);
	updatePlayerName();
	updatePlayerGold();
	updatePlayerStats();
	//drawPlayer();
}

function updateLocationName() {
	$("locationWindow").innerHTML = Location.current;
}

function updatePlayerName() {
	document.getElementById("playerName").innerHTML = Player.name;
}

function updatePlayerGold() {
	document.getElementById("gold").innerHTML = WindowManager.statColor + Player.gold;
}

function updatePlayerStats() {
	updatePlayerHealth();
	updatePlayerAttack();
	updatePlayerDefense();
}

function updatePlayerHealth() {
	document.getElementById("maxHealth").innerHTML = WindowManager.statColor + Player.stats[0];
	document.getElementById("health").innerHTML = WindowManager.statColor + Player.health;
	let gauge = Player.health/Player.stats[0];
	document.getElementById("healthGauge").value = gauge.toString();
}

function updatePlayerAttack() {
	document.getElementById("attack").innerHTML = WindowManager.statColor + Player.stats[1].toString();
}

function updatePlayerDefense() {
	document.getElementById("defense").innerHTML = WindowManager.statColor + Player.stats[2].toString();
}
