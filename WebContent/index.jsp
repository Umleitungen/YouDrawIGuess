<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>You draw I guess</title>
<script type="text/javascript" src="./lib/js/index.js"></script>
</head>
<body bgcolor=gray>
	<div align="center" style="z-index: 1;">
		<h3>Welcome to the "You draw I guess" Setting Page!</h3>
		
		<form action="myServer" method="post"
			onsubmit="return validate_form(this)">
			The numbers of players: <input type="text" name="playernumbers"
				id="playernumbers"
				value="<%=session.getAttribute("wantpalyernumbers")%>" size="3" />
			([2-10] is avaliable) The numbers of drawers: <input type="text"
				name="drawPlayers" id="drawPlayers"
				value="<%=session.getAttribute("drawPlayers")%>" size="3" />
			([1-2] is avaliable)<br> <input type="submit" id="submit"
				value="Submit" />
		</form>

		<div id="Layer1"
			style="position: absolute; left: center; top: 0; width: 900; height: 700; z-index: -1">
			<embed src="./lib/flash/1.swf" width=500% height=500% 
				wmode="transparent" type="application/x-shockwave-flash"/>
		</div>
<div id="Layer2"
			style="position: absolute; left: center; top: 0; width: 900; height: 700; z-index: -1">
			<embed src="./lib/flash/1.swf" width=300% height=300% 
				wmode="transparent" type="application/x-shockwave-flash"/>
		</div>
		<div id="Layer3"
			style="position: absolute; left: 0; top: 200; width: 100%; height: 100%; z-index: inherit">

			<marquee scrollamount=3 scrolldelay=3 align=middle behavior="scroll">
				<img border="0" src="./lib/images/2.jpg"> <img border="0"
					src="./lib/images/3.jpg">

			</marquee>

		</div>
	</div>
</body>
</html>