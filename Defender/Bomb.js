// A class for the bombs.
// A bomb kills all the enemies in one hit.
function Bomb(descr){
	for(let property in descr){
		this[property] = descr[property];
	}
	
	this.setup();
	this.bombs = 0;
	this.bombUsed = false;
	this.scale = 1;
	this.closeEntity = null; // A container for the entity which is close.
	spatialManager.register(this);	
}

Bomb.prototype = new Entity();

Bomb.prototype.KEY_BOMB = 'B'.charCodeAt(0);

Bomb.prototype.update = function(du){
	if(eatKey(this.KEY_BOMB)){
		if(this.bombs < 3){
			this.bombTarget();	
			this.bombs++;
			spatialManager.unregister(this);
			return entityManager.KILL_ME_NOW;
		}		
	}
};

Bomb.prototype.render = function(ctx){	
	g_sprites.bombs.drawCentredAt(ctx, this.cx, this.cy, 0, this.scale);
};