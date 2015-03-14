var r = /^\d+$/;

function check(field, alerttxt) {
	with (field) {
		if (r.test(value) == false) {
			alert(alerttxt);
			return false
		} else {
			return true
		}
	}

}

function large(field, alerttxt) {
	with (field) {
		if (r.test(value) == true && (value > 10 || value < 2)) {
			alert(alerttxt);
			return false
		} else {
			return true
		}
	}

}
function large2(field, alerttxt) {
	with (field) {
		if (r.test(value) == true && (value < 1 || value > 2)) {
			alert(alerttxt);
			return false
		} else {
			return true
		}
	}

}
function validate_required(field, alerttxt) {
	with (field) {
		if (value == null || value == "") {
			alert(alerttxt);
			return false
		} else {
			return true
		}
	}
}
function compare(field1,field2, alerttxt) {
	with (field1&&field2) {
		if (r.test(field1.value) == true &&r.test(field2.value) == true&&(field1.value<=field2.value)) {
			alert(alerttxt);
			return false
		} else {
			return true
		}
	}
}

function validate_form(thisform) {
	with (thisform) {
		if (validate_required(playernumbers,
				"Player numbers must be filled out!") == false) {
			playernumbers.focus();
			return false
		}
		if (check(playernumbers, "Player numbers should be numerical!") == false) {
			playernumbers.focus();
			return false
		}
		if (large(playernumbers,
				"Player numbers is too large or small! [2-10] is avaliable") == false) {
			playernumbers.focus();
			return false
		}

		if (validate_required(drawPlayers,
				"Draw Player numbers must be filled out!") == false) {
			drawPlayers.focus();
			return false
		}
		if (check(drawPlayers, "Draw Player numbers should be numerical!") == false) {
			drawPlayers.focus();
			return false
		}
		if (large2(drawPlayers,
				"Draw Player numbers is too large or small! [1-2] is avaliable") == false) {
			drawPlayers.focus();
			return false
		}
		if (compare(playernumbers,drawPlayers,
		"Draw Player numbers can not be equal with or larger than player numbers") == false) {
	drawPlayers.focus();
	return false
}
	}

}