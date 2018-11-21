"use strict";
var g_toggleAudio = true;

var KEY_AUDIO = keyCode('M');
var KEY_K = keyCode('K');

var gameManager = {

	startScreen : 0,
	gameScreen : 1,
	controlScreen : 2,
	gamelost : 3,
	score : 0,
	position : 0,
	gameOver : false,
	startUp : true,
	startUpSound : new Audio("Sounds/startSound.wav"),

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
		else if(this.position === this.gamelost){
			this._renderGameWonScreen(ctx);
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
		else if(this.position === this.gamelost){
			this._updateGameWonScreen(ctx);
		}
	},

	toggleAudio: function () {
		if (eatKey(KEY_AUDIO)) g_toggleAudio = !g_toggleAudio;
	},

	_renderStartScreen :function(ctx){
		g_sprites.defender.drawCentred(ctx,g_canvas.width/2,g_canvas.height/2,0);
		g_sprites.play.drawCentred(ctx,g_canvas.width/2,320,0);
		g_sprites.control.drawCentred(ctx,g_canvas.width/2,350,0);
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

	_renderScore: function(){
		util.drawLetters(ctx, this.score, "end", g_canvas.width-10, 30);
	},


	_renderGameWonScreen: function(du){
		g_sprites.gameOver.drawCentred(ctx,g_canvas.width/2,g_canvas.height/2,0);
		util.drawLetters(ctx,"Your Score is: "+ this.score,"end",g_canvas.width/2+100, 30)
		g_sprites.playAgain.drawCentred(ctx,g_canvas.width/2,400,0);
		g_sprites.playAgain.image = g_images.playAgain;
		if(this._isMouseOver(g_sprites.playAgain)){
			g_sprites.playAgain.image = g_images.playAgain1;
			if(g_mouseButton){
				this.reset();
				this.score = 0;
				this.position = this.startScreen;
			}
		}
	},

	_updateGameWonScreen: function(du){

	},

	_renderGameScreen :function(ctx){
		Background1.render(ctx);
		entityManager.render(ctx);
		this._renderScore();
	},

	_updateGameScreen: function(du){
		if(this.startUp) {
			util.playAudio(this.startUpSound);
			this.startUp = false;
		}
		Background1.update(du);
	    processDiagnostics();
		entityManager.update(du);
		eatKey(Ship.prototype.KEY_FIRE);
	    if(this.gameOver){
	    	console.log("gamelost");
			this.position = this.gamelost;
	    }
	},


	_renderControlScreen :function(ctx){
		g_sprites.menu.drawCentred(ctx,g_canvas.width/2,g_canvas.height/2);
		g_sprites.back.drawCentred(ctx,g_canvas.width/2,470);

		g_sprites.back.image = g_images.back;
		if(this._isMouseOver(g_sprites.back)){
			g_sprites.back.image = g_images.back_active;
			if(g_mouseButton) this.position = 0;
		}
	},

	_updateControlScreen: function(du){

	},
	reset: function(du){
		this.gameOver = false;
		entityManager.init();
		entityManager.resetGame();
	},
}
