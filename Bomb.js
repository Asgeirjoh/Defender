
function Bomb(descr){
	for(let property in descr){
		this[property] = descr[property];
	}
	
	this.setup();
	this.bombs = descr.bombCount;
	this.bombUsed = false;
	this.scale = 1;
	this.closeEntity = null; // A container for the entity which is close.
	spatialManager.register(this);	
}

Bomb.prototype = new Entity();

Bomb.prototype.smartBombs = 3;
Bomb.prototype.KEY_BOMB = 'B'.charCodeAt(0);

Bomb.prototype.useBomb = function(){

	if(this.bombs > 0){
		if(eatKey(this.KEY_BOMB)){
			this.bombTarget();	
			this.bombs--;
			this.bombUsed = true;		
		}
	}
};

Bomb.prototype.update = function(du){
	this.useBomb();	
};

Bomb.prototype.render = function(ctx){
	if(this.bombUsed){
		ctx.globalAlpha = 0;		
	}	

	g_sprites.bombs.drawCentredAt(ctx, this.cx, this.cy, 0, this.scale);
	ctx.globalAlpha = 1;
};