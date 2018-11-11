// ==========
// SHIP STUFF
// ==========

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// A generic contructor which accepts an arbitrary descriptor object
function Ship(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }

    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;   
}

Ship.prototype.KEY_UP = 'W'.charCodeAt(0);
Ship.prototype.KEY_DOWN  = 'S'.charCodeAt(0);
Ship.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Ship.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);

Ship.prototype.KEY_FIRE   = ' '.charCodeAt(0);

// Initial, inheritable, default values
Ship.prototype.cx = 0;
Ship.prototype.cy = 0;
Ship.prototype.velX = 0;
Ship.prototype.velY = 0;
Ship.prototype.numSubSteps = 1;
Ship.prototype.frame = 0;
Ship.prototype.scale = 1;

Ship.prototype.update = function(du) {
	
    var steps = this.numSubSteps;
    var dStep = du / steps;
	let vel = 10 * this.frame; 
	let offsetBulletY = this.cy;
	let offsetBulletX = this.cx + offset;
	
    for (var i = 0; i < steps; ++i) {
	   this.computeThrustMag(dStep);
       this.computeUpandDown();	 
    }
	
	// Firing a bullet
    if (keys[this.KEY_FIRE]) {  
    	entityManager.fireBullet(
    	   offsetBulletX, offsetBulletY,
    	   vel, 0);
    }
}

var NOMINAL_THRUST = +0.2;
var NOMINAL_DETHRUST  = +0.2;

Ship.prototype.computeThrustMag = function (du) {
    var maxspeed = 12;
    var thrust = 0;
    if ((keys[this.KEY_RIGHT]) && (this.velX < maxspeed)) {
        thrust += NOMINAL_THRUST;		
        this.applyAccel(NOMINAL_THRUST, du);
    }
    else if ((keys[this.KEY_LEFT]) && (this.velX > -maxspeed)) {
        thrust -= NOMINAL_THRUST;		
        this.applyAccel(-NOMINAL_THRUST, du);
    }

    if (thrust === 0 && this.velX > 0) {
      this.applyAccel(-NOMINAL_DETHRUST, du);
      if (this.velX > 0 && this.velX < 0.5) {
        this.halt();
      }
    }
    if (thrust === 0 && this.velX < 0) {
      this.applyAccel(NOMINAL_DETHRUST, du);
      if (this.velX < 0 && this.velX > -0.5) {
        this.halt();
      }
    }
    Background.prototype.wrapPosition(); // LAGA ÞETTA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
    this.wrapPosition();  
	this.updateFrame();
};

Ship.prototype.computeUpandDown = function () {
	
    if (keys[this.KEY_UP]) {
        if (this.cy > 0) {
          this.cy -= 5;
      }	  
    }
    if (keys[this.KEY_DOWN]) {
      if (this.cy < g_canvas.height - g_sprites.ship.getSpriteHeight()) {
        this.cy += 5;
      }
    }
};

Ship.prototype.applyAccel = function (accelX, du) {

    // u = original velocity
    var oldVelX = this.velX;

    // v = u + at
    this.velX += accelX * du;

    // v_ave = (u + v) / 2
    var aveVelX = (oldVelX + this.velX) / 2;

    // Decide whether to use the average or not (average is best!)
    var intervalVelX = g_useAveVel ? aveVelX : this.velX;

    // s = s + v_ave * t
    var nextX = this.cx + intervalVelX * du;

    // bounce
    if (g_useGravity) {

	var minY = g_sprites.ship.getSpriteHeight();
	var maxY = g_canvas.height - minY;

	// Ignore the bounce if the ship is already in
	// the "border zone" (to avoid trapping them there)
	if (this.cy > maxY || this.cy < minY) {
	    // do nothing
	} else if (nextY > maxY || nextY < minY) {
            this.velY = oldVelY * (-0.9);
            intervalVelY = this.velY;
        }
    }

    // s = s + v_ave * t
    var x = du * intervalVelX;
    this.cx += x;
    setOffset(x);
};

Ship.prototype.setPos = function (cx, cy) {
    this.cx = cx;
    this.cy = cy;
}

Ship.prototype.getPos = function () {
    return {posX : this.cx, posY : this.cy};
}

Ship.prototype.reset = function () {
    this.setPos(this.reset_cx, this.reset_cy);
	this.frame = 1;
    this.halt();
};

Ship.prototype.halt = function () {
    this.velX = 0;
    this.velY = 0;
};

Ship.prototype.updateFrame = function(){
	
	if (keys[this.KEY_LEFT]) {
		this.frame = 0;		       	
    }
	
    if (keys[this.KEY_RIGHT]) {    
		this.frame = 1;			
    }
}

Ship.prototype.wrapPosition = function () {
    this.cx = util.wrapRange(this.cx, 0, mapSize);   
};

Ship.prototype.render = function (ctx) {
	
    g_sprites.ship.drawCentredAt(
		ctx, this.cx + offset, this.cy,
		this.frame, this.scale
    );
};
