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

_entities : [],

// "PRIVATE" METHODS
//
_registeredEntities : function(entity, id){	
	let indx = id - 1;
	let ent = entity;
	
	if(ent != null){
		this._entities.push(ent);		
		return;
	}
	
	return{
		thisEntity : this._entities[indx],
		thisIndex : indx
	};
},


// PUBLIC METHODS
//
getNewSpatialID : function() {
   return this._nextSpatialID++;
},

register: function(entity) {
    var pos = entity.getPos();	
    var spatialID = entity.getSpatialID(); 	
	
	this._registeredEntities(entity, spatialID);
},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();
	delete this._entities[spatialID];
},

findEntityInRange: function(posX, posY, radius) {	

	
	
},

render: function(ctx) {
	
    if(g_renderSpatialDebug){		
		var oldStyle = ctx.strokeStyle;
		ctx.strokeStyle = "red";
    
		for(let id in this._entities){
			let e = this._entities[id];
			let ent = this._registeredEntities(null, e.getSpatialID()).thisEntity;
			
			util.strokeCircle(ctx, ent.getPos().posX, ent.getPos().posY, ent.getRadius());
		}
    
		ctx.strokeStyle = oldStyle;
	}	
}

}
