	const websocket = new WebSocket('ws://127.0.0.1:8090');
	const Watchdog = new Watchdogs();

	MainModule.prototype.deity = Watchdog;
	SkyModule.prototype.deity = Watchdog;
	