/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)
_entities : new Map(),

// "PRIVATE" METHODS
//

_findNearestEntity : function(posX, posY) {   
    var minLength = util.square(posX) + util.square(posY),
        newLength, closestEntity = null;

	this._entities.forEach(function(value, key) {			
		let ent = value;
		
		newLength = util.distSq(posX, posY,
						ent.cx, ent.cy);
 
		if (newLength > 0 && newLength < minLength) {				
			minLength = newLength;
			closestEntity = ent;						
		}		
	});		
		
	return closestEntity;		
},

// Finds the enemies to bomb.
_bombEnemy : function(){	
	this._entities.forEach(function(value, key) {		
		if(value.name === "Enemy"){			
			value.isBombed = true;
		}		
	});
},

// PUBLIC METHODS
//
getNewSpatialID : function() {
   return this._nextSpatialID++;
},

// Registering an entity.
register: function(entity) {
	let id = entity.getSpatialID();	
	this._entities.set(id, entity);		
},

// Unregistering an entity.
unregister: function(entity) {	
	let id = entity.getSpatialID();	
	this._entities.delete(id);	
},

findEntityInRange: function(target, posX, posY, radius) {		
	let nearest = this._findNearestEntity(posX, posY);	
	
	if(nearest != null){
		if(nearest.name === target){
			return nearest;
		}
	}	
},

findEnemyToBomb: function(){
	this._bombEnemy();
},

// Unused, but is here if needed.
update: function(du){
},

render: function(ctx) {	   
	var oldStyle = ctx.strokeStyle;
	ctx.strokeStyle = "red";
		
	this._entities.forEach(function(value, key) {	
		let e = value;
		util.strokeCircle(ctx, e.getPos().posX, e.getPos().posY, e.getRadius());		
	});	
    
	ctx.strokeStyle = oldStyle;		
}

}
