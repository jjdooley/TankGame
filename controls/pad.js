function Pad ( type ) {
	this._record = null;
	this._radius = null;
	this._directionCompass = [((3*Math.PI)/2), 0, (Math.PI/2), Math.PI ]
	this._cX = null;
	this._cY = null;
	this._rotationType = (type === 'move' ? 'body' : 'gun' ) + 'Rotation';
	this._activeType = type === 'move' ? 'moving' : 'shooting';
	this._pad = $( '.pad.' + type );
	this._area = this._pad.find( '.area' );
	this._area.on( 'touchstart mousedown', this._onStart.bind( this ) );
	this._area.on( 'mousedown mousemove', this._onMouse.bind( this ) );
	this._area.on( 'touchstart touchmove', this._onTouch.bind( this ) );
	this._area.on( 'mouseup touchend', this._onEnd.bind( this ) );
}

Pad.prototype.setRecord = function( record ) {
	this._record = record;
	// the record is not updating when setPosition is called.
}

Pad.prototype.setSize = function() {
	var width = this._pad.width();
	var height = this._pad.height();
	var circumference = Math.min( width, height ) - 40;

	this._area.css({
		width: circumference,
		height: circumference,
		marginTop: ( height - circumference ) / 2
	});

	this._radius = circumference / 2;
	this._cX = this._area.offset().left + this._radius;
	this._cY = this._area.offset().top + this._radius;
}

Pad.prototype._onStart = function ( event ) {
	event.preventDefault();
	this._record.set( this._activeType, true );
}

Pad.prototype._onMouse = function ( event ) {
	this._setAngle( this._radius, this._radius, event.offsetX, event.offsetY );
}

Pad.prototype._onTouch = function ( event ) {
	event.preventDefault();
	var touch = event.targetTouches[ 0 ];

	if( touch ) {
		this._setAngle( this._cX, this._cY, touch.clientX, touch.clientY );
	}
}

Pad.prototype._setAngle = function ( cX, cY, pX, pY ) {
	var angle =  Math.PI / 2 + Math.atan2( pY - cY, pX - cX );
	console.log(this._rotationType)
	this._record.set( this._rotationType, angle );
}

Pad.prototype._onEnd = function() {
	this._record.set( this._activeType, false );
}