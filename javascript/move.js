$( document ).ready(
	function()
	{
		var last_position = { x: 0, y: 0, time: new Date().getTime() };
		var screen = { width: $( window ).width(), height: $( window ).height() };
		var left_page = false;
		
		$( window ).resize( resized );
		$( window ).mousemove( mouseMoved );
		
		resized();
		
		function resized()
		{
			screen = { width: $( window ).width(), height: $( window ).height() };
			
			$( 'h1 ')
				.width( screen.width )
				.height( screen.height )
				.css( { visibility: 'hidden' } );
			
			$( 'p' )
				.css( { top: ( screen.height - $( 'p' ).height() ) / 2, left: ( screen.width - $( 'p' ).width() ) / 2 } );
		}

		function mouseMoved( $event )
		{		
			if(
				dist( { x: $event.pageX, y: $event.pageY }, last_position ) > 1 &&
				! ( last_position.x === 0 && last_position.y === 0 ) &&
				! left_page &&
				 new Date().getTime() - last_position.time < 200
			)
			{
				var speed = { x: $event.pageX - last_position.x, y: $event.pageY - last_position.y };
				
				if(
					$event.pageX + speed.x <= 0 ||
					$event.pageX + speed.x >= screen.width
				)
				{				
					out();
				}
				
				if(
					$event.pageY + speed.y <= 0 ||
					$event.pageY + speed.y >= screen.height
				)
				{
					out();
				}
			}

			else
			{
				if( left_page )
				{
					left_page = false;
				}
			}

			last_position = { x: $event.pageX, y: $event.pageY, time: new Date().getTime() };
		}
		
		function out()
		{
			if( ! left_page )
			{
				$( 'h1' )
					.stop()
					.css( { visibility: 'visible', opacity: 1 } )
					.animate( { opacity: 0 }, 1000, function(){ $( 'h1' ).css( { visibility: 'hidden' } ); } );
				
				left_page = true;
			}
		}

		function dist( $point_1, $point_2 )
		{
			var xs = 0;
			var ys = 0;
			
			xs = $point_2.x - $point_1.x;
			xs = xs * xs;
			
			ys = $point_2.y - $point_1.y;
			ys = ys * ys;
			
			return Math.sqrt( xs + ys );
		}
	}
)