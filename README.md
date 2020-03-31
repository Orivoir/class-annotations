# [class-annotations]( https://www.npmjs.com/package/class-annotations )

## use a reader of annotations for class write with ES6 syntax , with easy use.

### auto persist the data type of all the natives type

### can read multiples `class` inner single file

- npm install class-annotations --save
- yarn add class-annotations

foo.js
```javascript
/**
 * @Route( { name: "foo" , path: "/foo" , exactPath: true , methods=['GET'] } )
 * @Another = 35
 *
 * should be an excludes values
 *
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

const createClassAnnotations = require('class-annotations') ;

const ClassAnnotations = createClassAnnotations( __dirname ) ;

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
                exludes: ['','should be an excludes values','']
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

- npm install class-annotations --save
- yarn add class-annotations


#### If you have detect an bug or anormal behavior with `ClassAnnotaions` please remote a issues on [github](https://github.com/Orivoir/class-annotations/issues)
