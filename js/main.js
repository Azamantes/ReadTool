'use strict';

const Watchdog = new Watchdogs;

MainModule.prototype.deity = Watchdog;
SkyModule.prototype.deity = Watchdog;

function ABC(){
	this.place = 5;
}
ABC.prototype.x = (value) => value;

ABC = new Proxy(ABC, {
  construct: function(target, argv, newTarget) {
    return {

    }
  }
});