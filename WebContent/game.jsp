
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page import="javax.websocket.Session"%>
<%@page import="javax.websocket.WebSocketContainer"%>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
<title>You draw I guess</title>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
<style type="text/css">
 #mycanvas {
	border: 1px solid #ccc;
}
</style>

</head>
<body>

	<%!int i=0;
	//int client[]=new int[100];
// 	   Session websocketsession ;
	%> 
	<% 
		i++;
// 	  session.setAttribute("client", i);
 	  //out.println("Welcome palyer NO. "+session.getAttribute("client"));
		%>
		<input id="currentDrawPlayerNo"  style="display: none;"/>
		<input id="flag" value="1" style="display: none;"/>
		<button id="restart" onclick="history.go(-0) " style="visibility:hidden;">Restart Game</button>
         <div id = "welcome"><a href="index.jsp" title="Back to Setting Page">Back to Setting Page</a> 
         
         </div> 
	<div align="center" >	
	<embed id='music' src="./lib/music/m.mp3" width=200 height=50 type=audio/mpeg loop="true" autostart="false"> </embed>
			<p align="center" ><input id = "connect" type="button" value="Connect and start the game" onclick="hello()"/></p>
			<div id="hid" align="center" style="visibility: hidden;">
		    <div id = "noticewindow"/>  
		</div>
		<canvas id="mycanvas" name="mycanvas" width="500" height="300"> your brower do not support this game, please change your brower</canvas>
		<script type="text/javascript" src="./lib/js/Client.js"></script>
		<div>
		
			<input id="clean" type="button" value="clean and redraw" onclick="clean()" style="visibility: hidden;" />
			<div id="guess" style="visibility: hidden;">
			Guess what he is drawing:<input type="text" name="2" id="check" cols="10" rows="1" size="15" onkeydown="if(event.keyCode==13){check(); return false;}" />
			
			<input type="button" value="check" name="2" cols="10" rows="1" size="15" onclick="check()"/>
			</div>
			
			<div style="clear:both">
			<div  align="left" id="messages" style="height: 100px;background: white  url(./lib/images/1.jpeg) repeat scroll; overflow: auto" style="float:left" >
			<div id="messages" style="width: 2px; height: 1000px; overflow: auto"></div>
		</div>
		
		
		<div>
			 Edit your nickname: <input type="text" name="2" id="2" cols="10" rows="1" size="15" value ="Anonymous<%=i %>" onchange="sendClientName()"/>
			
			</div>
			<div style="float:center">
			
			<textarea name="1" id="1" cols="50" rows="2" onkeydown="if(event.keyCode==13){sendMessage(); return false;}"></textarea>
			<input type="submit" value="send" onclick="sendMessage()" />
		<p id = "communication"></p>
	
	      	</div>
		</div>


	</div>

</body>
</html>

