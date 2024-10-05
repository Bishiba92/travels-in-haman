function showSpoiler(obj, type) {
	var inner = obj.parentNode.getElementsByTagName(type)[0];
	if (inner.style.display == "none")
		inner.style.display = "";
	else
		inner.style.display = "none";
		
	(obj.value == "Show") ? obj.value = "Hide" : obj.value = "Show";
}