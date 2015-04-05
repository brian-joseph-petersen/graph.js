var prototypeof = {
    Number: function ( object ) {
        return ( Object.prototype.toString.call( object ) === "[object Number]" );
    },
    String: function ( object ) {
        return ( Object.prototype.toString.call( object ) === "[object String]" );
    },
    Array: function ( object ) {
        return ( Object.prototype.toString.call( object ) === "[object Array]" );
    }
};