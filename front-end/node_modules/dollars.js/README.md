![Dollars.js](https://raw.githubusercontent.com/UpperCod/dollars.js/master/brand/dollars.js.svg);

Easily create reactive HTML documents thanks to `$$`, example:

## Global

```html
<script src="https://unpkg.com/dollars.js"></script>
<div>
  <button $on-click="count++">Increment</button>
  <strong $text="count"></strong>
  <button $on-click="count--">Decrement</button>
  <script>
    $$({ count: 0 });
  </script>
</div>
```

[codepen](https://codepen.io/uppchile/pen/eYEOmoR)

## Module

ESM support depends on package.json#exports.

```html
<div id="scope">
  <button $on-click="count++">Increment</button>
  <strong $text="count"></strong>
  <button $on-click="count--">Decrement</button>
  <script>
    import $$ from "http://esm.sh/dollars.js";
    $$(scope, { count: 0 });
  </script>
</div>
```

[codepen](https://codepen.io/uppchile/pen/QWMLoPJ)

## directives

### $on-\<event\>

add a handler to the node

```html
<button $on-click="console.log('click!')">Click!</button>
```

### $text

Print the state in text format inside the node

```html
Static text <span $text="message"></span>
```

### $html

Print the state in html format inside the node

```html
Static html <span $html="message"></span>
```

### $show

define display if the state is false

```html
<button $show="show">Show?</button>
```

### $toggle-\<type\>[-\<optional\>]

define or remove property according to state

```html
<button $toggle-class-hidden="show">Show?</button>
```

### $set-\<type\>

define the property according to the state

```html
<button $set-class="show?'hidden':null">Show?</button>
```

### $each

iterates over an array and defines access to the loop variable to retrieve cursor properties

```html
<ul>
  <template $each="data">
    <li>
      name: <span $text="loop.name"></span><br />
      email: <span $text="loop.email"></span><br />
    </li>
  </template>
</ul>
```
