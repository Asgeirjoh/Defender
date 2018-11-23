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
	this.scale = 1;
	
	spatialManager.register(this);
}

Enemy.prototype = new Entity();
Enemy.prototype.smartBombs = 3;
Enemy.prototype.KEY_BOMB = 'B'.charCodeAt(0);

Enemy.prototype.takeBulletHit = function(){	
	this.kill();
	spatialManager.unregister(this);
};

Enemy.prototype.update = function(du) {	

	this.cx += this.velX * du;
	this.cy += this.velY * du;	

	if(this.isDead()){
		return entityManager.KILL_ME_NOW;
	}		
};

Enemy.prototype.getRadius = function(){
	return (g_sprites.enemy.getSpriteWidth() / 2) * this.scale;	
};


Enemy.prototype.render = function (ctx) {
	this.renderBombs(ctx);
	
    g_sprites.enemy.drawCentredAt(ctx, this.cx, this.cy,
									this.frame,	this.scale);
};

Enemy.prototype.renderBombs = function (ctx) {
  var x = 15;
  for (var i = 1; i <= this.smartBombs; i++) {
    g_sprites.bombs.drawCentredAt(ctx, x, 30, 0, 1);
    x+=35;
  }
};