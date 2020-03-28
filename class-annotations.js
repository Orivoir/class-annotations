const pathResolver = require('path') ;
const fs = require('fs') ;
const ReaderAnnotations = require('./lib/reader-annotations') ;

class ClassAnnotation {

    // marker of class keywords
    static detectorClass = "<0x01023658956587452455269552224021255888520__CLASS__DETECTOR__01023658956587452455269552224021255888520>" ;

    static __DIR__ = null ;

    constructor( pathFile ) {

        this.pathFile = pathFile ;

        this.contentFile = fs.readFileSync(
            pathResolver.join( this._pathFile ) , 'utf-8'
        ) ;

        this.readers = {} ;

        if( this.contentFile.indexOf('/**') !== -1 ) {

            this.countClassDefine ; // product "this.countClass" and "this.classIndex"
            this.isolatePartial ; // product "this.partials"

            this
                .filterPartial()
                .instancesReaders()
            ;

        }

        this.cleanOutput() ;
    }

    instancesReaders() {

        this.partials.forEach( partial => (

            partial.isLastLine && partial.isOpened ?
            this.readers[ partial.classname ] = {
                classname: partial.classname ,
                annotations: new ReaderAnnotations(
                    partial.lines
                ) ,
                get data() {

                    return this.annotations.data ;
                }
            }
            : null
        ) ) ;

        return this ;
    }

    filterPartial() {

        this.partials.forEach( partial => (
            partial.isLastLine ?
            this.checkOpenedAnnotation( partial )
            : null
        ) ) ;

        return this ;
    }

    get pathFile() {

        return this._pathFile ;
    }
    set pathFile( pathFile ) {

        if( pathResolver.isAbsolute( pathFile ) ) {

            this._pathFile = pathFile ;
        } else {

            this._pathFile = pathResolver.join( ClassAnnotation.__DIR__ , pathFile ) ;
        }
    }

    cleanOutput() {

        delete this.partials ;
        delete this.isAlreadyCount ;
        delete this.classIndex ;
        delete this.contentFile ;

        return this ;
    }

    checkOpenedAnnotation( partial ) {

        const lines = partial.lines ;

        let i = ( lines.length - 1 ) ;

        let isFoundOpened = false ;

        while(
            !isFoundOpened &&
            i > 0
        ) {

            const currentLine = lines[ i ] ;

            if( currentLine.indexOf('/**') != -1 ) {

                isFoundOpened = true ;
                partial.isOpened = true ;
                partial.lines = partial.lines.slice( i ,  ) ;
            }

            i-- ;
        }

        return partial ;
    }

    /**
     * @init `partials` attribute
     */
    get isolatePartial() {

        if( !this.partials ) {

            this.partials = [] ;
        } else {

            return this.partials ;
        }

        this.classIndex.forEach( ( item,key ) => {

            const index = item.index ;

            let startSlice = this.classIndex[ key - 1 ] ;

            if( !key ) {

                startSlice = 0 ;
            } else {

                startSlice += ClassAnnotation.detectorClass.length + 1 ;
            }

            const partial = this.contentFile
                .slice( startSlice , index )
                .split('\n')
                .filter( line => (
                    !!line.length
                ) )
            ;

            this.partials.push( {
                lines: partial ,
                isLastLine: partial[ partial.length - 1 ].indexOf('*/') !== -1 ,
                classname: item.classname
            } ) ;

        } ) ;

        return this.partials ;
    }

    normalizeClassname( lineClassname ) {

        lineClassname = lineClassname.split('\n')[0].replace('class ','').replace('{','').trim() ;

        let backClassname = "" ;

        let i = 0 ;

        let isValidChar = "azertyuiopqsdfghjklmwxcvbn_0123456789" ;

        while(
            isValidChar.includes( lineClassname.charAt( i ).toLocaleLowerCase() ) &&
            i < lineClassname.length
        ) {

            backClassname += lineClassname.charAt( i++ ) ;
        }

        return backClassname.trim() ;
    }

    /**
     * @init `countClass` attribute
     * @init `classIndex` attribute
     * @return {Number} `countClass`
     */
    get countClassDefine() {

        if( this.isAlreadyCount ) {

            return this.countClass ;
        }

        this.isAlreadyCount = true ;
        this.countClass = 0 ;
        this.classIndex = [] ;
        const searcher = 'class' ;

        while ( this.contentFile.indexOf( searcher ) !== -1 ) {

            this.classIndex.push( {
                index: this.contentFile.indexOf( searcher ) ,
                classname: this.normalizeClassname(
                    this.contentFile.slice( this.contentFile.indexOf( searcher ) ,  )
                )
            } ) ;

            this.contentFile = this.contentFile.replace( searcher , ClassAnnotation.detectorClass ) ;

            this.countClass++ ;
        }

        return this.countClass ;
    }

} ;

module.exports = function( __DIR__ ) {

    ClassAnnotation.__DIR__ = __DIR__ ;

    if(
        typeof __DIR__ !== 'string' ||
        !pathResolver.isAbsolute( __DIR__ )
    ) {

        throw RangeError('ClassAnnotation should be an absolute path') ;
    }

    return ClassAnnotation ;
} ;