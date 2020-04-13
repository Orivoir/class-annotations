// const fs = require('fs') ;
// const pathResolver = require('path') ;


const
    pathResolver = require('path') ,
    ClassAnnotations = require('./../class-annotations')(
        pathResolver.join( __dirname , './factory-data/' )
    )
;


const an = new ClassAnnotations('./files/') ;

console.log( an.files.__stuff );
