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
    this.setup(descr);

 
    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;   
}

Ship.prototype = new Entity();

Ship.prototype.KEY_UP = 'W'.charCodeAt(0);
Ship.prototype.KEY_DOWN  = 'S'.charCodeAt(0);
Ship.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Ship.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);

Ship.prototype.KEY_FIRE   = ' '.charCodeAt(0);

// Initial, inheritable, default values
Ship.prototype.cx = 200;
Ship.prototype.cy = 200;
Ship.prototype.velX = 0;
Ship.prototype.velY = 0;
Ship.prototype.numSubSteps = 1;
Ship.prototype.frame = 0;
Ship.prototype.scale = 0.5;

Ship.prototype.update = function(du) {
	
    var steps = this.numSubSteps;
    var dStep = du / steps;
	
	let toLeft = (this.frame === 0)? -1 : this.frame;
	let vel = 10 * toLeft;
	
	
    for (var i = 0; i < steps; ++i) {
	   this.computeSubStep(dStep);	 
    }

	// Fire a bullet.
	this.maybeFireBullet();
}

Ship.prototype.computeSubStep = function (du) {
	
    var accelX = this.computeThrustMagX();
    var accelY = this.computeThrustMagY();
 
    this.applyAccel(accelX, accelY, du);
    
    this.wrapPosition();   
};

var NOMINAL_THRUST = 0.2;
var NOMINAL_RETRO  = 0.2;

Ship.prototype.computeThrustMagX = function () {
    
    var thrust = 0;
   	
    if (keys[this.KEY_RIGHT]) {
        thrust += NOMINAL_THRUST;
    }
    if (keys[this.KEY_LEFT]) {
        thrust -= NOMINAL_RETRO;
    }    
	
    Background.prototype.wrapPosition(); // LAGA ÞETTA !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1
    this.wrapPosition();  
	this.updateFrame();
	
	return thrust;
};

Ship.prototype.computeThrustMagY = function (du) {

	let thrust = 0;
    
    if (keys[this.KEY_UP]) {
        thrust -= NOMINAL_THRUST;
    }
    if (keys[this.KEY_DOWN]) {
        thrust += NOMINAL_RETRO;
    } 
	
	return thrust;
};

Ship.prototype.applyAccel = function (accelX, accelY, du) {
    
    // u = original velocity
    var oldVelX = this.velX;
    var oldVelY = this.velY;
    
    // v = u + at
    this.velX += accelX * du;
    this.velY += accelY * du; 

    // v_ave = (u + v) / 2
    var aveVelX = (oldVelX + this.velX) / 2;
    var aveVelY = (oldVelY + this.velY) / 2;
    
    // Decide whether to use the average or not (average is best!)
    var intervalVelX = g_useAveVel ? aveVelX : this.velX;
    var intervalVelY = g_useAveVel ? aveVelY : this.velY;
       
    // s = s + v_ave * t
    var x = du * intervalVelX;
	this.cx += x;
    this.cy += du * intervalVelY;
    setOffset(x);
};

Ship.prototype.maybeFireBullet = function () {

    if (keys[this.KEY_FIRE]) {
    
        let launchDist = 50;
        let launchVel = 10;	
          

        entityManager.fireBullet(
           this.cx, this.cy,
           this.velX + launchVel, 0);           
    }    
};

Ship.prototype.setPos = function (cx, cy) {
    this.cx = cx;
    this.cy = cy;
};

Ship.prototype.getPos = function () {
    return {posX : this.cx, posY : this.cy};
};

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
};

Ship.prototype.wrapPosition = function () {
    this.cx = util.wrapRange(this.cx, 0, mapSize);   
};

Ship.prototype.render = function (ctx) {
	
    g_sprites.ship.drawWrappedCentredAt(
	ctx, this.cx, this.cy, this.frame, this.scale);
    //this.sprite.scale = origScale;
};
