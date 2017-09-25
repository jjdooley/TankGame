const PIXI = require('pixi.js')

module.exports = class Mapmaker{
	constructor( game ) {
		this._game = game;
		this._game.on('update', this._update.bind( this ) );
        this._collisionObjects = [];
        this._coordinates = [];
		this._texture = PIXI.Texture.fromImage('/img/treeLarge.png');
		for( var i = 0; i < 10 ;i++) {
			this._createWall();
		}
	}


	_update() {
		
	}

	_createWall() {
        var wall = new PIXI.Sprite( this._texture );
        console.log(this._game)
		wall.position.x = Math.random() * this._game.renderer.width;
		wall.position.y = Math.random() * this._game.renderer.height;
		wall.anchor.x = 0.5;
		wall.anchor.y = 0.5;
        wall.rotation = 0;
        this._coordinates.push([wall.position.x, wall.position.y])
		this._collisionObjects.push( wall );
		this._game.stage.addChild( wall );
	}
}