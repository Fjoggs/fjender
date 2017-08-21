# fjender
Template render engine for Javascript

Takes a html file as input, and returns the rendered template as a continuous string.

## Usage

```js
import { render } from 'fjender'

render('fileName', { mandatory: 'Example mandatory variable' })
```

```html
<html>
    <head>
        <title>{{mandatory}}</title>
    </head>
</html>

```

# Template syntax

Double curly braces indicates that a variable is mandatory: `{{nameOfMandatoryVariable}}`

Curly braces followed by dash indicates that a variable is optional: `{-nameOfOptionalVariable-}`

# Render syntax

When you call render, it takes the html filename as its first argument, and an object containing all the render variables as its second.

## Frameworks used
- Ecmascript 6
- Jest
- Eslint with prettier config
- Babel

# CircleCI build status
[![CircleCI](https://circleci.com/gh/Fjoggs/fjender.svg?style=svg)](https://circleci.com/gh/Fjoggs/fjender)
