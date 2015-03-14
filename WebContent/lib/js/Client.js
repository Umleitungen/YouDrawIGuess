var ws;
var drawTerm;
var paint = 0;
var mouseX;
var mouseY;
var canvas = document.getElementById('mycanvas');
var myp = canvas.getContext("2d");
myp.lineWidth = 5;
myp.strokeStyle = "blue";

$("#mycanvas").mousedown(
		function(e) {
			mouseX = e.pageX - this.offsetLeft, mouseY = e.pageY
					- this.offsetTop, paint = 1;
			if (document.getElementById("flag").value == 1)
				sendMousedown(mouseX, mouseY, paint)
		});

$("#mycanvas").mouseup(function(e) {
	paint = 0;
	if (document.getElementById("flag").value == 1)
		sendMouseup(paint);
});

$("#mycanvas").mousemove(function(e) {
	mouseX = e.pageX - this.offsetLeft;
	mouseY = e.pageY - this.offsetTop;

	if (paint) {
		if (document.getElementById("flag").value == 1)
			sendMousemove(mouseX, mouseY);

	}
	;
});

function hello() {
	ws = new WebSocket("ws://localhost:8080/YouDrawIGuess/Server")

	ws.onopen = function() {
		sendClientName();
		document.getElementById('messages').innerHTML = 'System>> Communication Connection established';
		document.getElementById('communication').innerHTML = 'Communication window above, click "send" button or press "Enter" key on keyboard to send your messages!';
		// document.getElementById('welcome').innerHTML ="Welcome to You draw I
		// guess!";

		console.log("Connection established");
		// document.getElementById('music').start="true";
		document.getElementById('hid').style.visibility = 'visible';
		document.getElementById('connect').style.display='none';
	};

	var r = /^\d+$/;
	ws.onmessage = function(event) {
		if (!event.data.match("^\{(.+:.+,*){1,}\}$")) {
			if (r.test(event.data) == true) {

				document.getElementById('currentDrawPlayerNo').value = event.data;
				// document.getElementById('messages').innerHTML +='<br />' +
				// "currentno>>"+document.getElementById('currentDrawPlayerNo').value+'<br
				// />' ;
				// var div = document.getElementById('messages');
				// div.scrollTop = div.scrollHeight+2;
			} else {
				document.getElementById('messages').innerHTML += '<br />'
						+ event.data;
				var div = document.getElementById('messages');
				div.scrollTop = div.scrollHeight + 2;
			}
		} else {
			console.log("onmessage");
			var msg = JSON.parse(event.data);
			console.log("json,messsage");

			switch (msg.type) {

			case "clientname":
				document.getElementById('messages').innerHTML += '<br />'
						+ "System>>"
						+ "There is a player changing his nickname: "
						+ msg.clientname;

				var div = document.getElementById('messages');
				div.scrollTop = div.scrollHeight + 2;

				console.log("communication");
				break;
			case "communication":
				document.getElementById('messages').innerHTML += '<br />'
						+ msg.clientname + ">>" + msg.text;

				var div = document.getElementById('messages');
				div.scrollTop = div.scrollHeight + 2;

				console.log("communication");
				break;
			case "mousedown":
				myp.moveTo(msg.mouseX, msg.mouseY);
				paint = 1;

				console.log("mousedown");
				break;
			case "mouseup":
				paint = 0;
				console.log("mouseup");
				break;
			case "mousemove":
				if (paint) {
					myp.lineTo(msg.mouseX, msg.mouseY);
					myp.stroke();
				}
				;
				console.log("mousemove");
				break;
			case "clean":
				myp.clearRect(0, 0, canvas.width, canvas.height);
				myp.beginPath();
				console.log("clean");
				document.getElementById('messages').innerHTML += '<br />'
						+ "System>> " + msg.clientname
						+ " has the canvas cleaned";
				var div = document.getElementById('messages');
				div.scrollTop = div.scrollHeight + 2;
				break;

			case "startgame":
				myp.clearRect(0, 0, canvas.width, canvas.height);
				myp.beginPath();
				console.log("clean");

				drawTerm = msg.randomTerms;
				if (msg.currentDrawPlayerID1 == document
						.getElementById("currentDrawPlayerNo").value
						|| msg.currentDrawPlayerID2 == document
								.getElementById("currentDrawPlayerNo").value) {
					document.getElementById('noticewindow').innerHTML = "It is your turn to draw: "
							+ msg.randomTerms;
					document.getElementById("flag").value = 1;
					document.getElementById('clean').style.visibility = 'visible';
				}
				if (msg.currentDrawPlayerID1 != document
						.getElementById("currentDrawPlayerNo").value
						&& msg.currentDrawPlayerID2 != document
								.getElementById("currentDrawPlayerNo").value) {
					document.getElementById("flag").value = 0;
					document.getElementById('noticewindow').innerHTML = "It is your turn to guess!";

					document.getElementById('guess').style.visibility = 'visible';

				}
				// document.getElementById('messages').innerHTML +='<br />'+
				// "unknown>>"+
				// msg.currentDrawPlayerID+document.getElementById("currentDrawPlayerNo").value;
				document.getElementById('messages').innerHTML += '<br />'
						+ "System>> " + "Game Start, system "
						+ " has the canvas cleaned";
				var div = document.getElementById('messages');
				div.scrollTop = div.scrollHeight + 2;
				console.log("startgame");
				break;
			case "publicResults":
				console.log("publicResults");
				document.getElementById('messages').innerHTML += '<br />'
						+ "System>> Player " + "\"" + msg.clientname + "\""
						+ " give the right answer, it is " + "\"" + msg.result
						+ "\"";
				var div = document.getElementById('messages');
				div.scrollTop = div.scrollHeight + 2;
				document.getElementById('restart').style.visibility='visible';
				break;
			default:
				// document.getElementById('messages').innerHTML += "unknown
				// message>>"+ event.data;
				var div = document.getElementById('messages');
				div.scrollTop = div.scrollHeight + 2;
				break;
			}

		}
		;

		ws.onclose = function() {
			// alert(event.data);
			alert("Error");
			console.log("error");
		};

		ws.onerror = function() {
			// alert(event.data);
			alert("Error");
			console.log("error");
		};

	}
}
function check() {
	if (document.getElementById("check").value.toLowerCase() == drawTerm
			.toLowerCase()) {
		var msg = {
			type : "publicResults",
			clientname : document.getElementById("2").value,
			result : drawTerm,
		};

		ws.send(JSON.stringify(msg));
		alert("Congratulations! it is right.");
	} else {

		alert("Sorry, it is incorrect");
		console.log("incorrect");

	}
}
function clean() {

	// var canvas = document.getElementById('bo');
	//
	// var context=canvas.getContext("2d");
	var msg = {
		type : "clean",
		clientname : document.getElementById("2").value,
	};

	// Send the msg object as a JSON-formatted string.
	ws.send(JSON.stringify(msg));

}
function sendClientName() {

	var msg = {
		type : "clientname",
		clientname : document.getElementById("2").value,
	};

	// Send the msg object as a JSON-formatted string.
	ws.send(JSON.stringify(msg));
}
function sendMessage() {

	var msg = {
		type : "communication",
		clientname : document.getElementById("2").value,
		text : document.getElementById("1").value,
	};

	// Send the msg object as a JSON-formatted string.
	ws.send(JSON.stringify(msg));
	document.getElementById("1").value = "";

}

function sendMousedown(mX, mY, p) {

	var msg = {
		type : "mousedown",
		mouseX : mX,
		mouseY : mY,
		paint : p,
	};

	// Send the msg object as a JSON-formatted string.
	ws.send(JSON.stringify(msg));

}
function sendMouseup(p) {

	var msg = {
		type : "mouseup",
		paint : p,
	};

	// Send the msg object as a JSON-formatted string.
	ws.send(JSON.stringify(msg));

}
function sendMousemove(mX, mY) {

	var msg = {
		type : "mousemove",
		mouseX : mX,
		mouseY : mY,
	};

	// Send the msg object as a JSON-formatted string.
	ws.send(JSON.stringify(msg));

}
