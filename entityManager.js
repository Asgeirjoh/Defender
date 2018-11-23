/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

"use strict";

/*jslint nomen: true, white: true, plusplus: true*/

var entityManager = {

// "PRIVATE" DATA
_bombs		 : [],
_bullets 	 : [],
_ships   	 : [],
_enemies 	 : [],
_friends 	 : [],

// "PRIVATE" METHODS

_forEachOf: function(aCategory, fn) {
    for (var i = 0; i < aCategory.length; ++i) {
		fn.call(aCategory[i]);
    }
},

// PUBLIC METHODS

// A special return value, used by other objects,
// to request the blessed release of death!
//
KILL_ME_NOW : -1,

// Some things must be deferred until after initial construction
// i.e. thing which need `this` to be defined.
//
deferredSetup : function () {
    this._categories = [this._bombs, this._bullets,
								this._ships, this._enemies, this._friends];
},

init: function(){
	for(let i = 0; i < g_sprites.enemy.getImageFrames(); i++){
		let y = -300 + Math.floor((Math.random() * 100));	
		let x = -300 + Math.floor((Math.random() * 1500));	
	
		this.generateEnemy("Enemy", x, y, 1, 1, i);	
	}
	
	this.generateShip({
		name: "Ship",
		cx: (g_canvas.width / 2) - (g_sprites.ship.getSpriteWidth() / 2),
        cy: (g_canvas.height / 2)- (g_sprites.ship.getSpriteHeight() / 2)});
		
	// Generateing the bombs.
	for(let i = 0; i < 3; i++){
		this.generateBomb("Enemy", 15 + (35 * i), 30, i + 1);
	}
           
	this.generateFriends();  
},

fireBullet: function(target, cx, cy, velX, velY) {	
    this._bullets.push(new Bullet({ target: target,
									cx: cx,
                                    cy: cy,
                                    velX: velX,
                                    velY: velY 
									}));
},

generateBomb : function(target, cx, cy, amount){	
	this._bombs.push(new Bomb({target: target, cx: cx,
												cy: cy, bombCount: amount}));	
},

generateEnemy : function(name, cx, cy, velX, velY, frame){	
	this._enemies.push(new Enemy({name: name, cx: cx, cy: cy,
								  velX: velX, velY: velY,
								  frame: frame}));
},

generateFriends : function(descr) {  
    var NUM = 4;
    for (var i = 0; i < NUM; ++i) {
        this._friends.push(new Friends({cx: 500 + Math.random() 
												* g_canvas.width,cy:this.cy}));
    }
},

generateShip : function(descr) {   
    this._ships.push(new Ship({name: descr.name, cx: descr.cx, cy: descr.cy}));
},

resetShips: function() {
    this._forEachOf(this._ships, Ship.prototype.reset);
},

haltShips: function() {
    this._forEachOf(this._ships, Ship.prototype.halt);
},

enemyCountUpdate : function(du){
	if(this._enemies.length === 0){
		for(let i = 0; i < g_sprites.enemy.getImageFrames(); i++){
			let y = -300 + Math.floor((Math.random() * 100));	
			let x = -300 + Math.floor((Math.random() * 1500));				
			
			this.generateEnemy("Enemy", x, y, 1, 1, i);	
		}
	}
	
	for(let i = 0; i < this._enemies.length; i++){
		let px = this._ships[0].getPos().posX;
		let py = this._ships[0].getPos().posY;
		let ex = this._enemies[i].getPos().posX;
		let ey = this._enemies[i].getPos().posY;
	
		if(ex < 0){
			this._enemies[i].velX = 2;			
		}else if(ex > 1000){
			this._enemies[i].velX = -1;
		}
		
		if(ey < 150){
			this._enemies[i].velY = 2;	
		}else if(ey > 400){
			this._enemies[i].velY = -1;			
		}

	}
},

categoryUpdate : function(du){
	for (var c = 0; c < this._categories.length; ++c) {
      var aCategories = this._categories[c];
      for (var i = 0; i < aCategories.length; ++i) {        
        if (aCategories[i].update(du) === this.KILL_ME_NOW) {
            aCategories.splice(i, 1);
        }
      }
    } 
},

update: function(du) {	
	this.categoryUpdate(du);
	this.enemyCountUpdate(du);	 
},

render: function(ctx) {
    for (var c = 0; c < this._categories.length; c++) {
        var aCategory = this._categories[c];
   
        for (var i = 0; i < aCategory.length; i++) {
            aCategory[i].render(ctx);				
        }        
    }
}
}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();