var websocket = new WebSocket('ws://localhost:8090');
websocket.onopen = function(){
	console.log('Websocket connection is open.');
	websocket.sendJSON({
		event: 'connect',
		userID: USER_ID
	});
};
websocket.onmessage = function(data){
	data = JSON.parse(data.data);
	if(data.event === 'bye'){
		websocket.close();
		return;
	}
	Watchdog.shout('websocket: ' + data.event, data);
};
websocket.sendJSON = function(data){
	websocket.send(JSON.stringify(data));
};
