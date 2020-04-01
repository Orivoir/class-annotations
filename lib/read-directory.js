const pathResolver = require('path') ;
const fs = require('fs') ;

class ReadDirectory {

    constructor( pathDirectory ) {

        this.pathDirectory = pathDirectory ;

        this.isDirectory = true;
        this.isFile = false;

        this.items = fs.readdirSync( this.pathDirectory ) ;

        this.ClassAnnotations = require('./../class-annotations')( pathDirectory ) ;

        this.items.forEach( itemName => {

            this[ itemName ] = new this.ClassAnnotations( itemName ) ;

            if( this[ itemName ][ itemName ] ) {

                this[ itemName ] = this[ itemName ][ itemName ]
            }

        } ) ;

        this.clearOutput() ;
    }

    clearOutput() {

        this.items ;
        delete this.ClassAnnotations ;
        delete this.pathDirectory ;
    }

} ;

module.exports = ReadDirectory ;