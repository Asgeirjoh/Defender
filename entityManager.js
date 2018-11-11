/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";

/*jslint nomen: true, white: true, plusplus: true*/

var entityManager = {

// "PRIVATE" DATA

_rocks   : [],
_bullets : [],
_ships   : [],
_enemies : [],

_bShowRocks : false,

// "PRIVATE" METHODS

_findNearestShip : function(posX, posY) {
   
    var minLength = util.square(g_canvas.width) + util.square(g_canvas.height),
        newLength,
        closestShip,
        closestIndex;

    for (var i = 0; i < this._ships.length; i++) {
        newLength = util.wrappedDistSq(posX, posY,
                               this._ships[i].cx, this._ships[i].cy,
                               g_canvas.width, g_canvas.height);
     
        if (newLength < minLength) {

              minLength = newLength;
              closestShip = this._ships[i];
              closestIndex = i;

        }
    }

    return {
		theShip : closestShip,   // the object itself
		theIndex: closestIndex   // the array index where it lives
    };
},

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
    this._categories = [this._rocks, this._bullets, this._ships, this._enemies];
},

fireBullet: function(cx, cy, velX, velY) {	
    this._bullets.push(new Bullet( {cx: cx,
                                    cy: cy,
                                    velX: velX,
                                    velY: velY 
									}));
},

generateEnemy : function(cx, cy, velX, velY, frame){	
	this._enemies.push(new Enemy({cx: cx, cy: cy,
								  velX: velX, velY: velY,
								  frame: frame}));
},

generateShip : function(descr) {   
    this._ships.push(new Ship({cx: descr.cx, cy: descr.cy}));
},

killNearestShip : function(xPos, yPos) {
    var nearestShip = this._findNearestShip(xPos, yPos);
    this._ships.splice(nearestShip.theIndex, 1); 
},

resetShips: function() {
    this._forEachOf(this._ships, Ship.prototype.reset);
},

haltShips: function() {
    this._forEachOf(this._ships, Ship.prototype.halt);
},

update: function(du) {
	
    for (var c = 0; c < this._categories.length; ++c) {
      var aCategories = this._categories[c];
      for (var i = 0; i < aCategories.length; ++i) {
        // Update entity with the if statement
        if (aCategories[i].update(du) === this.KILL_ME_NOW) {
            aCategories.splice(i, 1);
        };
      }
    } 
},

render: function(ctx) {
	if(this._enemies.length < 3){
		for(let g = 0; g < 3; g++){
			this.generateEnemy(100 * i, 10, 0,  0, g);
			
		}
	}

    for (var c = 0; c < this._categories.length; ++c) {
     var aCategory = this._categories[c];
     if (aCategory != this._rocks || this._bShowRocks) {
         for (var i = 0; i < aCategory.length; ++i) {
             aCategory[i].render(ctx);
         }
     }
   }
}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();
