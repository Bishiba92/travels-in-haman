screenSizeX = window.innerWidth - 100;
screenSizeY = window.innerHeight - 100;
WINDOWCOLOR = "maroon";
BORDERSTYLE = "none";
BORDERCOLOR = "gold";
LEFTCOLUMNP = 350;

//SCENES
const Scene_Overhead = {
	setup: function() {
		WindowManager.addWindow("overhead", 10, 2, 0, 0, document.body, true, true)
		lastCreatedWindow._element.className += " menu contentText";
		lastCreatedWindow._element.style.lineHeight = "5px"
		lastCreatedWindow._element.innerHTML = "<h1>Travels in Haman</h1><h2>JRPG roleplaying game in browser</h2>"
	}
}

const Scene_Player = {
	setup: function() {
		width = 3;
		
		WindowManager.addWindow("locationWindow", width, 1, 0, 2, document.body, false, true)
		lastCreatedWindow._element.setAttribute("onclick", "Sites.goWiki('wiki/" + Location.current.toLowerCase() + ".html')")
		lastCreatedWindow._element.className += " menu contentText";
		lastCreatedWindow._element.style.minWidth = LEFTCOLUMNP + "px";
		
		
		
		WindowManager.addWindow("playerStatWindow", width, 5, 0, lastCreatedWindow._offsetY + lastCreatedWindow._height, document.body, false, true)
		lastCreatedWindow._element.innerHTML = 
			"<span id='playerName'>Name</span><br>" +
			"<span id='goldString'>Gold: </span><span id='gold'>gold</span><br>" +
			"<span id='healthString'>Health: </span><span id='health'>hp</span> / <span id='maxHealth'>mhp</span> <br><meter id='healthGauge' value = '0.1'></meter><br><br>" +
			"<span id='attackString'>Attack: </span><span id='attack'>atk</span><br>" +
			"<span id='defenseString'>Defense: </span><span id='defense'>def</span><br>" +
			"<ul id='navlist'>" +
			"<span id='inventoryHolder'></span>" +
			"<span id='inventorySlots'></span>" +
			"</ul>" +
			"<ul id='navlist'>" +
			"<span id='equipmentHolder'></span>" +
			"<span id='equipmentSlots'></span>" +
			"</ul>";
		lastCreatedWindow._element.className += " menu contentText";
		lastCreatedWindow._element.style.minWidth = LEFTCOLUMNP + "px";
		
		
		
		WindowManager.addWindow("buttonWindow", width, 1, 0, lastCreatedWindow._offsetY + lastCreatedWindow._height, document.body, false, true)
		lastCreatedWindow._element.className += " menu contentText";
		lastCreatedWindow._element.innerHTML = 
			"<button id = 'button1' type = 'button' onclick='moveSprite(Player, 'up')'>Up</button><br>" +
			"<button id = 'button2' type = 'button' onclick='addRandomItem()'>Add random item</button><br>" +
			"<button id = 'button3' type = 'button' onclick='refreshInventory()'>Refresh Inventory</button><br>";
		lastCreatedWindow._element.style.minWidth = LEFTCOLUMNP + "px";
			
		
		
		
		WindowManager.addWindow("textWindow", 	width, 2, 0, lastCreatedWindow._offsetY + lastCreatedWindow._height, document.body, false, true);
		lastCreatedWindow._element.className += " menu contentText";
		lastCreatedWindow._element.style.minWidth = LEFTCOLUMNP + "px";
	}
}

const Scene_World = {
	setup: function() {
	WindowManager.addWindow("mapWindow", 7, 9, WindowManager.windowObj["playerStatWindow"]._width, WindowManager.windowObj["overhead"]._height, document.body, true, true);
	lastCreatedWindow._element.innerHTML = 
		"<ul id='navlist'><span id='map'></span><span id='walkMap'></span></ul>";
	lastCreatedWindow._element.style.backgroundColor = "#0f768d";
	}
}

const Scene_Shop = {
	
}

const Scene_TopMenu = {
	setup: function() {
		WM.addWindow("homeButton", 2, 1, 0, 1, $("overhead"), true, true, "a");
		this.addAttributes();
		lastCreatedWindow._element.innerHTML = "HOME";
		lastCreatedWindow._element.setAttribute("onclick", "Sites.goHome(this)");
		
		
		WM.addWindow("aboutButton", 2, 1, 2, 1, $("overhead"), true, true, "a");
		this.addAttributes();
		lastCreatedWindow._element.innerHTML = "ABOUT";
		lastCreatedWindow._element.setAttribute("onclick", "Sites.goAbout(this)");
		
		WM.addWindow("gameButton", 2, 1, 4, 1, $("overhead"), true, true, "a");
		this.addAttributes();
		lastCreatedWindow._element.innerHTML = "GAME";
		lastCreatedWindow._element.setAttribute("onclick", "Sites.goGame(this)");
		
		WM.addWindow("plannedButton", 2, 1, 6, 1, $("overhead"), true, true, "a");
		this.addAttributes();
		lastCreatedWindow._element.innerHTML = "PLANNED";
		lastCreatedWindow._element.setAttribute("onclick", "Sites.goPlanned(this)");
		
		WM.addWindow("wikiButton", 2, 1, 8, 1, $("overhead"), true, true, "a");
		this.addAttributes();
		lastCreatedWindow._element.innerHTML = "ELDORWIKI";
		lastCreatedWindow._element.setAttribute("onclick", "Sites.goWiki('wiki')");
		lastCreatedWindow._element.style.width = parseInt(lastCreatedWindow._element.style.width.replace("px", "")) - 3 + "px";
		
	},

	addAttributes: function() {
		lastCreatedWindow._element.style.display = "flex";
		lastCreatedWindow._element.style.justifyContent = "center";
		lastCreatedWindow._element.style.alignItems = "center";
		lastCreatedWindow._element.className += " topMenuButtons";
		lastCreatedWindow._element.setAttribute("onmouseover", "WindowManager.onMouseOverColorChange(this)");
		lastCreatedWindow._element.setAttribute("onmouseout", "WindowManager.onMouseOutColorChange(this)");
		lastCreatedWindow._style.borderStyle = "solid solid solid none";
	}
}

const Scene_Frame = {
	setup: function() {
	WindowManager.addWindow("Frame", 10, 9, 0, 2, document.body, false, true, "iframe");
	lastCreatedWindow._element.style.display = "block";
	lastCreatedWindow._element.className = "window";
	frame = lastCreatedWindow;
	}
}

//WINDOWMANAGER
const WindowManager = {
	windowCount: 0,
	windowObj: [],
	
	statColor: "<span id='attributeText'>",
	normalColor: "</span>",
	
	addWindow: function (name, width, height, offsetX, offsetY, parent, relativeX, relativeY, elementTag) {
		this.windowCount += 1;
		this.windowObj[name] = new Window(name, width, height, offsetX, offsetY, parent, relativeX, relativeY, elementTag);
	},
	
	getWindowScaleSize: function(x, y) {
		x = Math.round(((window.innerWidth - 12) * (x / 10)))  || 0;
		y = Math.round(((window.innerHeight - 100) * (y / 10))) || 0;
		return {x, y}
	},
	
	setLastCreatedWindow: function(Window) {
		lastCreatedWindow = Window;
	},
	
	getElementOnClick: function(element) { //And window object
		clickedElement = element;
		clickedWindowObj = this.getWindowObjectFromElement(element);
	},
	
	getWindowObjectFromElement: function(element) {
		return WindowManager.windowObj[element.id];
	},
	
	onMouseOverColorChange: function(element) {
		element.style.backgroundColor = "#871a04";
		element.style.borderStyle = "solid solid solid none";
	},
    
	onMouseOutColorChange: function(element) {
		element.style.backgroundColor = "maroon";
		element.style.borderStyle = "solid solid solid none";
	},
	

	

}

WM = WindowManager;

class Window{ 
	
	constructor(name, width, height, offsetX, offsetY, parent, relativeX, relativeY, elementTag) {//name, width, height, offsetX, offsetY, parent, relativeX, relativeY, elementTag
		this.initialize(name, width, height, offsetX, offsetY, parent, relativeX, relativeY, elementTag);	
	}
	
	initialize(name, width, height, offsetX, offsetY, parent, relativeX, relativeY, elementTag) {
		elementTag = elementTag || "div"
		this._name = name;
		this._id = WindowManager.windowCount;
		this._element = $ce(elementTag);
		this._style = this._element.style;
		this._width = width;
		this._height = height;
		this._offsetX = offsetX;
		this._offsetY = offsetY;
		this.elementSetup(relativeX, relativeY);
		parent.appendChild(this._element);
		WindowManager.setLastCreatedWindow(this);
	}
	
	elementSetup(relativeX, relativeY) {
		
		
		let element = this._element;
		let style = this._element.style;
		let offsetX = 0;
		let offsetY = 0;
		let dimension = WindowManager.getWindowScaleSize(this._width, this._height);
		let offset = WindowManager.getWindowScaleSize(this._offsetX, this._offsetY);		
		
		style.left = offset.x + "px";
		style.top = offset.y + "px";
		style.width = dimension.x + "px";
		style.height = dimension.y + "px";
		this.setZIndex(1);
		
		element.id = this._name;
		element.className = "window";
		element.setAttribute("onclick", "WindowManager.getElementOnClick(this)");
		element.dataset.object = "WindowManager.windowObj['" + this._name + "']";
		style.display = "block";
	}
	
	setWidth(width) {
		width = WindowManager.getWindowScaleSize(width).x;
		console.log(this);
		this._width = width;
		this._style.width = width + "px";
	}
	
	setHeight(height) {
		this._height = height;
		this._style.height = height + "px";
	}
	
	setOffsetX(offsetX) {
		offsetX = WindowManager.getWindowScaleSize(offsetX).x
		this._offsetX = offsetX;
		this._style.left = offsetX + "px";
	}
	
	setOffsetY(offsetY) {
		offsetY = WindowManager.getWindowScaleSize(0, offsetY).y
		this._offsetY = offsetY;
		this._style.top = offsetY + "px";
	}
	
	setBackgroundColor(color) {
		this._style.backgroundColor = color;
	}
	
	changeDisplay(bool) {
		(bool == "true" || bool == true) ? this._style.display = "block" : this._style.display = "none";
	}
	
	setZIndex(z) {
		this._style.zIndex = z;
	}
	
	setBorder(style, color, width) {
		this._style.borderStyle = style || this._style.borderStyle;
		this._style.borderColor = color || this._style.borderColor;
		this._style.borderWidth = width || this._style.borderWidth;
	}
	
	setAnchorPoint(object, attachmentPointX, attachmentPointY) {//left, center, right || top, center, bottom
		switch(attachmentPointX) {
			case "left": break;
			case "center": {
				this.offsetX(object._offsetX + object._width / 2);
				break;
			}
			case "right": { 
				this.offsetX(object._offsetX + object._width);
				break;
			}
		}
	
		switch(attachmentPointY) {
			case "top": break;
			case "center": {
				this.offsetY(object._offsetY + object._height/ 2);
				break;
			}
			case "bottom": {
				this.offsetY(object._offsetY + object._height);
				break;
			}
		}
	}
	
	

}

function getWindowSize(windowElementStyle) {
	x = windowElementStyle["width"].substring(0, windowElementStyle["width"].indexOf("p"));
	y = windowElementStyle["height"].substring(0, windowElementStyle["height"].indexOf("p"));
	return {x, y};
}

function showItemWindow(element) {
	itemHover = $("itemHover");
	if (element.dataset.item) {
		var top = 0;
		var left = 0;
	if (element.className == "inventorySlots") {
			element.appendChild($("itemHover"))
			top = 28;
			left = 28;
		}
		if (element.className == "equipmentSlot") {
			element.appendChild($("itemHover"))
			top = 58;
			left = 58;
		}
		console.log(eval(element.dataset.item));
		let item = eval(element.dataset.item);
		let string = item._name;
		var statN = Player.statNames;
		var rows = 0;
		var statString = "";

		console.log(statN);
		
		$("itemHover").innerHTML = item._name + "<br>";
		for (let i = 0; i < statN.length; i++) {
			console.log(i);
			if (item._stats[i] > 0) {
				$("itemHover").innerHTML += statN[i] + ":  " + WindowManager.statColor + item._stats[i] + "</span><br>";
				rows++;
			}
		}
		
		$("itemHover").style.width = 20 + 10 * item._name.length + "px" ;
		
		$("itemHover").style.height = 20 + 26 * rows + "px" ;
		
		$("itemHover").style.zIndex = 500;
		
		$("itemHover").style.left = (getElementAbsolutePos(element).x + left).toString() + "px";
		
		$("itemHover").style.top = (getElementAbsolutePos(element).y + top).toString() + "px";
		
		document.body.appendChild($("itemHover"));
		
		$("itemHover").style.display = "block";
		
	}
}

function hideItemWindow(element) {
	if (element.dataset.item) {
		$("itemHover").style.display = "none";
	}
}

const Sites = {
	goHome: function(element) {
		frame._element.style.display = "block";
		frame._element.src = "sites/home.html";
	},

	goAbout: function() {
		frame._element.style.display = "block";
		frame._element.src = "sites/about.html";
	},
	
	goGame: function() {
		frame._element.style.display = "none";
	},
	
	goPlanned: function() {
		frame._element.style.display = "block";
		frame._element.src = "sites/planned.html";
	},
	
	goWiki: function(page) {
		frame._element.style.display = "block";
		frame._element.src = "wiki/" + page + ".html";
	},
}


{//GET ABSOLUTE POSITION OF WINDOW:		https://www.codeproject.com/Articles/35737/Absolute-Position-of-a-DOM-Element#:~:text=left%20%2C%20style.,except%20the%20latest%20document%20element).
	function __getIEVersion() {
		var rv = -1; // Return value assumes failure.
		if (navigator.appName == 'Microsoft Internet Explorer') {
			var ua = navigator.userAgent;
			var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if (re.exec(ua) != null)
				rv = parseFloat(RegExp.$1);
		}
		return rv;
	}

	function __getOperaVersion() {
		var rv = 0; // Default value
		if (window.opera) {
			var sver = window.opera.version();
			rv = parseFloat(sver);
		}
		return rv;
	}


	var __userAgent = navigator.userAgent;
	var __isIE =  navigator.appVersion.match(/MSIE/) != null;
	var __IEVersion = __getIEVersion();
	var __isIENew = __isIE && __IEVersion >= 8;
	var __isIEOld = __isIE && !__isIENew;

	var __isFireFox = __userAgent.match(/firefox/i) != null;
	var __isFireFoxOld = __isFireFox && ((__userAgent.match(/firefox\/2./i) != null) || 
		(__userAgent.match(/firefox\/1./i) != null));
	var __isFireFoxNew = __isFireFox && !__isFireFoxOld;

	var __isWebKit =  navigator.appVersion.match(/WebKit/) != null;
	var __isChrome =  navigator.appVersion.match(/Chrome/) != null;
	var __isOpera =  window.opera != null;
	var __operaVersion = __getOperaVersion();
	var __isOperaOld = __isOpera && (__operaVersion < 10);

	function __parseBorderWidth(width) {
		var res = 0;
		if (typeof(width) == "string" && width != null && width != "" ) {
			var p = width.indexOf("px");
			if (p >= 0) {
				res = parseInt(width.substring(0, p));
			}
			else {
				res = 1; 
			}
		}
		return res;
	}


//returns border width for some element
	function __getBorderWidth(element) {
		var res = new Object();
		res.left = 0; res.top = 0; res.right = 0; res.bottom = 0;
		if (window.getComputedStyle) {
			//for Firefox
			var elStyle = window.getComputedStyle(element, null);
			res.left = parseInt(elStyle.borderLeftWidth.slice(0, -2));  
			res.top = parseInt(elStyle.borderTopWidth.slice(0, -2));  
			res.right = parseInt(elStyle.borderRightWidth.slice(0, -2));  
			res.bottom = parseInt(elStyle.borderBottomWidth.slice(0, -2));  
		}
		else {
			//for other browsers
			res.left = __parseBorderWidth(element.style.borderLeftWidth);
			res.top = __parseBorderWidth(element.style.borderTopWidth);
			res.right = __parseBorderWidth(element.style.borderRightWidth);
			res.bottom = __parseBorderWidth(element.style.borderBottomWidth);
		}
	   
		return res;
	}


	//returns the absolute position of some element within document
	function getElementAbsolutePos(element) {
		var res = new Object();
		res.x = 0; res.y = 0;
		if (element !== null) { 
			if (element.getBoundingClientRect) {
				var viewportElement = document.documentElement;  
				var box = element.getBoundingClientRect();
				var scrollLeft = viewportElement.scrollLeft;
				var scrollTop = viewportElement.scrollTop;

				res.x = box.left + scrollLeft;
				res.y = box.top + scrollTop;

			}
			else { //for old browsers
				res.x = element.offsetLeft;
				res.y = element.offsetTop;

				var parentNode = element.parentNode;
				var borderWidth = null;

				while (offsetParent != null) {
					res.x += offsetParent.offsetLeft;
					res.y += offsetParent.offsetTop;
					
					var parentTagName = 
						offsetParent.tagName.toLowerCase();	

					if ((__isIEOld && parentTagName != "table") || 
						((__isFireFoxNew || __isChrome) && 
							parentTagName == "td")) {		    
						borderWidth = kGetBorderWidth
								(offsetParent);
						res.x += borderWidth.left;
						res.y += borderWidth.top;
					}
					
					if (offsetParent != document.body && 
					offsetParent != document.documentElement) {
						res.x -= offsetParent.scrollLeft;
						res.y -= offsetParent.scrollTop;
					}


					//next lines are necessary to fix the problem 
					//with offsetParent
					if (!__isIE && !__isOperaOld || __isIENew) {
						while (offsetParent != parentNode && 
							parentNode !== null) {
							res.x -= parentNode.scrollLeft;
							res.y -= parentNode.scrollTop;
							if (__isFireFoxOld || __isWebKit) 
							{
								borderWidth = 
								 kGetBorderWidth(parentNode);
								res.x += borderWidth.left;
								res.y += borderWidth.top;
							}
							parentNode = parentNode.parentNode;
						}    
					}

					parentNode = offsetParent.parentNode;
					offsetParent = offsetParent.offsetParent;
				}
			}
		}
		return res;
	}
}

























