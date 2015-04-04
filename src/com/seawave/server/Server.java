package com.seawave.server;

import java.io.File;
import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.websocket.server.ServerEndpoint;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.OnMessage;

import org.w3c.dom.*;

import javax.xml.parsers.*;

@ServerEndpoint("/Server")
@WebServlet("/myServer")
public class Server extends HttpServlet {
	private static int sessionNumbers=0;
	private static int playerNumbers=0;
	private static int currentDrawPlayerID=0;
	String sessionTemp=null;
	private static final long serialVersionUID = 1L;
	private static int[] random=new int[3];
	private static String[] randomTerms=new String[3];
	private static int wantplayernumbers=0;
	private static int drawPlayers=0;
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Server() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
	//	HttpSession session = request.getSession(false);
		
	  //  System.out.println("2232");
		//PrintWriter  out = response.getWriter();
		//out.print(session.getAttribute("client"));
	
		wantplayernumbers =Integer.parseInt(request.getParameter("playernumbers"));
		drawPlayers =Integer.parseInt(request.getParameter("drawPlayers"));
		request.getSession().setAttribute("wantpalyernumbers", wantplayernumbers);
		request.getSession().setAttribute("drawPlayers", drawPlayers);
		ServletContext application=this.getServletContext();
		application.setAttribute("wantpalyernumbers", wantplayernumbers);
		application.setAttribute("drawPlayers", drawPlayers);
		RequestDispatcher dispatcher = request.getRequestDispatcher("/game.jsp");
		dispatcher .forward(request, response);

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

	// websocket part

	private static final Set<Server> connections = new CopyOnWriteArraySet<Server>();

	private Session session;

	public class JavaReadXml {
		private Document doc = null;

		public void init(String xmlFile) throws Exception {

			DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
			DocumentBuilder db = dbf.newDocumentBuilder();
			doc = db.parse(new File(xmlFile));
		}

		public void viewXML(String xmlFile) throws Exception {
			this.init(xmlFile);
			Element element = doc.getDocumentElement();
			System.out.println("Root element is: " + element.getTagName());

			NodeList nodeList = doc.getElementsByTagName("Term");
			
			random=randomCommon(0,nodeList.getLength(),randomTerms.length);
			System.out.println("random: " + random[0]);
			
			
			for (int i = 0; i <randomTerms.length; i++) {
			randomTerms[i]=nodeList.item(random[i]).getTextContent();
			System.out.println("Content:"+ nodeList.item(i).getTextContent());
		}
			
			System.out.println("length: " + nodeList.getLength());
//	}
			
//			
//			for (int i = 0; i < nodeList.getLength(); i++) {
//				System.out.println("i:" + nodeList.item(i));
//				System.out.println("Content:"+ nodeList.item(i).getTextContent());
//				
//			}
		}

	}

	@OnOpen
	public void sayHello(Session session) {

		System.out.println("sucess get request from client");
		sessionNumbers++;
		try {

			this.session = session;
			
			connections.add(this);
			session.getBasicRemote().sendText(String.valueOf(sessionNumbers));
			
			session.getBasicRemote().sendText("System>> Communication window is ready now!");
			// int d = Integer.parseInt(session.getId())+1;
			
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	  // if(!(session.getId().equals(sessionTemp)))
			   //{
				   playerNumbers++;
			   //sessionTemp=session.getId();
			  // }
			String message = String.format("System>>Player NO. %s %s %s",
					session.getId(), " has joined. "+" and Current Players: ",
					playerNumbers);
		Server.broadCast(message);
		//sessionTemp=session.getId();
		if(playerNumbers==1)
		{
			currentDrawPlayerID=sessionNumbers;
			//currentDrawPlayerID=(sessionNumbers%2+1);
		}
		else{
		if(playerNumbers==wantplayernumbers)
		{
			JavaReadXml parse = new JavaReadXml();
			try {
				parse.viewXML("./xml/drawterms.xml");
			} catch (Exception e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			playerNumbers=0;
			
			if(drawPlayers==1)
			{
			JSONObject obj=new JSONObject();
			try {
				obj.put("type", "startgame");
				obj.put("randomTerms",randomTerms[1]);
		    	obj.put("currentDrawPlayerID1",currentDrawPlayerID);
		    	obj.put("currentDrawPlayerID2",currentDrawPlayerID);
				Server.broadCast(obj.toString());
				System.out.println(randomTerms[1]);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			}	
			if(drawPlayers==2)
			{
				JSONObject obj1=new JSONObject();
			try {
				obj1.put("type", "startgame");
				obj1.put("randomTerms",randomTerms[1]);
		    	obj1.put("currentDrawPlayerID1",currentDrawPlayerID);
		    	obj1.put("currentDrawPlayerID2",currentDrawPlayerID+1);
				Server.broadCast(obj1.toString());
				System.out.println(randomTerms[1]);
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			}
			
		}
		}

		
	}

	@OnMessage
	public void processMessage(Session session, String message) {
		System.out.println("messages from client" + message);
		// session.getBasicRemote().sendText(message);
		
		
		Server.broadCast(message);
	}

	@OnClose
	public void onClose() {
		connections.remove(this);
		String message = String.format("System>Player NO.  %s %s",
				session.getId(), " has been disconnection.");
		Server.broadCast(message);
	}

	@OnError
	public void onError(Throwable throwable) {
		System.out.println(throwable.getMessage());
	}

	private static void broadCast(String message) {

		// var msg = JSON.parse(event.data);
		for (Server server : connections) {
			try {
				synchronized (server) {
					server.session.getBasicRemote().sendText(message);
				}
			} catch (IOException e) {
				connections.remove(server);
				try {
					server.session.close();
				} catch (IOException e1) {
				}
				Server.broadCast(String.format("System>Player NO.  %s %s",
						server.session.getId(), " has been disconnection."));
			}
		}
	}
	
	
	public static int[] randomCommon(int min, int max, int n){  
	    if (n > (max - min + 1) || max < min) {  
	           return null;  
	       }  
	    int[] result = new int[n];  
	    int count = 0;  
	    while(count < n) {  
	        int num = (int) (Math.random() * (max - min)) + min;  
	        boolean flag = true;  
	        for (int j = 0; j < n; j++) {  
	            if(num == result[j]){  
	                flag = false;  
	                break;  
	            }  
	        }  
	        if(flag){  
	            result[count] = num;  
	            count++;  
	        }  
	    }  
	    return result;  
	}  
	

}
