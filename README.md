# [class-annotations]( https://www.npmjs.com/package/class-annotations )

## use a reader of annotations for class write with ES6 syntax , with easy use.

- npm install class-annotations --save
- yarn add class-annotations

foo.js
```javascript

/**
 * @Route( { name: "foo" , path: "/foo" , exactPath: true , methods=['GET'] } )
 * @Another = 35
 * @Another2: "hello"
 */
class Foo {

    constructor() {

        // ...
        // ...
    }

    // ...

} ;
```

app.js
```javascript

// give a static directory in argument 1 or give absolute path to instantiate
const ClassAnnotation = require('class-annotations')( __dirname ) ;

const annotations = new ClassAnnotations('./foo.js') ;

console.log( annotations ) ;
```

output log of `annotations`:
```javascript
{
    classCount: 1 ,
    readers: {

        Foo: {
            data: {
                Route: {
                    name: { valueBrut: "foo", value: "foo" } ,
                    path: { valueBrut: "/foo" , value: "/foo" } ,
                    exactPath: { valueBrut: "true" , value: true } ,
                    methods: { valueBrut: "['GET']" , value: [ 'GET' ] }
                } ,
                Another: {
                    valueBrut: "35" ,
                    value: 35
                } ,
                Another2: {
                    valueBrut: "hello" ,
                    value: "hello"
                }
            } ,
            classname: "Foo"
        }
    }
}
```

### `ClassAnnotation` can persist the data type of all the natives type

- npm install class-annotations --save
- yarn add class-annotations
