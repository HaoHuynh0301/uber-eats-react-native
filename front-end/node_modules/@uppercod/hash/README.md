# hash

Generates a hash based on `[anteesor, current, successor]`, this always refers to the same value so it can be used to associate unique.

## install

```
npm install @uppercod/hash
```

## Usage

```js
import hash from "@uppercod/hash";

hash("https://github.com/UpperCod"); // "9a8-a0c-9a4"
hash("abc"); // "c3-126-c5"
```
