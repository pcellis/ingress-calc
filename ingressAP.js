angular.module('ingressAP', []).controller('IngressController', function() {
	this.ingressLevels = [
		0,
		10000,
		30000,
		70000,
		150000,
		300000,
		600000,
		1200000
	];

	this.actionAP = {
		"HACK_ENEMY_PORTAL": 100,
		"HACK_NEUTRAL_OWN_PORTAL": 0,
		"RECHARGE_PORTAL": 10,
		"PLACE_RESONATOR": 125,
		"UPGRADE_YOUR_RESONATOR": 0,
		"UPGRADE_OTHER_RESONATOR": 65,
		"CAPTURE_PORTAL": 500,
		"COMPLETE_PORTAL": 250,
		"LINK_PORTALS": 313,
		"CONTROL_FIELD": 1250,
		"PORTAL_SHIELD": 0,
		"DESTROY_RESONATOR": 75,
		"DESTROY_LINK": 187,
		"DESTROY_CONTROL_FIELD": 750
	};

	this.getAPAmount = function getAPAmount(action) {
		return this.actionAP[action] * 2;
	}

	this.getLevel = function getLevel() {
		var myLevel = 0;

		for(i = 0, len = this.ingressLevels.length ; i < len; i = i + 1) {
			if(this.currentAPLevel >= this.ingressLevels[i]) {
				myLevel = i + 1;
			}
		}

		return myLevel;
	};

	this.currentAPLevel = 1;

	this.remainingAPToLevel = function remainingAPToLevel() {
		return this.ingressLevels[this.getLevel()] - this.currentAPLevel;
	};

	this.numActionsForNextLevel = function numActionsForNextLevel(action) {
		var actionArr = action.split("|"),
			total = 0;

		for(i in actionArr) {
			total = total + this.getAPAmount(actionArr[i]);
		}

		return Math.ceil((this.ingressLevels[this.getLevel()] - this.currentAPLevel) / total);
	};
});