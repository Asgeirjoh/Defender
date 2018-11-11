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
	
	this.cx = 200;
	this.cy;
	this.velX;
	this.velY;
	this.frame;
}


Enemy.prototype.update = function(du){
	this.cx = 200;
	this.cy = 0;
	this.velX = 1;
	this.velY = 1;
	this.frame = 1;
}

Enemy.prototype.render = function(ctx){
	let scale = 1;

	
	g_sprites.enemy.drawCentredAt(
		ctx, this.cx, this.cy,
		this.frame, scale
    );
}