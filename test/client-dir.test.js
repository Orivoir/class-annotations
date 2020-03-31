const
    {expect} = require('chai') ,
    clientDir = require('./../lib/client-dir')
;

describe('test `client-dir` module' , () => {

    const path2tests = [
        {
            path: "C:/abc/def/ijk\\blah" ,
            shouldReturn: null ,
        } , {
            path: "c:\\abc\\def\\ijk\\node_modules\\truc\\blah" ,
            shouldReturn: "c:/abc/def/ijk"
        } , {
            path: "e://abc\\ijk\\blah\\blablah.js" ,
            shouldReturn: null
        } , {

            path: null ,
            shouldReturn: null
        }

    ] ;

    path2tests.forEach( item => {

        const itText = `the path test: "${item.path}" should be resolve with: "${item.shouldReturn}" value` ;

        it( itText , () => {
            expect( clientDir( item.path ) ).to.be.equal( item.shouldReturn ) ;
        } ) ;

    } ) ;

    it('should \\throw RangeError because accept only absolute path' , () => {


        const fxRangeError = () => clientDir('./abc/def') ;

        expect( fxRangeError ).to.be.throw( RangeError , "arg1 should be an absolute path" ) ;

    } ) ;

} ) ;