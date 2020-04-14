const
    {expect,assert} = require('chai'),
    replaceClasswordsCommentary = require('./../lib/replace-classwords-commentary') ,
    fs = require('fs') ,
    pathResovler = require('path')
;

describe('test `replace-classwords-commentary` module, should remove keywords class from js content file if inside commentary before start compil annotation', () => {

    it('should be a function' , () => {

        assert.isFunction( replaceClasswordsCommentary ) ;

    } ) ;

    describe('should accept only `string` value arg1' , () => {

        let fxAttempt = null ;

        // array attempt arg1
        [
            {
                arg1: "",
                isThrow: false,
            } ,
            {
                arg1: null,
                isThrow: true,
            } ,
            {
                arg1: [],
                isThrow: true,
            } ,
            {
                arg1: "  //",
                isThrow: false,
            } ,
            {
                arg1: {},
                isThrow: true,
            } ,
            {
                arg1: ["  //"],
                isThrow: true,
            } ,
        ].forEach( attempt => {

            const messageIt = `should be ${!attempt.isThrow ? "not":""} throw RangeError` ;

            it( messageIt , () => {

                fxAttempt = () => replaceClasswordsCommentary( attempt.arg1 ) ;

                if( attempt.isThrow ) {

                    expect( fxAttempt ).to.be.throw( RangeError ) ;

                } else {

                    expect( fxAttempt ).to.be.not.throw( RangeError ) ;

                }


            } ) ;
        } ) ;

    } ) ;

    const factoryData = require('./factory-data/files/replace-keywords/data.json') ;

    factoryData.forEach( data => {

        const classcontent = fs.readFileSync(
            pathResovler.join(
                __dirname,
                '/factory-data/files/replace-keywords/',
                data.entry
            ) ,
            "utf-8"
        ) ;

        const output = fs.readFileSync(
            pathResovler.join(
                __dirname,
                '/factory-data/files/replace-keywords/',
                data.output
            ) ,
            "utf-8"
        ) ;

        // console.log( output );

        // assert.isTrue(
        //     replaceClasswordsCommentary( classcontent ) === output
        // ) ;

    } ) ;

    describe('should be replace' , () => {

        it('`// abc class abc`' , () => {

            assert.isTrue(
                replaceClasswordsCommentary('// abc class abc') === "// abc MARKER_REMOVE_BEFORE_COMPILING abc"
            ) ;
        } ) ;

    } ) ;

} ) ;

