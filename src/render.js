window.Graph.prototype.render = function () {
    var canvas = document.createElement( "canvas" );
    if ( !canvas.toDataURL ) return;
    var dataset = this.get.dataset();
    if ( !dataset.length ) return;
    var h, w, x, y, z;
    var data, index, len;
    var top, bottom, ceiling, floor, img, render;
    var axis = {}, base = {}, grid = {}, value = {};
    var width = this.get.width();
    var height = this.get.height();
    var color = this.get.color();
    var symbol = this.get.symbol();
    var label = this.get.label();
    var max = this.get.max();
    var min = this.get.min();
    var interval = this.get.interval();
    var margin = 36;
    var padding = 4;
    var stroke = 2;
    var large = 12;
    var small = 10;
    var font = "sans-serif";
    var white = "#FFFFFF";
    var silver = "#C0C0C0";
    var nero = "#252525";
    canvas.width = width;
    canvas.height = height;
    render = canvas.getContext( "2d" );
    render.fillStyle = white;
    render.fillRect( 0, 0, width, height );
    render.fillStyle = nero;
    render.strokeStyle = nero;
    render.lineWidth = stroke;
    render.font = ( "bold " + large + "px " + font );
    render.textAlign = "center";
    // set floor
    if ( min % interval ) {
        if ( min < 0 ) floor = ( ~~( ( min - interval ) / interval ) * interval );
        else floor = ( ~~( ( min + interval ) / interval ) * interval );
    } else floor = min;
    // set ceiling
    ceiling = ( max % interval ) ? ( ~~( ( max + interval ) / interval ) * interval ) : max;
    // set axes
    axis.x = ( dataset[0].length - 1 );
    axis.y = ( (-floor) + ceiling );
    // set base and grid
    base.x = ( margin + margin + padding + padding );
    base.y = ( height - margin );
    grid.x = ( width - margin - margin - stroke - padding - padding - padding - padding - stroke - margin - margin );
    grid.y = ( height - margin - margin );
    // grid scaling
    value.x = function ( n ) { return ( n === 0 ) ? n : ( ( n / axis.x ) * grid.x ); };
    value.y = function ( n ) { return ( n === 0 ) ? n : ( ( n / axis.y ) * grid.y ); };
    // set top and bottom position
    top = ( margin - large );
    bottom = round( base.y + padding + padding + small );
    // render x-axis stroke
    render.beginPath();
    x = ( base.x - padding - padding - ( stroke * 0.5 ) );
    y = round( base.y - ( stroke * 0.5 ) );
    render.moveTo( x, y );
    x = ( base.x + grid.x + padding + padding + ( stroke * 0.5 ) );
    render.lineTo( x, y );
    render.stroke();
    render.closePath();
    // render top and bottom title
    x = ( width * 0.5 );
    render.fillText( this.get.titleTop(), x, top );
    render.fillText( this.get.titleBottom(), x, bottom );
    // render left title
    x = ( margin - large );
    y = ( margin + ( grid.y * 0.5 ) );
    render.save();
    render.translate( x, y );
    render.rotate( (-Math.PI) * 0.5 );
    render.fillText( this.get.titleLeft(), 0, 0 );
    render.restore();
    // render interval stroke
    x = ( margin + margin );
    y = round( base.y - grid.y );
    render.beginPath();
    render.moveTo( x, y );
    y = round( base.y );
    render.lineTo( x, y );
    render.stroke();
    render.closePath();
    // adjust y-axis
    grid.y -= ( small + small );
    base.y += ( value.y( floor ) - small );
    // adjust font-size
    render.font = ( small + "px " + font );
    // render interval text
    x = ( margin + margin - padding - padding );
    y = round( base.y - grid.y );
    render.textAlign = "right";
    for ( z = floor; z <= ceiling; z += interval ) {
        y = round( base.y - value.y( z ) );
        render.fillText( z, x, y );
    } render.textAlign = "center";
    // render horizontal grid
    render.setLineDash( [ 5, 5 ] );
    render.strokeStyle = silver;
    for ( z = ( floor + interval ); z <= ceiling; z += interval ) {
        render.beginPath();
        x = base.x;
        y = round( base.y - value.y( z ) );
        render.moveTo( x, y );
        x = ( base.x + grid.x );
        render.lineTo( x, y );
        render.stroke();
        render.closePath();
    } render.setLineDash( [] );
    render.strokeStyle = nero;
    // render label text
    for ( index = 0, len = label.length; index < len; index++ ) {
        if ( !prototypeof.String( label[index] ) ) continue;
        x = round( base.x + value.x( index ) );
        render.fillText( label[index], x, bottom );
    }
    // graph data
    x = []; y = [];
    for ( index = 0, len = dataset.length; index < len; index++ ) {
        render.strokeStyle = color[index] || nero;
        for ( z = 0, data = dataset[index].length; z < data; z++ ) {
            x[0] = round( base.x + value.x( z ) );
            y[0] = round( base.y - value.y( dataset[index][z] ) );
            if ( ( z + 1 ) < data ) {
                x[1] = round( base.x + value.x( z + 1 ) );
                y[1] = round( base.y - value.y( dataset[index][( z + 1 )] ) );
                render.beginPath();
                render.moveTo( x[0], y[0] );
                render.lineTo( x[1], y[1] );
                render.stroke();
                render.closePath();
            } render.fillStyle = color[index] || nero;
            switch ( symbol[index] ) {
                case ( "circle" ):
                    render.beginPath();
                    render.arc( x[0], y[0], padding, 0, 360 );
                    render.fill();
                    render.closePath();
                    render.fillStyle = white;
                    render.beginPath();
                    render.arc( x[0], y[0], round( padding * 0.5 ), 0, 360 );
                    render.fill();
                    render.closePath();
                break;
                case ( "square" ):
                    x[2] = ( x[0] - padding );
                    y[2] = ( y[0] - padding );
                    w = h = ( padding * 2 );
                    render.fillRect( x[2], y[2], w, h );
                    render.fillStyle = white;
                    x[2] = ( x[0] - round( padding * 0.5 ) );
                    y[2] = ( y[0] - round( padding * 0.5 ) );
                    w = h = padding;
                    render.fillRect( x[2], y[2], w, h );
                break;
                case ( "triangle" ):
                    render.fillStyle = white;
                    render.beginPath();
                    x[2] = x[0];
                    y[2] = ( y[0] - padding );
                    render.moveTo( x[2], y[2] );
                    x[2] -= padding;
                    y[2] += round( padding * 1.75 );
                    render.lineTo( x[2], y[2] );
                    x[2] += ( padding + padding );
                    render.lineTo( x[2], y[2] );
                    x[2] -= padding;
                    y[2] -= round( padding * 1.75 );
                    render.lineTo( x[2], y[2] );
                    render.fill();
                    render.stroke();
                    render.closePath();
                break;
            }
        }
    }
    img = document.createElement( "img" );
    img.src = canvas.toDataURL( "image/png" );
    return img;
};