// ===========
// ENEMY STUFF
// ===========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object.
function Enemy(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }

	this.setup(descr);
}

Enemy.prototype = new Entity();

Enemy.prototype.smartBombs = 3;

Enemy.prototype.KEY_BOMB = 'B'.charCodeAt(0);

Enemy.prototype.update = function(du){
  if(this._isDeadNow)
		return entityManager.KILL_ME_NOW
}

Enemy.prototype.render = function(ctx){
	let scale = 1;
  this.renderBombs();
}

Enemy.prototype.renderBombs = function () {
  var x = 15;
  for (var i = 1; i <= this.smartBombs; i++) {
    g_sprites.bombs.drawCentredAt(ctx, x, 30, 0, 0.4);
    x+=35;
  }
};
