const pathResolver = require('path') ;

/**
 * @exports Function - resolve the client root directory
 */
module.exports = function( __DIR__ ) {

    __DIR__ = typeof __DIR__ === "string" ? __DIR__ : __dirname ;

    if( !pathResolver.isAbsolute( __DIR__ ) ) {

        throw RangeError("arg1 should be an absolute path") ;
    }

    if( __DIR__.indexOf('node_modules') === -1 ) {
        // dev use
        return null ;
    }

    let found = false ;

    return __DIR__.split('\\').join('/').split('/') // normalize separator
        .filter( URI => {

            if( found ) return false ;

            if( /node\_modules/i.test( URI ) ) {

                found = true ;
                return false ;
            }

            return true ;

        } ).join('/') ;
    ;
} ;