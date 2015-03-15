<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>You draw I guess</title>
<script type="text/javascript" src="./lib/js/index.js"></script>
</head>
<body bgcolor=gray>
	<div align="center" style="z-index: 1;">
		<h3>Welcome to the "You draw I guess" Setting Page!</h3>
		<%
		Object wantpalyernumbers=application.getAttribute("wantpalyernumbers");
		Object drawPlayers=application.getAttribute("drawPlayers");
		%>
		<input id="wantpalyernumbers" value="<%=wantpalyernumbers %>" style="display: none;"/>
		<input id="drawPlayers" value="<%=drawPlayers %>"style="display: none;" />
		
		<form action="myServer" method="post"
			onsubmit="return validate_form(this)" id="myform" name="myform">
			The numbers of players: <input type="text" name="playernumbers"
				id="playernumbers"
				value="<%=application.getAttribute("wantpalyernumbers")%>" size="3" />
			([2-10] is avaliable) The numbers of drawers: <input type="text"
				name="drawPlayers" id="drawPlayers"
				value="<%=application.getAttribute("drawPlayers")%>" size="3" />
			([1-2] is avaliable)<br> 
			<input type="submit" id="submit1" name="submit1" value="Submit" />
		</form>
<!-- <script type="text/javascript">load();</script> -->
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