function changeButtonText(buttonId, text) {
	for (i = 1; i < 10; i++) {
		document.getElementById("button" + i).style.display = "none";
	}
}

function changeButtonText(buttonId, text) {
	document.getElementById('button' + buttonId).innerHTML = text;
}

function changeButtonFunction(buttonId, func) {
	evalThis ="document.getElementById('button' + buttonId).onclick = function onclick(event){\n" + func + "()\n};";
	eval(evalThis);
}