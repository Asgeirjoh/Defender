"use strict";

var gameManager = {

	startScreen : 0,
	gameScreen : 1,
	controlScreen: 2,
	position: 0,

	renderScreen: function(ctx){
		if(this.position === this.startScreen){
			this._renderStartScreen(ctx);
		}
		else if(this.position === this.gameScreen){
			this._renderGameScreen(ctx);
		}
		else if(this.position === this.controlScreen){
			this._renderControlScreen(ctx);
		}
	},

	updateScreen: function(du){
		if(this.position === this.startScreen){
			this._updateStartScreen(du);
		}
		else if(this.position === this.gameScreen){
			this._updateGameScreen(du);
		}
		else if (this.position === this.controlScreen){
			this._updateControlScreen(du);
		}
	},

	_renderStartScreen :function(ctx){
		g_sprites.defender.drawCentred(ctx,g_canvas.width/2,g_canvas.height/2,0);
		g_sprites.play.drawCentred(ctx,g_canvas.width/2,280,0);
		g_sprites.control.drawCentred(ctx,g_canvas.width/2,310,0);
	},

	_updateStartScreen: function(ctx)	{
		g_sprites.play.image = g_images.play;
		g_sprites.control.image = g_images.control;
		if(this._isMouseOver(g_sprites.play)){
			g_sprites.play.image = g_images.play1;
			if(g_mouseButton) {
				this.position = this.gameScreen;
				entityManager.init();
			}
		}
		else if(this._isMouseOver(g_sprites.control)){
			g_sprites.control.image = g_images.controls_active;
			if(g_mouseButton) this.position = this.controlScreen;
		}
	},

	_isMouseOver: function(sprite){
		if(util.isBetween(g_mouseX, sprite.x-sprite.width/2, sprite.x+sprite.width/2) &&
			util.isBetween(g_mouseY, sprite.y-sprite.height/2, sprite.y+sprite.height/2)){
				return true;
		}
		return false;
	},

	_renderGameScreen :function(ctx){
		Background1.render(ctx);
		entityManager.render(ctx);
	},

	_updateGameScreen: function(du){
	    processDiagnostics();
		entityManager.update(du);
		eatKey(Ship.prototype.KEY_FIRE);
	},


	_renderControlScreen :function(ctx){
		g_sprites.menu.drawCentred(ctx,g_canvas.width/2,g_canvas.height/2);
		g_sprites.back.drawCentred(ctx,400,380);

		g_sprites.back.image = g_images.back;
		if(this._isMouseOver(g_sprites.back)){
			g_sprites.back.image = g_images.back_active;
			if(g_mouseButton) this.position = 0;
		}
	},

	_updateControlScreen: function(du){

	},
	reset: function(du){
		entityManager.init();
	},
}