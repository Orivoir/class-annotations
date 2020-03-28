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

        this.data = {
            excludes: []
        } ;

        this.lines.forEach( line => {

            line = line.replace('*' , '').trim() ;
            this.worker = line ;

            if( this.isArobase ) {

                const keyName = this.keyName ;
                this.data[ keyName ] = {
                    valueBrut: this.rValue
                } ;

                try {

                    this.data[ keyName ].value = eval( this.data[ keyName ].valueBrut ) ;

                } catch( Exception ) {}

                if( this.data[ keyName ].value === undefined ) {

                    try {

                        this.data[ keyName ].value = eval(
                            `( () => ( ${this.data[ keyName ].valueBrut } ) )()`
                        ) ;
                    } catch( Exception ) {}
                }

                if( this.data[ keyName ].value === undefined &&
                    this.data[keyName].valueBrut !== "undefined"
                ) {
                    this.data[ keyName ].value = "NNVE ( not an native value error )";
                }

            } else {

                this.data.excludes.push( this.worker ) ;
            }

        } ) ;

        this.cleanOutput() ;
    }

    cleanOutput() {

        if( !this.data.excludes.length ) {

            delete this.data.excludes ;
        }

        delete this.worker ;
        delete this.lines ;

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
