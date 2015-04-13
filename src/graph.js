window.Graph = function ( width, height ) {
    if ( this instanceof window.Graph === false ) return new window.Graph( width, height );
    if ( !prototypeof.Number( width ) || !prototypeof.Number( height ) ) return;
    var dataset = [];
    var color = [];
    var symbol = [];
    var label = [];
    var index = -1;
    var max = 0;
    var min = 0;
    var interval = 10;
    var titleTop = "";
    var titleLeft = "";
    var titleBottom = "";
    this.get = {
        width: function () { return width; },
        height: function () { return height; },
        dataset: function () { return dataset; },
        color: function () { return color; },
        symbol: function () { return symbol; },
        label: function () { return label; },
        max: function () { return max; },
        min: function () { return min; },
        interval: function () { return interval; },
        titleTop: function () { return titleTop; },
        titleLeft: function () { return titleLeft; },
        titleBottom: function () { return titleBottom; }
    };
    this.set = {
        color: function ( string ) { prototypeof.String( string ) && ( string !== "" ) && ( color[index] = string ); },
        symbol: function ( string ) { prototypeof.String( string ) && ( string !== "" ) && ( symbol[index] = string ); },
        label: function ( sequence ) { prototypeof.Array( sequence ) && sequence.length && ( label = sequence ); },
        interval: function ( number ) { prototypeof.Number( number ) && ( number > 0 ) && ( interval = number ); },
        titleTop: function ( string ) { prototypeof.String( string ) && ( titleTop = string ); },
        titleLeft: function ( string ) { prototypeof.String( string ) && ( titleLeft = string ); },
        titleBottom: function ( string ) { prototypeof.String( string ) && ( titleBottom = string ); }
    };
    this.plot = function ( data ) {
        if ( !prototypeof.Array( data ) ) return;
        if ( !data.length ) return;
        for ( var i = 0, len = data.length; i < len; i++ ) { if ( !prototypeof.Number( data[i] ) ) return; }
        max = Math.max.apply( Math, data.concat( max ) );
        min = Math.min.apply( Math, data.concat( min ) );
        dataset.push( data );
        color.push( null );
        symbol.push( null );
        index++;
    };
};