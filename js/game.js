class Game{ 
    constructor( element ) { 
        this.stage = new PIXI.Container(); 
        this.renderer = PIXI.autoDetectRenderer(
            window.innerWidth, 
            window.innerHeight, 
            {transparent: true}, 
            false 
        ); 
        element.appendChild( this.renderer.view ); 
    }

    _tick() { 
        this.renderer.render( this.stage ); 
        requestAnimationFrame( this._tick.bind( this ) ); 
    }
}

