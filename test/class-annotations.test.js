const
    {expect,assert} = require('chai'),

    fs = require('fs') ,
    pathResolver = require('path') ,

    ClassAnnotations = require('./../class-annotations')(
        pathResolver.join(
            __dirname,
            './factory-data/files'
        )
    ) ,

    factoryData = require('./factory-data/class-annotations.json')
;

describe('test `ClassAnnotations`' , () => {

    it.skip('object build should match with format:' , () => {

        factoryData.forEach( attempt => {

            console.log(
                new ClassAnnotations( attempt.entry )
                    .methods
                    .Foo
                    .getWidth('eg')
            );

        } ) ;

    } ) ;

} ) ;
