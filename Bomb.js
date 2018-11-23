
function Bomb(descr){
	for(let property in descr){
		this[property] = descr[property];
	}
	
	this.setup();
	
	this.isBombing = false;
	this.scale = 1;
	this.closeEntity = null; // A container for the entity which is close.
	spatialManager.register(this);
}

Bomb.prototype = new Entity();

Bomb.prototype.smartBombs = 3;
Bomb.prototype.KEY_BOMB = 'B'.charCodeAt(0);

Bomb.prototype.useBomb = function(){

	
	
	if(!this.isBombing){
		//return 0;
	}

	// If there is no entity in the container
	// then add one.	
	if(this.closeEntity == null){
		this.closeEntity = this.findTarget(this.target);
	}	
	
	// If the entity in the closeEntity container
	// happens to be undefined or a bullet then empty the
	// container and start over.
	if(this.closeEntity == undefined){
		this.closeEntity = null;
		
		return 0;
	}	
		
	let canTakeHit = this.closeEntity.takeBulletHit;	
	
	if (canTakeHit){			
		canTakeHit.call(this.closeEntity);	
		spatialManager.unregister(this);
		return entityManager.KILL_ME_NOW;
	}
};

Bomb.prototype.update = function(du){
	//this.useBomb();	

if(keys[this.KEY_BOMB]){
		this.isBombing = true;
		console.log("FDFD");
	}	
};

Bomb.prototype.render = function(ctx){
	g_sprites.bombs.drawCentredAt(ctx, this.cx, this.cy, 0, this.scale);
};