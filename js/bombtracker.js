const PIXI = require( 'pixi.js' );
const SPEED = 5;

module.exports = class Missletracker{
	constructor( game, initialMissles ) {
		this._game = game;
		this._game.on('update', this._update.bind( this ) );
		this._activeMissles = [];
		this._passiveMissles = [];
		this._texture = PIXI.Texture.fromImage('/img/bullet.png');
		for( var i = 0; i < initialMissles;i++) {
			this._createMissle();
		}
	}

	add( x, y,alpha,survivor ) {
		if( this._passiveMissles.length === 0 ) {
			this._createMissle();
		}

		var missle = this._passiveMissles.pop();
		missle.tint = survivor.tint;
		missle.position.x = x;
		missle.position.y = y;
		missle.rotation = alpha;
		missle.source = survivor;
		this._activeMissles.push( missle );
	}

	_update() {
		var missle;

		for( var i = 0; i < this._activeMissles.length; i++ ) {
			missle = this._activeMissles[i];
			missle.position.x += Math.sin(missle.rotation) * SPEED;
			missle.position.y -= Math.cos(missle.rotation) * SPEED;

			if(
				Missle.position.x < 0 ||
				Missle.position.x > this._game.renderer.width ||
				Missle.position.y < 0 ||
				Missle.position.y > this._game.renderer.height
			) {
				// Missle has left the stage, time to recycle it
				this._recycleMissle( Missle, i );
			} else {
				// Missle is still on stage, let's perform hit detection
				for( var s = 0; s < this._game.survivors.length; s++ ) {
					if( this._game.survivors[ s ] === Missle.source ) {
						continue;
					}
					if( this._game.survivors[ s ].checkHit( Missle.position ) ) {
						this._recycleMissle( Missle, i );
						continue;
					}
				}
			}
		}
	}

	_recycleMissle( Missle, i ) {
		Missle.position.x = -50;
		Missle.position.y = -50;
		Missle.rotation = 0;
		Missle.source = null;
		this._activeMissles.splice( i, 1 );
		this._passiveMissles.push( Missle );
	}

	_createMissle() {
		var Missle = new PIXI.Sprite( this._texture );
		Missle.position.x = -50;
		Missle.position.y = -50;
		Missle.anchor.x = 0.5;
		Missle.anchor.y = 0.5;
        Missle.rotation = 0;
        
		this._passiveMissles.push( Missle );
		this._game.stage.addChild( Missle );
	}
}