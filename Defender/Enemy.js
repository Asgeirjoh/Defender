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
	this.allDead = true;
	spatialManager.register(this);	
}

Enemy.prototype = new Entity();

// Kannar hvort sprengja hafi verið notuð.
Enemy.prototype.isBombed = false;

Enemy.prototype.takeBulletHit = function(){	
	this.kill();	
};

Enemy.prototype.update = function(du) {	

	this.cx += this.velX * du;
	this.cy += this.velY * du;		
	
	if(this.isDead() || this.isBombed){
		spatialManager.unregister(this);
		return entityManager.KILL_ME_NOW;
	}	

	if(this.isBombed){		
		this.insert();	
	}
	
	this.fireBullet();
};

Enemy.prototype.fireBullet = function(){
	let r = Math.random();
	let o = (this.cx < (g_canvas.width / 2))? 1 : -1;
	if(r < 0.001){	
        entityManager.fireBullet("Ship", this.cx,
										this.cy, 2 * o, 0);
	}
};

Enemy.prototype.getRadius = function(){
	return (g_sprites.enemy.getSpriteWidth() / 2) * this.scale;	
};

Enemy.prototype.render = function (ctx) {
    g_sprites.enemy.drawCentredAt(ctx, this.cx, this.cy,
									this.frame,	this.scale);
};
