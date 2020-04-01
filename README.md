# [class-annotations]( https://www.npmjs.com/package/class-annotations )

## use a reader of annotations for write you models with ES6 new syntax , easy usage.

### auto persist the data type of all the natives type

### can read multiples `class` inner single file

### support value multilines

### can read recursive directories

A comment not starting with an: "@" character not be considered as an annotation, but may be brought up in the data provided via the table: excludes

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

// `__dirname` argument is optional but recommended
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
    items: ['Foo'] ,
    isFile: true,
    isDirectory: false,

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


## Read an directory:

structure directories *e.g*:
- app.js

- models/
    - foo.js
    - foo2.js

    - submodels/
        - foo3.js

app.js
```javascript
const createClassAnnotations = require('class-annotations') ;

const ClassAnnotations = createClassAnnotations( __dirname ) ;

// read `models` directory
const annotations = new ClassAnnotations('./models') ;

console.log( annotations ) ;
```

output log of `annotations` data:
```javascript
{
    pathDirectory: '{{pathDirectory}}'

    models: {
        isDirectory: true,
        isFile: false,
        items: ['foo.js','foo2.js','submodels'] ,

        'foo.js': {
            isDirectory: false,
            isFile: true,
            countClass: 1,
            items: ['Foo'] ,
            success: true,

            Foo: {
                data: {
                    // your annotations datas
                }
            }
        } ,
        'foo2.js': {
            isDirectory: false,
            isFile: true,
            countClass: 1,
            items: ['Foo2'] ,
            success: true,

            Foo2: {
                data: {
                    // your annotations datas
                }
            }
        } ,
        submodels: {

            isDirectory: true,
            isFile: false,
            items: ['foo3.js'] ,

            'foo3.js': {
                isDirectory: false,
                isFile: true,
                countClass: 1,
                items: ['Foo3'] ,
                success: true,

                Foo3: {
                    data: {
                        // your annotations datas
                    }
                }
            }
        }
    }
}

```

#### If you have detect an bug or anormal behavior with `ClassAnnotaions` please remote a issues on [github](https://github.com/Orivoir/class-annotations/issues)
