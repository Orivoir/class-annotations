class ReaderAnnotations {

    static validSeparators = [
        '=' ,
        ':' ,
        '=>' ,
        '=:' ,
        '('
    ] ;

    constructor( lines ) {

        this.lines = lines.slice( 1 , -1 ) ;

        this.worker = null ;

        this.currentMultiline = "" ;
        this.isMultiLine = false ;

        this.data = {
            excludes: []
        } ;

        this.lines.forEach( (line,lineNumber) => {

            line = line.replace('*' , '').trim() ;
            this.worker = line ;

            if( this.isArobase || this.isMultiLine ) {

                if( this.isMultiLine ) {

                    let v = this.worker ;
                    const isEndLine =  v[ v.length - 1 ] === ")" ;

                    if( isEndLine ) {

                        this.isMultiLine = false;
                        v = v.slice( 0 , -1 ) ;
                    }

                    this.currentMultiline += v ;

                    if( isEndLine ) {

                        this.data[ this.currentMultilineKey ] = {} ;
                        this.data[ this.currentMultilineKey ].valueBrut = this.currentMultiline.trim() ;

                        const data = this.persistDataType( this.data[ this.currentMultilineKey ].valueBrut , lineNumber ) ;

                        this.data[ this.currentMultilineKey ].value = data ;

                        this.currentMultiline = "" ;
                        delete this.currentMultilineKey ;

                    }
                }

                if( this.canMultiLine ) {

                    const rv = this.rValueBrut.trim().slice( 1 , ) ;
                    const isEndLine =  rv[ rv.length - 1 ] === ")" ;

                    this.currentMultilineKey = this.keyName ;

                    if( !isEndLine ) {
                        this.isMultiLine = true;
                        this.currentMultiline = rv ;
                    } else {

                        this.oneLine( lineNumber ) ;
                    }


                } else if( !this.isMultiLine ) {

                    if( this.keyName.trim().length ) {

                        this.oneLine( lineNumber ) ;
                    }
                }


            } else {

                this.data.excludes.push( this.worker ) ;
            }

        } ) ;

        this.cleanOutput() ;
    }

    get canMultiLine() {

        return this.worker.replace( "@"+this.keyName , '' ).trim().charAt(0) === "(" ;
    }

    oneLine( lineNumber ) {

        if( this.keyName.trim().length ) {

            const keyName = this.keyName ;

            this.data[ keyName ] = {
                valueBrut: this.rValue
            } ;

            const data = this.persistDataType(  this.data[ keyName ].valueBrut ,lineNumber ) ;

            this.data[ keyName ].value = data ;
        }
    }

    persistDataType( brutData, lineNumber ) {

        let back = null ;

        try {

            back = eval( '() => (' + brutData + ')')() ;

        } catch( Exception ) {}

        if( back === undefined ) {

            try {

                back = eval(
                    `( () => ( ${ brutData } ) )()`
                ) ;
            } catch( Exception ) {}
        }

        if( back === undefined &&
            brutData !== "undefined"
        ) {
            back = "Parse Error to line: " + (lineNumber+1);
        }

        return back ;

    }

    cleanOutput() {

        if( !this.data.excludes.length ) {

            delete this.data.excludes ;
        }

        delete this.worker ;
        delete this.lines ;
        delete this.isMultiLine ;
        delete this.currentMultiline ;

        return this ;
    }

    removeSeparatorFromRvalue( rValueBrut ) {

        let separator = null ;

        ReaderAnnotations.validSeparators.forEach( sep => (
            rValueBrut.indexOf( sep ) !== -1 ? separator = sep: null
        ) ) ;

        if( !separator ) {

            return rValueBrut;
        }

        if( separator !== '(' ) {

            return rValueBrut.replace(separator , "").trim() ;
        }

        return rValueBrut.trim().slice( 1 , -1 ).trim() ;

    }

    get rValue() {

        const keyName = this.keyName ;

        let start = this.worker.slice( 1,  ) ;

        let rValueWithSeparator = start.replace( keyName , "" ).trim() ;

        return this.removeSeparatorFromRvalue( rValueWithSeparator ) ;
    }

    get rValueBrut() {

        const keyName = this.keyName ;

        let start = this.worker.slice( 1,  ) ;

        let rValueWithSeparator = start.replace( keyName , "" ).trim() ;

        return rValueWithSeparator ;
    }

    get isArobase() {

        return ( this.worker.charAt( 0 ) === "@" ) ;
    }

    get keyName() {

        let start = this.worker.slice( 1 , ) ;

        let i = 0 ;

        let back = "" ;

        let isValidCharName = "azertyuiopqsdfghjklmwxcvbn_0123456789" ;

        while(
            isValidCharName.includes( start.charAt( i ).toLocaleLowerCase() ) &&
            i < ( start.length - 1 )
        ) {

            back += start.charAt( i++ ) ;
        }

        return back ;
    }

} ;

module.exports = ReaderAnnotations ;
