# [class-annotations]( https://www.npmjs.com/package/class-annotations )

> use a reader of annotations for write you models with ES6 new syntax , easy usage.

- [installation](#installation)

- [usage](#usage)

- [static directory](#static-directory)

- [auto persist the data type](#auto-persist-the-data-type)

- [flex syntax](#support-value-multilines)

- [read recursive folders](#read-recursive-folders)

- [read methods annotations](#read-methods-annotations)

- [filter methods annotations](#filter-methods-annotations)

### Note: A comment not starting with an: "@" character not be considered as an annotation, but may be brought up in the data provided via the table: excludes.


## installation

- npm install class-annotations@0.9.3-beta --save
- yarn add class-annotations@0.9.3-beta

warning use in production is not recommanded while version **beta**.

## usage

**index.js**
```javascript
const ClassAnnotations = require('class-annotations')( __dirname ) ;

const annotations = new ClassAnnotations( './src/Foo.js' ) ;

console.log( annotations ) ;
```

**./src/Foo.js**
```javascript

/**
 * @Controller = "Foo"
 */
class Foo {

    /**
     * @TODO: think write unit test ^.^
     */

    /**
     * @Route({
     *      name: "index",
     *      path: "/bar",
     *      methods: ["GET","POST"]
     * })
     */
    bar() {

        // ...
    }

} ;
```

## static directory

**class-annotations** return a function the arguments 1 should be **static directory**, the root directory for your next read file.s.

```javascript
const createClassAnnotations = require('class-annotations') ;

const staticDirectory = __dirname ;

const ClassAnnotations = createClassAnnotations(
    /* your static directory in arg1 */
    staticDirectory
) ;
```

The **static directory** should be a **absolute path**.

## auto persist the data type

**class-annotations** auto convert the data type of your annotations value,
but you can remote real value as: `valueBrut`.

Foo.js
```javascript

/**
 * @Controller = "Foo"
 */
class Foo {

    /**
     * @TODO: think write unit test ^.^
     */

    /**
     * @shouldBeArray = ["hello", "wold", 42]
     *
     * @shouldBeNumber = 42.24
     *
     * @shouldBeString = "hello world"
     *
     * @ShouldBeParseError = hello world !
     */
    bar() {

        // ...
    }

} ;
```

```javascript
ClassAnnotations {

    items: ['Foo'],

    countClass: 1,

    Foo: {

        classname: 'Foo',

        data: {
            Controller: {
                valueBrut: '"Foo"', value: 'Foo'
            }
        }
    } ,

    methods: {

        Foo: [
            {
                classname: 'Foo',
                method: 'bar',
                data: {
                    shouldBeArray: {
                        valueBrut: '["hello", "wold", 42]',
                        value: ["hello", "wold", 42],
                    }
                    shouldBeNumber: {
                        valueBrut: '42.24',
                        value: '42.24'
                    }
                    shouldBeString: {
                        valueBrut: '"hello world"',
                        value: "hello world"
                    }
                    ShouldBeParseError: {
                        valueBrut: "hello world !",
                        value: "Parse Error to line: 7 after opened annotations of class: Foo, error: hello wo..."
                    }
                }
            }
        ]
    }
}
```

## support-value-multilines

**class-annotations** can read an annotations extends multiline with this format syntax:

Foo.js
```javascript

/**
 * @Controller = "Foo"
 */
class Foo {

    /**
     * @Route( {
     *      name: "stuff",
     *      path: "/stuff",
     *      method: ['GET','POST']
     * } )
     */
    bar() {

        // ...
    }

} ;
```

## read recursive folders

**class-annotations** can read a structure folders a filters files not: **.js**

Admitting this structure:
```
/project-name
    - index.js

    / src
        - Foo.js
        - Bar.js
        - README.md

        / stuff
            - Foo.js
            - Bar.js
```

from: **index.js**
```javascript
const createClassAnnotations = require('class-annotations') ;

const ClassAnnotations = createClassAnnotations( __dirname ) ;

const annotations = new ClassAnnotations('./src/') ;
```

annotations:
```javascript
ClassAnnotations {

    src: ReadDirecory {

        items: ['Foo.js','Bar.js','README.md','stuff'] ,

        'Foo.js': ClassAnnotations {
            // final file class annotations
            // ...
        } ,

        'Bar.js': ClassAnnotations {
            // final file class annotations
            // ...
        } ,

        stuff: ReadDirectory {

            items: ['Foo.js','Bar.js'] ,

            'Foo.js': ClassAnnotations {
                // final file class annotations
                // ...
            } ,

            'Bar.js': ClassAnnotations {
                // final file class annotations
                // ...
            } ,
        }
    }
}
```


# read methods annotations

**class-annotations** read annotations inside body class and associate
annotations to a **specific method class**.

But you should follow rules associating annotations to a method, for exploit this feature, this rules enable you of write a simply comment in the body class and not considerate as annotation.

A **annotations** associate to a **method** should be not contains empty line
before header method.

```javascript
class Foo {

    /**
     * @Test = 35
     */
    bar() {


    }

} ;
```
inside of exemple above the *commentary*:

```javascript
/**
 * @Test = 35
 */
```

is considerate as associate to `index` method.


but below `bar` method do not contains annotation
```javascript
class Foo {

    /**
     * @Test = 35
     */


    bar() {


    }

} ;
```


# filter methods annotations

after have read a **file** or **structure folders**
you can have needs use **filter** for **annotation** from method by name.


**Stuff.js**
```javascript
class Foo {

    /**
     * @a = 1
     * @b = 2
     * @c = 3
     * @d = 4
     */
    index() {


    }
} ;

class Bar {

    /**
     * @a = 4
     * @b = 3
     * @c = 2
     * @d = 1
     */
    index() {

    }
}
```

annotations output:
```javascript
ClassAnnotations {

    countClass: 2,

    methods: {

        Foo: [
            {
                classname: "Foo",
                method: "index",
                data: {
                    a: {
                        valueBrut: '1',
                        value: 1
                    } ,
                    b: {
                        valueBrut: '2',
                        value: 2
                    } ,
                    c: {
                        valueBrut: '3',
                        value: 3
                    } ,
                    d: {
                        valueBrut: '4',
                        value: 4
                    }
                }
            } ,
            getWidth: [Function]
        ] ,

        Bar: [
            {
                classname: "Bar",
                method: 'index',
                data: {
                    a: {
                        valueBrut: '4',
                        value: 4
                    } ,
                    b: {
                        valueBrut: '3',
                        value: 3
                    } ,
                    c: {
                        valueBrut: '2',
                        value: 2
                    } ,
                    d: {
                        valueBrut: '1',
                        value: 1
                    }
                }
            },
            getWidth: [Function]
        ]
    }
}
```

the function `getWidth` can filter annotation array and contains currently
an type because should be `getWith` as `( matcher ) => object[]`

`matcher` arg1 should be an string or a instanceof `RegExp`.

#### If you have detect an bug or anormal behavior with `ClassAnnotaions` please remote a issues on [github](https://github.com/Orivoir/class-annotations/issues)
