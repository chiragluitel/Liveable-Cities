# Development Conventions and Practises
This document will serve as a reference for maintaining consistent and clean code and coding practises throughout this project. This will cover Git practices, TypeScript coding conventions, and React Native coding conventions and project structure.

This document is based on the following sources:
- [Conventional Branch](https://conventional-branch.github.io/)
- [The Naming Convention Guide](https://namingconvention.org/)
- [React Natve Express's Project Structure](https://www.reactnative.express/app/project_structure)
- [Best Practices for Naming Conventions in React Native by Imran Rafeek](https://medium.com/@imranrafeek/best-practices-for-naming-conventions-in-react-native-21f16df6179e)
- [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html)
- [Mozilla JavaScript Code Guidelines](https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Code_style_guide/JavaScript)
- [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react)

This file is subject to changes throughout the project as standards change following group decisions.

# Table of Contents
1. **[Generative AI Usage](#generative-ai-usage)**
2. **[Git Practises](#git-practises)**
    1. **[Branch Naming](#branch-naming)**
    2. **[Commits and Pull Requests](#commits-and-pull-requests)**
3.  **[Code Conventions](#code-conventions)**
    1. **[Project Folder Structure](#project-folder-structure)**
    2. **[Naming Conventions](#naming-conventions)**
    3. **[File Structure](#file-structure)**
    4. **[Syntax Conventions](#syntax-conventions)**
        - **[Basic Rules](#basic-rules-1)**
        - **[Comments](#comments)**
        - **[Variables](#variables)**
        - **[String Literals](#string-literals)**
        - **[Number Literals](#number-literals)**
        - **[Operators](#operators)**
        - **[Function Declarations](#function-declarations)**
        - **[Arrays](#arrays)**
        - **[Loops and Conditionals](#loops-and-conditionals)**
        - **[Objects](#objects)**
        - **[Logging](#logging)**
    5. **[JSX Conventions](#jsx-conventions)**
        - **[Alignment](#alignment)** 
        - **[Quotes](#quotes)**
        - **[Spacing](#spacing)**
        - **[Props](#props)**
        - **[Refs](#refs)**
        - **[Parentheses](#parentheses)**
        - **[Tags](#tags)**
        - **[Methods](#methods)**

# Generative AI Usage
The use if generative AI tools in this project should be strictly limited to research and learning. No AI generated content should be used for any visuals, code, or documentation. AI can be used to understand how to code a feature you are trying to implement, but all code written must be of human origin.

# Git Practises
Never commit directly to the master branch unlessthe change is an initial setup step or very minor and doesnt require its own branch.

## Branch Naming
Git branches should be named in a clear and understandable manner, following the template below:
```
<type>/<description>
```

A list of branch types is as follows:
- ``master``: The primary development branch
- ``feature/``: For new features (e.g., ``feature/notification-settings``)
- ``update/``: For non-bug related updates to existing features (e.g., ``update/settings-format``)
- ``bugfix/``: For bug fixes (e.g., ``bugfix/navigation-bug``)
- ``hotfix/``: For urget fixes (e.g., ``hotfix/route-plan-error``)
- ``release/``: For branches preparing a release (e.g., ``release/v1.2.0``)
- ``chore/``: For non-code tasks like docs updates (e.g., ``chore/update-user-manual``)

### Basic Rules
1. **User Lowercase Alphanumerics, Hyphens, and Dots**: Always use lower case letters (``a-z``), numbers (``0-9``) to name branches, and hyphens (``-``) to seperate words. Avoid special characters, underscores, or spaces. For release branches, dots (``.``) may be used for version numbers in the description (e.g., ``v1.2.0``).
2. **No Consecutive, Leading, or Trailing Hyphens or Dots**: Ensure that hyphens and dots do not appear consecutively (e.g., ``feature/new--login``, ``release/v1.-2.0``), nor at the start or end of the description (e.g., ``feature/-new-login``, ``release/v1.2.0.``).
3. **Keep It Clear and Concise**: The branch name should be descriptive yet concise, clearly indicating the purpose of the work.
4. **Include Ticket Numbers**: If applicable, the branch name should contain the Jira task number after the branch type to allow for easier tracking (e.g., ``feature/PLC-57/add-data``).

## Commits and Pull Requests
### Commit Message Naming
Commits should consist of both a title and a description. The title should be short and descriptive while also being capitalised and not ending with a full stop (e.g., ``Add data to map``). The descrition should follow a similar style, expalining the changes in slightly more detail while remaning short. The description must not be a list of dot points, but proper sentances, unless the list of changes is significant and unable to be split into multiple commits.

### Pull Request Naming
Pull requests should also consist of both a title and description. The title must consist of the Jira task number (if applicable) and a short description of the changes made in the pull request, as well as not ending in a full stop (e.g., ``PLC-29: Create map page``). The pull request descriptions should be relatively short and can contain dot point lists if needed.

### Pull Request Reviewing
When creating a pull request, always ensure you have reviewd it yourself before publishing it. Once you have published it, make sure to assign someone else to be a reviewer (for this project, [Dylan](https://github.com/Rhyslan) will be the primary reviewer). <ins>**Never**</ins> merge your own branch, always request someone else to do it so all changes have been approved by at least 1 other team member.

# Code Conventions
Since this project will be primarily using React Native, TypeScript will be the main programming language. Conventions for other languages will be added when needed.
## Project Folder Structure
### React Native Project
The React Native project folder structure of this project will be as follows:
```
MyApp
├── api
│   ├── twitter.js
│   ├── facebook.js
│   └── instagram.js
├── assets
│   ├── app-icon.png
│   └── splash-screen.png
├── hooks
│   ├── useInterval.js
│   └── useLogin.js
├── theme
│   ├── colors.js
│   ├── textStyles.js
│   └── spacing.js
├── utils
│   ├── generateUuid.js
│   └── formatCurrency.js
├── components
│   ├── buttons
│   │   ├── RoundButton.js
│   │   └── SquareButton.js
│   ├── cards
│   │   ├── ArticleCard.js
│   │   ├── ImageCard.js
│   │   └── VideoCard.js
│   ├── Avatar.js
│   └── List.js
├── screens
│   ├── Feed.js
│   ├── Search.js
│   ├── Post.js
│   ├── Reply.js
│   ├── Profile.js
│   └── Settings.js
├── navigation
│   ├── RootStackNavigator.js
│   └── ProfileTabNavigator.js
└── App.js
```
> File names shows are examples. <br>
> Only project development files and folders are shown

If a file doesn't fit into any of these folder categories, it should be discussed with the team if the file should be placed in an existing folder or if a new category folder should be created.

## Naming Conventions
### Files and Folders
| Style | Category |
| --- | --- |
| ``lowerCamelCase`` or ``kebab-case``| Folders |
| ``lowerCamelCase`` | General files |
| ``UpperCamelCase`` | Component files |

### Code
| Style | Category |
| --- | --- |
| ``UpperCamelCase`` | class / interface / type / enum / decorator / type parameters / component functions in TSX /JSX Element type parameter |
| ``lowerCamelCase`` | variable / parameter / function / method / property / module alias / object |
| ``CONSTANT_CASE`` | global constant variables, including enum values |

No special characters should be used, only upper or lowercase alphanumeric characters should be used. Underscores or hyphens can be used in naming, when allowed. Do not use any form of Hungarian Notation to identify the type of a variable in its name. Do not use an underscore (``_``) as either a prefix of suffix for any purpose. 

## File Structure
Files should follow the this structure:
1. Header comment
    - Copyright information
    - Brief description
2. Imports, if present
3. Main implementation

## Syntax Conventions
### Basic Rules
- One statement per line
- Only one declaration per line
- Statements must be terminated with a semicolon (``;``)
- The column limit is 80 characters. Lines longer than this that can be line-wrapped should do so cleanly. Wrapped lines must be indented by 4 spaces
- Standard indentations should be 2 spaces
- Do not horizontally align code or inline comments
- Only inlcude one React Native component per file

### Comments
- Comments should always be useful and not repeat what the code says.

    Good example:
    ```typescript
    let total = 0;

    // Calculate the sum of the four first elements of arr
    for (let i = 0; i < 4; i++) {
      total += arr[i];
    }
    ```

    Bad example:
    ```typescript
    let total = 0;

    // For loop from 1 to 4
    for (let i = 0; i < 4; i++) {
      // Add value to the total
      total += arr[i];
    }
    ```
- Comments are also not needed if a function name clearly states its purpose, such as the following function:
    ```typescript
    closeConnection();
    ```

### Variables
#### Variable Naming
- Try to keep variable names between 3 and 10 characters long, abbreviating words when possible and relavent (e.g., ``accelerometer `` to ``acclmtr``).
- Do not use Hungarian notation. Instead find a more descriptive variable name.
- Avoid using articles and possessives. For example, use ``car`` instead of ``myCar`` or ``aCar``.
- Use variable names as shown here:
  ```typescript
  const playerScore = 0;
  const speed = distance / time;
  ```
  Don't name variables like this:
  ```typescript
  const thisIsaveryLONGVariableThatRecordsPlayerscore345654 = 0;
  const s = d / t;
  ```

#### Variable Declarations
- When declaring vairables and constants, use the ``let`` and ``const`` keywords, not ``var``.
- If a variable will not be reassigned, prefer ``const``, like so:
  ```typescript
  const name = "Shilpa";
  console.log(name);
  ```
- If you'll change the value of a variable, use ``let`` as shown below:
  ```typescript
  let age = 40;
  age++;
  console.log("Happy birthday!");
  ```
- Declare one variable per line, like so:
  ```typescript
  let var1;
  let var2;
  let var3 = "Apapou";
  let var4 = var3;
  ```
  Do not declare multiple variables in one line, separating them with commas or using chain declaration. Avoid declaring variables like this:
  ```typescript
  let var1, var2;
  let var3 = var4 = "Apapou"; // var4 is implicitly created as a global variable; fails in strict mode
  ```
- Avoid implicit type coercions. In particular, avoid +val to force a value to a number and "" + val to force it to a string. Use Number() and String(), without new, instead. Write:
  ```typescript
  class Person {
    #name;
    #birthYear;

    constructor(name, year) {
      this.#name = String(name);
      this.#birthYear = Number(year);
    }
  }
  ```
  Don't write:
  ```typescript
  class Person {
    #name;
    #birthYear;

    constructor(name, year) {
      this.#name = "" + name;
      this.#birthYear = +year;
    }
  }
  ```

### String Literals
- Use single quotes, not double quotes
- No line continuations. Dont write:
  ```typescript
  const LONG_STRING = 'This is a very very very very very very very long string. \
    It inadvertently contains long stretches of spaces due to how the \
    continued lines are indented.';
  ```
  Write:
  ```typescript
  const LONG_STRING = 'This is a very very very very very very long string. ' +
    'It does not contain long stretches of spaces because it uses ' +
    'concatenated strings.';
  const SINGLE_STRING =
    'http://it.is.also/acceptable_to_use_a_single_long_string_when_breaking_would_hinder_search_discoverability';
  ```
- Use template literals (delimited with a backtick (`` ` ``)) over complex string concatenation, especially if multiple string literals are involved.  
  Example:
  ```typescript
  function arithmetic(a: number, b: number) {
  return `Here is a table of arithmetic operations:
  ${a} + ${b} = ${a + b}
  ${a} - ${b} = ${a - b}
  ${a} * ${b} = ${a * b}
  ${a} / ${b} = ${a / b}`;
  }
  ```

### Number Literals
- Numbers may be specified in decimal, hex, octal, or binary. Use exactly ``0x``, ``0o``, and ``0b`` prefixes, with lowercase letters, for hex, octal, and binary, respectively. Never include a leading zero unless it is immediately followed by ``x``, ``o``, or ``b``.

### Operators
- When you want to store to a variable a literal value depending on a condition, use a conditional (ternary) operator instead of an if...else statement. This rule also applies when returning a value. 

  Write:
  ```typescript
  const x = condition ? 1 : 2;
  ```
  Don't write:
  ```typescript
  let x;
  if (condition) {
    x = 1;
  } else {
    x = 2;
  }
  ```
- Prefer the strict equality (triple equals) and inequality operators over the loose equality (double equals) and inequality operators.

  Use the strict equality and inequality operators like this:
  ```typescript
  name === "Shilpa";
  age !== 25;
  ```
  Don't use the loose equality and inequality operators, as shown below, unless needed:
  ```typescript
  name == "Shilpa";
  age != 25;
  ```

  An exepction is when comparing the literal ``null`` value
- Prefer shortcuts for boolean tests. For example, use ``if (x)`` and ``if (!x)``, not ``if (x === true)`` and ``if (x === false)``, unless different kinds of truthy or falsy values are handled differently.


### Function Declarations
- When possible, use the function declaration over the function expression to define functions.

    Here is the recommended way to declare a function:
    ```typescript
    function sum(a, b) {
      return a + b;
    }
    ```
    This is not a good way to define a function:
    ```typescript
    let sum = function (a, b) {
      return a + b;
    };
    ```
- When using anonymous functions as a callback and do not need to access ``this``, use an arrow function.

    Here is the recommended way:
    ```typescript
    const array = [1, 2, 3, 4];
    const sum = array.reduce((a, b) => a + b);
    ```
    Instead of this:
    ```typescript
    const array = [1, 2, 3, 4];
    const sum = array.reduce(function (a, b) {
      return a + b;
    });
    ```
- When using arrow functions, use implicit return (also known as expression body) when possible:
    ```typescript
    arr.map((e) => e.id);
    ```
    And not:
    ```typescript
    arr.map((e) => {
      return e.id;
    });
    ```

### Arrays
#### Array Creation
- Use literals, not constructors.

  Like this:
  ```typescript
  const visitedCities = [];
  ```
  No like this:
  ```typescript
  const visitedCities = new Array(length);
  ```
#### Item Addition
- Use push, not direct assignment:
  ```typescript
  pets.push("cat");
  ```
  Not:
  ```typescript
  pets[pets.length] = "cat";
  ```

### Loops and conditionals
- When itterating through all elements of a collection, avoid using the clasical ``for (;;)`` loop; prefer either  a ``for...of`` loop or ``forEach()``. Be sure to check that either of those loops are available for non-array collections.

    Example of ``for...of``:
    ```typescript
    const dogs = ["Rex", "Lassie"];
    for (const dog of dogs) {
      console.log(dog);
    }
    ```

    Example of ``forEach()``:
    ```typescript
    const dogs = ["Rex", "Lassie"];
    dogs.forEach((dog) => {
      console.log(dog);
    });
    ```
- Make sure that you define the initializer properly by using the ``const`` keyword for ``for...of`` or ``let`` for the other loops. Don't omit it. 
  
  These are correct examples:
    ```typescript
    const cats = ["Athena", "Luna"];
    for (const cat of cats) {
      console.log(cat);
    }

    for (let i = 0; i < 4; i++) {
      result += arr[i];
    }
    ```

- When you need to access both the value and the index, you can use ``.forEach()`` instead of ``for (;;)``. 

  Write:
    ```typescript
    const gerbils = ["Zoé", "Chloé"];
    gerbils.forEach((gerbil, i) => {
    console.log(`Gerbil #${i}: ${gerbil}`);
    });
    ```
    Do not write:
    ```typescript
    const gerbils = ["Zoé", "Chloé"];
    for (let i = 0; i < gerbils.length; i++) {
      console.log(`Gerbil #${i}: ${gerbils[i]}`);
    }
    ```
- Only use ``for...in`` loops for dict-style objects, not arrays

#### Control Statements
- If an ``if`` statement ends with a ``return``, do not add an ``else`` statement. 

  Write the continuing code after the ``if`` statement:
  ```typescript
  if (test) {
    // Perform something if test is true
    // …
    return;
  }

  // Perform something if test is false
  // …
  ```

  Do not write:
  ```typescript
  if (test) {
    // Perform something if test is true
    // …
    return;
  } else {
    // Perform something if test is false
    // …
  }
  ```
- All control statements like ``if``, ``for``, and ``while`` should use braces even if they only contain a single statement:
  ```typescript
  for (const car of storedCars) {
    car.paint("red");
  }
  ```
  Not:
  ```typescript
  for (const car of storedCars) car.paint("red");
  ```

#### Switch Statements
- For ``switch`` statements, don't add a ``break`` statement after a ``return`` statement:
  ```typescript
  switch (species) {
    case "chicken":
      return farm.shed;
    case "horse":
      return corral.entry;
    default:
      return "";
  }
  ```
  If you add a ``break`` statement, it will be unreachable. 
  
  Do not write:
  ```typescript
  switch (species) {
  case "chicken":
    return farm.shed;
    break;
  case "horse":
    return corral.entry;
    break;
  default:
    return "";
  }
  ```
- Always use ``default`` as the last case for a ``switch`` statement and don't end it with a ``break`` statement. If you do, explain it with a comment.
- Remember to use braces if you need to declare a variable in a ``switch`` case to define the scope:
  ```typescript
  switch (fruits) {
    case "Orange": {
      const slice = fruit.slice();
      eat(slice);
      break;
    }
    case "Apple": {
      const core = fruit.extractCore();
      recycle(core);
      break;
    }
  }
  ```

#### Error Handling
- Use ``try...catch`` statements when sections of code need custom error handling:
  ```typescript
  try {
    console.log(getResult());
  } catch (e) {
    console.error(e);
  }
  ```
- When you don't need the parameter for the ``catch`` statement, omit it:
  ```typescript
  try {
    console.log(getResult());
  } catch {
    console.error("An error happened!");
  }
  ```

### Objects
- Create objects with literals when avaiable, not constructors:
  ```typescript
  const object = {};
  ```
  Not:
  ```typescript
  const object = new Object();
  ```
- Don't use private identifiers, use the TypeScript visibility annotation:
  ```typescript
  class Clazz {
    private ident = 1;
  }
  ```
  Not:
  ```typescript
  class Clazz {
    #ident = 1;
  }
  ```
- Use ES class syntax for objects, not old-style constructors.

  For example, this is the recommended way:
  ```typescript
  class Person {
    constructor(name, age, pronouns) {
      this.name = name;
      this.age = age;
      this.pronouns = pronouns;
    }

    greeting() {
      console.log(`Hi! I'm ${this.name}`);
    }
  }
  ```
- Use ``extends`` for inheritance:
  ```typescript
  class Teacher extends Person {
    // …
  }
  ```
- To define methods, use the method definition syntax:
  ```typescript
  const obj = {
    foo() {
      // …
    },
    bar() {
      // …
    },
  };
  ```
  Instead of:
  ```typescript
  const obj = {
    foo: function () {
      // …
    },
    bar: function () {
      // …
    },
  };
  ```
- When possible, use the shorthand avoiding the duplication of the property identifier. 

  Write:
  ```typescript
  function createObject(name, age) {
    return { name, age };
  }
  ```
  Don't write:
  ```typescript
  function createObject(name, age) {
    return { name: name, age: age };
  }
  ```

### Logging
Use the appropriate log method:
- When logging a message, use ``console.log()``.
- When logging an error, use ``console.error()``.

## JSX Conventions
- Do not use ``isMounted``
### Alignment
- The following examples show the JSX alignment styles:
  ```JSX
  // bad
  <Foo superLongParam="bar"
      anotherSuperLongParam="baz" />

  // good
  <Foo
    superLongParam="bar"
    anotherSuperLongParam="baz"
  />

  // if props fit in one line then keep it on the same line
  <Foo bar="bar" />

  // children get indented normally
  <Foo
    superLongParam="bar"
    anotherSuperLongParam="baz"
  >
    <Quux />
  </Foo>

  // bad
  {showButton &&
    <Button />
  }

  // bad
  {
    showButton &&
      <Button />
  }

  // good
  {showButton && (
    <Button />
  )}

  // good
  {showButton && <Button />}

  // good
  {someReallyLongConditional
    && anotherLongConditional
    && (
      <Foo
        superLongParam="bar"
        anotherSuperLongParam="baz"
      />
    )
  }

  // good
  {someConditional ? (
    <Foo />
  ) : (
    <Foo
      superLongParam="bar"
      anotherSuperLongParam="baz"
    />
  )}
  ```

### Quotes
- Always use double quotes (``"``) for JSX attributes, but single quotes (``'``) for all other JS or TS
  ```JSX
  // bad
  <Foo bar='bar' />

  // good
  <Foo bar="bar" />

  // bad
  <Foo style={{ left: "20px" }} />

  // good
  <Foo style={{ left: '20px' }} />
  ```

### Spacing
- Always include a single space in your self-closing tag
  ```JSX
  // bad
  <Foo/>

  // very bad
  <Foo                 />

  // bad
  <Foo
  />

  // good
  <Foo />
  ```
- Do not pad JSX curly braces with spaces
  ```JSX
  // bad
  <Foo bar={ baz } />

  // good
  <Foo bar={baz} />
  ```

### Props
- Always use camelCase for prop names, or PascalCase if the prop value is a React component
  ```JSX
  // bad
  <Foo
    UserName="hello"
    phone_number={12345678}
  />

  // good
  <Foo
    userName="hello"
    phoneNumber={12345678}
    Component={SomeComponent}
  />
  ```
- Omit the value of the prop when it is explicitly ``true``
    ```JSX
    // bad
    <Foo
      hidden={true}
    />

    // good
    <Foo
      hidden
    />

    // good
    <Foo hidden />
    ```
- Always include an ``alt`` prop on ``<img>`` tags. If the image is presentational, ``alt`` can be an empty string or the ``<img>`` must have ``role="presentation"``
  ```JSX
  // bad
  <img src="hello.jpg" />

  // good
  <img src="hello.jpg" alt="Me waving hello" />

  // good
  <img src="hello.jpg" alt="" />

  // good
  <img src="hello.jpg" role="presentation" />
  ```
- Do not use words like "image", "photo", or "picture" in ``<img>`` ``alt`` props
  ```JSX
  // bad
  <img src="hello.jpg" alt="Picture of me waving hello" />

  // good
  <img src="hello.jpg" alt="Me waving hello" />
  ```
- Use only valid, non-abstract [ARIA roles](https://www.w3.org/TR/wai-aria/#usage_intro)
  ```JSX
  // bad - not an ARIA role
  <div role="datepicker" />

  // bad - abstract ARIA role
  <div role="range" />

  // good
  <div role="button" />
  ```
- Do not use ``accessKey`` on elements
  ```JSX
  // bad
  <div accessKey="h" />

  // good
  <div />
  ```
- Avoid using an array index as ``key`` prop, prefer a stable ID
  ```JSX
  // bad
  {todos.map((todo, index) =>
    <Todo
      {...todo}
      key={index}
    />
  )}

  // good
  {todos.map(todo => (
    <Todo
      {...todo}
      key={todo.id}
    />
  ))}
  ```
- Always define explicit defaultProps for all non-required props
  ```JSX
  // bad
  function SFC({ foo, bar, children }) {
    return <div>{foo}{bar}{children}</div>;
  }
  SFC.propTypes = {
    foo: PropTypes.number.isRequired,
    bar: PropTypes.string,
    children: PropTypes.node,
  };

  // good
  function SFC({ foo, bar, children }) {
    return <div>{foo}{bar}{children}</div>;
  }
  SFC.propTypes = {
    foo: PropTypes.number.isRequired,
    bar: PropTypes.string,
    children: PropTypes.node,
  };
  SFC.defaultProps = {
    bar: '',
    children: null,
  };
  ```
- Use spread props sparingly.

  Exceptions:
  - HOCs that proxy down props and hoist propTypes
    ```JSX
    function HOC(WrappedComponent) {
      return class Proxy extends React.Component {
        Proxy.propTypes = {
          text: PropTypes.string,
          isLoading: PropTypes.bool
        };

        render() {
          return <WrappedComponent {...this.props} />
        }
      }
    }
    ```
  - Spreading objects with known, explicit props. This can be particularly useful when testing React components with Mocha’s beforeEach construct
    ```JSX
    export default function Foo {
      const props = {
        text: '',
        isPublished: false
      }

      return (<div {...props} />);
    }
    ```
- Filter out unnecessary props when possible
  ```JSX
  // bad
  render() {
    const { irrelevantProp, ...relevantProps } = this.props;
    return <WrappedComponent {...this.props} />
  }

  // good
  render() {
    const { irrelevantProp, ...relevantProps } = this.props;
    return <WrappedComponent {...relevantProps} />
  }
  ```

### Refs
- Always use ref callbacks
  ```JSX
  // bad
  <Foo
    ref="myRef"
  />

  // good
  <Foo
    ref={(ref) => { this.myRef = ref; }}
  />
  ```

### Parentheses
- Wrap JSX tags in parentheses when they span more than one line
  ```JSX
  // bad
  render() {
    return <MyComponent variant="long body" foo="bar">
            <MyChild />
          </MyComponent>;
  }

  // good
  render() {
    return (
      <MyComponent variant="long body" foo="bar">
        <MyChild />
      </MyComponent>
    );
  }

  // good, when single line
  render() {
    const body = <div>hello</div>;
    return <MyComponent>{body}</MyComponent>;
  }
  ```

### Tags
- Always self-close tags that have no children
  ```JSX
  // bad
  <Foo variant="stuff"></Foo>

  // good
  <Foo variant="stuff" />
  ```
- If your component has multiline properties, close its tag on a new line
  ```JSX
  // bad
  <Foo
    bar="bar"
    baz="baz" />

  // good
  <Foo
    bar="bar"
    baz="baz"
  />
  ```

### Methods
- Use arrow functions to close over local variables. It is handy when you need to pass additional data to an event handler. Although, make sure they do not massively hurt performance, in particular when passed to custom components that might be PureComponents, because they will trigger a possibly needless rerender every time.
  ```JSX
  function ItemList(props) {
    return (
      <ul>
        {props.items.map((item, index) => (
          <Item
            key={item.key}
            onClick={(event) => { doSomethingWith(event, item.name, index); }}
          />
        ))}
      </ul>
    );
  }
  ```
- Bind event handlers for the render method in the constructor
  ```JSX
  // bad
  class extends React.Component {
    onClickDiv() {
      // do stuff
    }

    render() {
      return <div onClick={this.onClickDiv.bind(this)} />;
    }
  }

  // very bad
  class extends React.Component {
    onClickDiv = () => {
      // do stuff
    }

    render() {
      return <div onClick={this.onClickDiv} />
    }
  }

  // good
  class extends React.Component {
    constructor(props) {
      super(props);

      this.onClickDiv = this.onClickDiv.bind(this);
    }

    onClickDiv() {
      // do stuff
    }

    render() {
      return <div onClick={this.onClickDiv} />;
    }
  }
  ```
- Do not use underscore prefix for internal methods of a React component
  ```JSX
  // bad
  React.createClass({
    _onClickSubmit() {
      // do stuff
    },

    // other stuff
  });

  // good
  class extends React.Component {
    onClickSubmit() {
      // do stuff
    }

    // other stuff
  }
  ```
- Be sure to return a value in your ``render`` methods
  ```JSX
  // bad
  render() {
    (<div />);
  }

  // good
  render() {
    return (<div />);
  }
  ```