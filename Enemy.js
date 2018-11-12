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
	
	this.setup(descr);
}

Enemy.prototype = new Entity();

Enemy.prototype.update = function(du){

}

Enemy.prototype.render = function(ctx){
	let scale = 1;


}