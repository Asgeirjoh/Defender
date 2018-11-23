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

	util.playAudio(flySound);

    // Remember my reset positions
    this.reset_cx = this.cx;
    this.reset_cy = this.cy;

	this.scale = 2;
	this.frame = 0;

	spatialManager.register(this);
}

Ship.prototype = new Entity();

Ship.prototype.KEY_UP = 'W'.charCodeAt(0);
Ship.prototype.KEY_DOWN  = 'S'.charCodeAt(0);
Ship.prototype.KEY_LEFT   = 'A'.charCodeAt(0);
Ship.prototype.KEY_RIGHT  = 'D'.charCodeAt(0);
Ship.prototype.KEY_WARP = 'E'.charCodeAt(0);

Ship.prototype.KEY_FIRE   = ' '.charCodeAt(0);

// Initial, inheritable, default values
Ship.prototype.cx = 200;
Ship.prototype.cy = 200;
Ship.prototype.velX = 0;
Ship.prototype.velY = 0;
Ship.prototype.numSubSteps = 1;
Ship.prototype.frame = 0;
Ship.prototype.scale = 0.5;
Ship.prototype.lives = 3;
Ship.prototype.isWarping = false;
Ship.prototype.warpingScale = -1;


Ship.prototype.update = function(du) {

    var steps = this.numSubSteps;
    var dStep = du / steps;

    for (var i = 0; i < steps; ++i) {
	   this.computeSubStep(dStep);
    }

	this.warp();

	// Fire a bullet.
	this.maybeFireBullet();

	// Turning the ship.
	this.updateFrame();

	this.playFlyingSound();
};

Ship.prototype.computeSubStep = function (du) {

    var accelX = this.computeThrustMagX();
    var accelY = this.computeThrustMagY();

    this.applyAccel(accelX, accelY, du);

	this.wrapPosition();
};

var NOMINAL_THRUSTX = 0.7;
var NOMINAL_THRUSTY  = 10;

Ship.prototype.computeThrustMagX = function () {

    var thrust = 0;

    if (keys[this.KEY_RIGHT]) {
        thrust += NOMINAL_THRUSTX;
	      flySound.volume = g_audioVolume;
    }
    if (keys[this.KEY_LEFT]) {
        thrust -= NOMINAL_THRUSTX;
	      flySound.volume = g_audioVolume;
    }

	if (thrust == 0) {
      flySound.volume = 0.1;
    }

	this.wrapPosition();
	this.updateFrame();

	return thrust;
};

Ship.prototype.computeThrustMagY = function (du) {

	let thrust = 0;

    if (keys[this.KEY_UP]) {
		thrust -= NOMINAL_THRUSTY
    }

    if (keys[this.KEY_DOWN]) {
		thrust += NOMINAL_THRUSTY
    }

	return thrust;
};

Ship.prototype.applyAccel = function (accelX, accelY, du) {

	// Max velocity for x and y axises
	let maxVelX = NOMINAL_THRUSTX * 5;
	let maxVelY = NOMINAL_THRUSTY * 5;

    // u = original velocity
    var oldVelX = this.velX;
    var oldVelY = this.velY;

    // v = u + at
	this.velX += accelX * du;
	this.velY = accelY * du;

	// Forcing the velocity on x-axis to be no more than maxVel.
	if(this.velX >= maxVelX){
		this.velX = maxVelX;
	}else if(this.velX <= -maxVelX){
		this.velX = -maxVelX;
	}

	// Forcing the velocity on y-axis to be no more than maxVel.
	if(this.velY >= maxVelY){
		this.velY = maxVelY;
	}else if(this.velY <= -maxVelY){
		this.velY = -maxVelY;
	}

    // v_ave = (u + v) / 2
    var aveVelX = (oldVelX + this.velX) / 2;
    var aveVelY = (oldVelY + this.velY) / 2;

    // Decide whether to use the average or not (average is best!)
    var intervalVelX = g_useAveVel ? aveVelX : this.velX;
    var intervalVelY = g_useAveVel ? aveVelY : this.velY;

    // s = s + v_ave * t
	var x = du * intervalVelX;
	this.cx += 0;
	this.cy += du * intervalVelY;

	// Creating a roof for the playing area.
	if(this.cy < g_sprites.ship.getSpriteHeight()){
		this.cy = g_sprites.ship.getSpriteHeight();
	}

	// Creating a floor for the playing area.
	if(this.cy > g_canvas.height - (g_sprites.ship.getSpriteHeight() / 2)){
		this.cy = g_canvas.height - (g_sprites.ship.getSpriteHeight() / 2);
	}

	 setOffset(x);
};

Ship.prototype.updateFrame = function(){

	if (keys[this.KEY_LEFT]) {
		this.frame = 1;
    }

    if (keys[this.KEY_RIGHT]) {
		this.frame = 0;
    }
};

Ship.prototype.maybeFireBullet = function () {

    if (eatKey(this.KEY_FIRE)) {
        let launchVel = 10;
		let left = -1;
		let right = 1;
		let launchDist = 0;
		let orientation = 0;
		let w = g_sprites.ship.getSpriteWidth();

		if(this.frame === 0){
			launchDist = this.cx + (w * 2 * right);
			orientation = launchVel * right;
		}else{
			launchDist = this.cx + (w * 2 * left);
			orientation = launchVel * left;
		}

        entityManager.fireBullet("Enemy", launchDist,
							this.cy + 5, orientation, 0);
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

Ship.prototype.getRadius = function(){
	return (g_sprites.ship.getSpriteWidth() / 2) * this.scale;
};

Ship.prototype.takeBulletHit = function(){
	this.kill();
	spatialManager.unregister(this);
};

Ship.prototype.wrapPosition = function () {
    this.cx = util.wrapRange(this.cx, 0, mapSize);
};

Ship.prototype.render = function (ctx){
    g_sprites.ship.drawCentredAt(ctx, this.cx, this.cy,
								this.frame, this.scale);

	this.renderLives();
};

Ship.prototype.playFlyingSound = function () {
    if (g_toggleAudio) {
      var buffer = .5;
      if (flySound.currentTime > flySound.duration - buffer) {
        flySound.currentTime = 0;
        flySound.play();
      }
    }
};

Ship.prototype.warp = function () {
  if (eatKey(this.KEY_WARP) && !this.isWarping) {
    this.isWarping = true;
    this.halt();
    util.playAudio(warpSound);
    this.warpingScale = -1;
  }
  if (this.isWarping) {
    this.updateWarp();
    this.halt();
  }
};

Ship.prototype.updateWarp = function () {
  var preScale = this.scale;
  this.scale += this.warpingScale * 0.01;

  if (this.scale < 0.1) {
    // Warp to random position x
    var x = Math.random() * -mapSize;
    setOffset(x);
    // Warp to random position y
    var y = Math.random() * (g_canvas.height - g_sprites.mans.getSpriteHeight());
    this.cy = y;
    this.warpingScale = 1;
    this.scale = 0.11;
  }
  if (this.scale > preScale) {
    this.scale = preScale;
    this.isWarping = false;
  }
};

Ship.prototype.renderLives = function () {
  var x = 15;
  for (var i = 1; i <= this.lives; i++) {
    g_sprites.ship.drawCentredAt(ctx, x, 10, 0, 1);
    x+=35;
  }
};
