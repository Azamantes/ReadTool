const Watchdog = new Watchdogs;

NinjaModule.prototype.deity = Watchdog;
MainModule.prototype.deity = Watchdog;

// function M(){
// 	var PLACE = {};
// 	// this.place = {
// 	// 	set set(data){
// 	// 		try {
// 	// 			var key = data[0];
// 	// 			var value = data[1];
// 	// 			if(!key || !value) throw new Error('Incorrect data.');
// 	// 			PLACE[key] = document.get(value);
// 	// 		} catch(error){
// 	// 			console.log(error);
// 	// 		}
// 	// 	},
// 	// 	get get(){
// 	// 		return PLACE;
// 	// 	}
// 	// };
// 	Object.define('place', {
// 		set: function(data){
// 			try {
// 				var key = data[0];
// 				var value = data[1];
// 				if(!key || !value) throw new Error('Incorrect data.');
// 				PLACE[key] = document.get(value);
// 			} catch(error){
// 				console.log(error);
// 			}
// 		},
// 		get: function(){
// 			return 5
// 		}
// 	});
// }