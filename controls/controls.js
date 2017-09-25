
$(function() {
	var DEEPSTREAM_URL = 'localhost:6020';
	var name;
	var recordName;
	var moveArea;
	var shootArea;
	var connectionIndicator;
	var ds;
    var isFullScreen = false;
    
	function joinGame() {
		name = $( 'input#name' ).val();
		recordName = 'player/' + name;
		console.log("name:", ds)
		ds.record.getRecord( recordName ).whenReady(function( record ) {
			record.set({
				name: name,
				moving: false,
				shooting: false,
				launch: false,
				detonate: false,
				bodyRotation: 0,
				turretRotation: 0
			});

			record.once( 'delete',  function() {
				$( '.overlay' ).addClass( 'game-over' ).fadeIn( 300 );
				$( '#game-over button' ).one( 'touch click', joinGame );
				ds.event.unsubscribe( 'status/' + name );
			});

			ds.event.subscribe( 'status/' + name, function(name){
				console.log(name)
			});

			moveArea.setRecord( record );

			shootArea.setRecord( record );

			$( '.overlay' ).removeClass( 'game-over' ).fadeOut( 500 );
		});
    }
    
	function startApp() {
		moveArea = new Pad( 'move' );
		shootArea = new Pad( 'shoot' );
        // launcher = new Launcher();
        
		function setSize() {
			moveArea.setSize();
			shootArea.setSize();
			// connectionIndicator.height( connectionIndicator.width() + 5 );
        }
        
        $( window ).resize( setSize );
        
        setSize();
        
		$('#enter-name').submit( function( event ) {
			event.preventDefault();
			joinGame();
		});
    }
    
	$( '.fullscreen-toggle' ).on( 'click touch', function(){
		var el,fn;

		if( isFullScreen ) {
			el = document;
			fn = el.exitFullscreen || el.mozCancelFullScreen || el.webkitExitFullscreen;
		} else {
			el = document.documentElement;
			fn = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen;
        }
        
        isFullScreen = !isFullScreen;
        
		fn.call(el);
    });
    
    ds = deepstream( DEEPSTREAM_URL ).login({},  startApp );
    
	// ds.on( 'connectionStateChanged', function( connectionState ){

	// 	var cssClass;

	// 	if( connectionState === 'ERROR' || connectionState === 'CLOSED' ) {

    //         cssClass = 'red';
            
    //     }   else if ( connectionState === 'OPEN' ) {

    //         cssClass = 'green';
            
    //     }   else {

    //         cssClass = 'yellow';
            
	// 	}

	// 	$( '.connection-indicator' ).removeClass( 'red yellow green' ).addClass( cssClass );
	// });
});