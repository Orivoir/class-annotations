# [class-annotations]( https://www.npmjs.com/package/class-annotations )

## use a reader of annotations for write you models with ES6 new syntax , easy usage.

### auto persist the data type of all the natives type

### can read multiples `class` inner single file

### support value multilines

A comment not starting with an: "@" character not be considered as an annotation, but may be brought up in the data provided via the table: excludes

- npm install class-annotations --save
- yarn add class-annotations

### for next exemples  the physical path of file have been replace with: `{{pathFile}}`

foo.js
```javascript
/**
 * @Route( { name: "foo" , path: "/foo" , exactPath: true , methods=['GET'] } )
 * @Another = 35
 *
 * should be an excludes values
 *
 * @Another2: "hello"
 *
 * @Another3( {
 *  foo: "bar" ,
 *  foo2: "bar2" ,
 * } )
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
    pathFile: '{{pathFile}}',
    classCount: 1 ,
    success: true,

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
                } ,
                Another3: {
                    valueBrut: '{ foo: "bar" ,foo2: "bar2" ,}' ,
                    value: { foo: "bar" ,foo2: "bar2" }
                }
            } ,
            classname: "Foo"
        }
    }
}
```

# you can check `success` property before use data

if success is `false` you can get `details` property *e.g*:

app.js
```javascript

const createClassAnnotations = require('class-annotations') ;

const ClassAnnotations = createClassAnnotations( __dirname ) ;

const annotations = new ClassAnnotations('./not-exists.js') ;

console.log( annotations ) ;
```

output log of `annotations` data:
```javascript
{
    pathFile: '{{pathFile}}',
    success: false,
    details: 'ClassAnnotations Error: file not found from: {{pathFile}}'
}
```

- npm install class-annotations --save
- yarn add class-annotations

#### If you have detect an bug or anormal behavior with `ClassAnnotaions` please remote a issues on [github](https://github.com/Orivoir/class-annotations/issues)
