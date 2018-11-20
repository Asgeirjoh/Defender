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
    util.playAudio(this.shoot);
    //this.shoot.currentTime = 0;
    //this.shoot.play();
	  this.setup(descr);
}

Bullet.prototype = new Entity();

Bullet.prototype.shoot = new Audio("Sounds/shipShotLong.wav");
Bullet.prototype.shoot.volume = 0.5;
// Convert times from seconds to "nominal" time units.
Bullet.prototype.lifeSpan = 1 * SECS_TO_NOMINALS;

Bullet.prototype.update = function (du) {

    if (this.lifeSpan - du <= 0) return -1;

    this.cx += this.velX * du;
    this.cy += this.velY * du;

    this.wrapPosition();

    this.lifeSpan -= du;
};

Bullet.prototype.setPos = function (cx, cy) {
    this.cx = cx;
    this.cy = cy;
}

Bullet.prototype.getPos = function () {
    return {posX : this.cx, posY : this.cy};
}

Bullet.prototype.wrapPosition = function () {
    this.cx = util.wrapRange(this.cx, 0, mapSize);
};

Bullet.prototype.render = function (ctx) {

    var fadeThresh = this.lifeSpan / 3;
	let scale = 0.1;

	ctx.globalAlpha = this.lifeSpan/fadeThresh;

	g_sprites.bullet.drawCentredAt(
		ctx, this.cx, this.cy, 0, scale);

    ctx.globalAlpha = 1;
};
