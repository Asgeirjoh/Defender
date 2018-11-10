/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

// "PRIVATE" DATA

_rocks   : [],
_bullets : [],
_ships   : [],

_bShowRocks : false,

// "PRIVATE" METHODS

_generateRocks : function() {
    var i,
	NUM_ROCKS = 4;
  // Made `NUM_ROCKS` Rocks!
  for (i = 0; i < NUM_ROCKS; i++) {
    this._rocks[i] = new Rock();
  }
    // TODO: Make `NUM_ROCKS` Rocks!
},

_findNearestShip : function(posX, posY) {

    // TODO: Implement this
    var minLength = util.square(g_canvas.width) + util.square(g_canvas.height),
        newLength,
        closestShip,
        closestIndex;

    for (var i = 0; i < this._ships.length; i++) {
        newLength = util.wrappedDistSq(posX, posY,
                               this._ships[i].cx, this._ships[i].cy,
                               g_canvas.width, g_canvas.height);
        //console.log(newLength, minLength);
        if (newLength < minLength) {

              minLength = newLength;
              closestShip = this._ships[i];
              closestIndex = i;

        }
    }
    // NB: Use this technique to let you return "multiple values"
    //     from a function. It's pretty useful!
    //
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
    this._categories = [this._rocks, this._bullets, this._ships];
},

fireBullet: function(cx, cy, velX, velY, rotation, translate) {
	
    this._bullets.push(new Bullet( {cx: cx,
                                    cy: cy,
                                    velX: velX,
                                    velY: velY,
                                    rotation: rotation,
									translate: translate
									}));
},

generateShip : function(descr) {
    // TODO: Implement this
    this._ships.push(new Ship({cx: descr.cx, cy: descr.cy}))
},

killNearestShip : function(xPos, yPos) {
    // TODO: Implement this
    var nearestShip = this._findNearestShip(xPos, yPos);
    this._ships.splice(nearestShip.theIndex, 1);
    // NB: Don't forget the "edge cases"
},

resetShips: function() {
    this._forEachOf(this._ships, Ship.prototype.reset);
},

haltShips: function() {
    this._forEachOf(this._ships, Ship.prototype.halt);
},

update: function(du) {

    // TODO: Implement this
    for (var c = 0; c < this._categories.length; c++) {
      var aCategories = this._categories[c];
      for (var i = 0; i < aCategories.length; i++) {
        // Update entity with the if statement
        if (aCategories[i].update(du) === this.KILL_ME_NOW) {
            aCategories.splice(i, 1);
        };
      }
    }
    // NB: Remember to handle the "KILL_ME_NOW" return value!
    //     and to properly update the array in that case.
},

render: function(ctx) {

    // TODO: Implement this
    for (var c = 0; c < this._categories.length; c++) {
     var aCategory = this._categories[c];
     if (aCategory != this._rocks || this._bShowRocks) {
         for (var i = 0; i < aCategory.length; i++) {
             aCategory[i].render(ctx);
         }
     }
   }
    // NB: Remember to implement the ._bShowRocks toggle!
    // (Either here, or if you prefer, in the Rock objects)

}

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();
