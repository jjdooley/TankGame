const PIXI = require( 'pixi.js' );
const Survivor = require( './survivor' );
const Bullettracker = require( './bullettracker' );
const EventEmitter = require( 'events' ).EventEmitter;
const Mapmaker = require('./map')

module.exports = class Game extends EventEmitter{
        constructor( element ) {
            super();
            this._element = element;
            this.survivors = [];
            this.stage = new PIXI.Container();
            this.renderer = PIXI.autoDetectRenderer( window.innerWidth, window.innerHeight, {transparent: true}, false );
            this._element.appendChild( this.renderer.view );
            this._lastFrameTime = 0;
            this.bullettracker = new Bullettracker( this, 200 );
            this.terrain = new Mapmaker(this);
            global.ds.event.listen( 'status/.*', this._playerOnlineStatusChanged.bind( this ) );
            requestAnimationFrame( this._tick.bind( this ) );
        }
        _playerOnlineStatusChanged( match, isSubscribed ) {
            var name = match.replace( 'status/', '' );
    
            if( isSubscribed ) {
                this.addPlayer( name );
            } else {
                this.removePlayer( name );
            }
        }
    

        addPlayer( name ) {
            var x = this.renderer.width * ( 0.1 + Math.random() * 0.8 );
            var y = this.renderer.height * ( 0.1 + Math.random() * 0.8 );
            this.survivors.push( new Survivor( this, x, y, name ) );
        }
        
        removePlayer( name ) {
            for( var i = 0; i < this.survivors.length; i++ ) {
                if( this.survivors[i].name === name ) {
                    this.survivors[i].remove();
                    this.survivors.splice( i, 1 );
                }
            }
        }
        _tick( currentTime ) {
            this.emit( 'update', currentTime - this._lastFrameTime, currentTime );
            this._lastFrameTime = currentTime;
            this.renderer.render( this.stage );
            requestAnimationFrame( this._tick.bind( this ) );
        }
    }