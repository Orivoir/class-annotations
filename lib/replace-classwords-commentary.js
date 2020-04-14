const markerHit = "MARKER_REMOVE_BEFORE_COMPILING" ;

const replaceInner = subcontent => {

    while( subcontent.indexOf( 'class ' ) !== -1 ) {

        subcontent = subcontent.replace('class', markerHit ) ;
    }

    return subcontent ;
} ;

module.exports = function( classcontent ) {

    if( typeof classcontent !== "string" ) {

        throw new RangeError("arg1: contentclass should be a `string` value") ;
    }

    if(
        !classcontent.length ||
        classcontent.indexOf('class') === -1
    ) {

        return classcontent;
    }

    classcontent = classcontent.split('\n') ;

    let isInsideCommentary = false;

    classcontent = classcontent.map( (line,numberLine) => {

        if( isInsideCommentary ) {

            // search close commentary

            line = replaceInner( line ) ;

            if( line.indexOf('*/') !== -1 ) {
                isInsideCommentary = false ;
            }

        } else {

            if(
                line.indexOf('/*') !== -1 &&
                line.indexOf('*/') !== -1
            ) {
                // have open and close on line: line

                const beforeIndex = line.indexOf('/*') ;
                const afterIndex = line.indexOf('*/') ;

                const contentCommentaryLine = line.slice( beforeIndex, afterIndex+2 ) ;

                const contentReplaceCommentaryLine = replaceInner( contentCommentaryLine ) ;

                line = line.replace( contentCommentaryLine, contentReplaceCommentaryLine ) ;
                return line;
            }

            // check error close commentary
            else if( line.indexOf('*/') !== -1 ) {

                // have found close comment
                // but not inside commentary
                throw "have found close comment but not inside commentary, resolve annotation have fail" ;
            }

            // can be inside string value:
            // `const foo = "/*" ; not a commentary :'(`
            if(
                line.indexOf('/*') != -1
            ) {

                line = replaceInner( line ) ;

                if(
                    /^\/\*(\*|\!)?$/.test(line.trim()) ||
                    line.trim().slice( -2 ) === "/*"
                ) {

                    isInsideCommentary = true;
                }
            }

            if( line.indexOf('//') !== -1 ) {

                line = replaceInner( line ) ;
                return line;
            }
        }

        return line ;

    } ) ;

    return classcontent.join('\n') ;
} ;
