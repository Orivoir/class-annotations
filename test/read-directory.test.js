// THIS FILE IS NOT REAL UNIT TEST THIS IS SANDBOX DEBUG #loldev

const
    pathResolver = require('path') ,
    ClassAnnotations = require('./../class-annotations')(
        pathResolver.join( __dirname , './factory-data/' )
    )
;


const an = new ClassAnnotations('./files/__stuff/class-stuff.js') ;

console.log( an.methods.Foo.getWidth('a') );
