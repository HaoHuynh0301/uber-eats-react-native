# @uppercod/form-tools

Transform forms into objects, example:

## Module

```js
import { formToObject } from "@uppercod/form-tools";
```

## Syntax

```ts
formToObject(defaultData?: Object<string,any> )(target: HTMLFormElement):Object<string,any>
```

## Example

```js
import { formToObject } from "@uppercod/form-tools";

const form = document.createElement("form");

form.innerHTML = /**html */ `
    <input type="hidden" name="hidden" value="-1" />
    <input type="text" name="name" value="1" />
    <input type="checkbox" name="checkbox.1" value="01" />
    <input type="checkbox" name="checkbox.2" value="02" checked />
    <input type="checkbox" name="checkbox.3" />
    <input type="checkbox" name="checkbox.4" checked />
    <input type="radio" name="radio.1" value="001" />
    <input type="radio" name="radio.1" value="002" />
    <input type="radio" name="radio.2" value="001" />
    <input type="radio" name="radio.2" value="002" checked />
    <select name="options">
        <option value="0001"></option>
        <option value="0002" selected></option>
        <option value="0003"></option>
    </select>
    <textarea name="textarea">00001</textarea>
`;

formToObject()(form);
// {
//     checkbox: { 1: null, 2: "02", 3: false, 4: true },
//     hidden: "-1",
//     name: "1",
//     options: "0002",
//     radio: { 1: null, 2: "002" },
//     textarea: "00001",
// }
```

## Expressions

formToObject creates the object based on extracts from the name attribute associated with the field, example:

**Input**:

```html
<input name="user.name" value="UpperCod" />
<input type="checkbox" name="skills[1]" value="js" checkbox />
<input type="checkbox" name="skills[2]" value="css" checkbox />
```

**Output**:

```json
{
    "user": {
        "name": "UpperCod"
    },
    "skills": ["js", "css"]
}
```
