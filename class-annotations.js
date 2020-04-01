const pathResolver = require('path') ;
const fs = require('fs') ;

const ReaderAnnotations = require('./lib/reader-annotations') ;
const clientDir = require('./lib/client-dir')() ;

class ClassAnnotation {

    // marker of class keywords
    static detectorClass = "<0x01023658956587452455269552224021255888520__CLASS__DETECTOR__01023658956587452455269552224021255888520>" ;

    static __DIR__ = null ;

    constructor( pathFile ) {

        this.pathFile = pathFile ;

        if( fs.existsSync( this.pathFile ) ) {

            this.contentFile = fs.readFileSync(
                this._pathFile , 'utf-8'
            ) ;

            this.run() ;


        } else {
            // here file not exists
            this.success = false;
            this.details = 'ClassAnnotations Error: file not found from: ' + this.pathFile ;
        }

        this.cleanOutput() ;
    }

    run() {

        this.readers = {} ;

        if( this.contentFile.indexOf('/**') !== -1 ) {

            this.countClassDefine ; // getter build: "this.countClass" and "this.classIndex" attributes
            this.isolatePartial ; // getter build: "this.partials" attribute

            this
                .filterPartial()
                .instancesReaders()
            ;
        }

        this.success = true ;
    }

    instancesReaders() {

        this.partials.forEach( partial => {

            this.worker = partial ;

            if( partial.isLastLine && partial.isOpened ) {

                this.readers[ partial.classname ] = this.buildReaderData() ;

            }

        } ) ;

        return this ;
    }

    buildReaderData() {

        const partial = this.worker ;

        return {

            classname: partial.classname ,

            annotations: new ReaderAnnotations(
                partial.lines ,
                partial.classname
            ) ,

            get data() {

                return this.annotations.data ;
            }

        } ;

    }

    filterPartial() {

        this.partials.forEach( partial => {

            if( partial.isLastLine ) {

                partial = this.checkOpenedAnnotation( partial ) ;
            }

        } ) ;

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

        // resolve ext file
        if( pathResolver.basename( pathFile ).split('.').pop() != "js" ) {
            this._pathFile += '.js' ;
        }
    }

    cleanOutput() {

        // persist only final data

        delete this.partials ;
        delete this.isAlreadyCount ;
        delete this.classIndex ;
        delete this.contentFile ;
        delete this.worker ;

        return this ;
    }

    checkOpenedAnnotation( partial ) {

        const lines = partial.lines ;

        let i = ( lines.length - 1 ) ;

        let isFoundOpened = false ;

        while(
            !isFoundOpened &&
            i >= 0
        ) {

            const currentLine = lines[ i ] ;

            if( currentLine.indexOf('/**') != -1 ) {

                isFoundOpened = true ;
                partial.isOpened = true ;
                partial.lines = partial.lines.slice( i ,  ) ;
            }

            i-- ;
        }

        if( !isFoundOpened ) {

            partial.isOpened = false;
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

function createClassAnnotation( __DIR__ ) {

        ClassAnnotation.__DIR__ = typeof __DIR__ === "string" ? __DIR__ : clientDir ;

        if(
            typeof __DIR__ !== 'string' ||
            !pathResolver.isAbsolute( __DIR__ )
        ) {

            throw RangeError('ClassAnnotation should be an absolute path') ;
        }

        return ClassAnnotation ;
}

module.exports = createClassAnnotation ;
