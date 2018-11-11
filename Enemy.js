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

    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;   
}

// Initial, inheritable, default values
Enemy.prototype.cx = 100;
Enemy.prototype.cy = 100;
Enemy.prototype.velX = 0;
Enemy.prototype.velY = 0;
Enemy.prototype.frame = 0;

Enemy.prototype.update = function(du){
	
}

Enemy.prototype.render = function(ctx){
	let scale = 1;
	let frame = 0;
	
	g_sprites.ship.drawCentredAt(
		ctx, this.cx, this.cy,
		frame, scale
    );
}