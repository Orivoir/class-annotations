const pathResolver = require('path') ;
const fs = require('fs') ;

class ReadDirectory {

    constructor( pathDirectory ) {

        this.pathDirectory = pathDirectory ;

        this.items = fs.readdirSync( this.pathDirectory ) ;

        this.ClassAnnotations = require('./../class-annotations')( pathDirectory ) ;

        this.items.forEach( itemName => {

            this[ itemName ] = new this.ClassAnnotations( itemName ) ;
        } ) ;

        this.clearOutput() ;
    }

    clearOutput() {

        delete this.items ;
        delete this.ClassAnnotations ;
        delete this.pathDirectory ;
    }

} ;

module.exports = ReadDirectory ;