// ======
// BULLET
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Bullet(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }

	this.setup(descr);
	this.closeEntity = null; // A container for the entity which is close.
	this.scale = 0.3;
	util.playAudio(shootSound);
	spatialManager.register(this);
}

Bullet.prototype = new Entity();

// Convert times from seconds to "nominal" time units.
Bullet.prototype.lifeSpan = 1 * SECS_TO_NOMINALS;

Bullet.prototype.getRadius = function(){
	return (g_sprites.bullet.getSpriteWidth() / 2) * this.scale;
};

Bullet.prototype.getPos = function () {
    return {posX : this.cx, posY : this.cy};
};

Bullet.prototype.takeBulletHit = function(){
	this.kill();
	spatialManager.unregister(this);
};

Bullet.prototype.update = function (du) {

	this.lifeSpan -= du;
  if (this.lifespan < 0) {
    this.kill();
  	spatialManager.unregister(this);
  }
	this.cx += this.velX * du;

	// If there is no entity in the container
	// then add one.
	if(this.closeEntity == null){
		this.closeEntity = this.findTarget(this.target);
	}

	// If the entity in the closeEntity container
	// happens to be undefined or a bullet then empty the
	// container and start over.
	if(this.closeEntity == undefined){
		this.closeEntity = null;
		return 0;
	}

	let x = this.closeEntity.cx * Math.sin(this.getRadius());
	let y = this.closeEntity.cy * (-Math.cos(this.getRadius()));
	let a = this.cx * Math.sin(this.getRadius());
	let b = this.cy * (-Math.cos(this.getRadius()));
	let d = util.distSq(a, b, x, y);

	// If the entity is within the bullet´s limit,
	// then kill it.
	if((d / (this.getRadius() * 2)) < (this.getRadius() / 4)){

		var canTakeHit = this.closeEntity.takeBulletHit;

		if (canTakeHit){
			canTakeHit.call(this.closeEntity);
			this.takeBulletHit();
			return entityManager.KILL_ME_NOW;
		}
	}
};

Bullet.prototype.render = function (ctx) {
	var fadeThresh = this.lifeSpan / 3;

		ctx.globalAlpha = this.lifeSpan/fadeThresh;
			g_sprites.bullet.drawCentredAt(ctx,
					this.cx + offset, this.cy, 0, this.scale);


    ctx.globalAlpha = 1;
};
