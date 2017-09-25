function Launcher () {
	this._record = null;
	this._radius = null;
	this._cX = null;
	this._cY = null;
	this._activeType = ''
	this._launcher = $( '.launcher');
	this._area = this._launcher.find( '.area' );
	this._angleIndicator = this._launcher.find( '.angle-indicator' );
	this._area.on( 'touchstart mousedown', this._onStart.bind( this ) );
	this._area.on( 'mousedown mousemove', this._onMouse.bind( this ) );
	this._area.on( 'touchstart touchmove', this._onTouch.bind( this ) );
	this._area.on( 'mouseup touchend', this._onEnd.bind( this ) );
}

Launcher.prototype.setRecord = function( record ) {
	this._record = record;
	// the record is not updating when setPosition is called.
}

Launcher.prototype.setSize = function() {
	var width = this._launcher.width();
	var height = this._launcher.height();
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

Launcher.prototype._onStart = function ( event ) {
    event.preventDefault();
	this._record.set( this._activeType, true );
}

Launcher.prototype._onEnd = function() {
	this._record.set( this._activeType, false );
}