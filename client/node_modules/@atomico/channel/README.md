# @atomico/channel

`@atomico/channel` allows sharing states between WebComponents or DOM easily.

![Example](https://i.ibb.co/DfWvg85/Grupo-38.png)

This API is inspired by the objectives of React Context, but eliminates the complexity and is an agnostic implementation.

## What is a channel?

A channel is a sender and a receiver of status through the native event system of the DOM, a channel has the following logic:

1. Listen to the father's broadcasts.
2. Generate broadcast for children.
3. When the channel is connected, it will retrieve the last broadcast of the parent channel.

## Example

This is an example where the webcomponent subscribes to the parent node:

```js
import { Channel } from "@atomico/channel";

const CHANNEL = "MyChannel";
// Parent channel
const parentChannel = new Channel(document.body, CHANNEL);

class MyComponent extends HTMLElement {
  constructor() {
    super();
    // Child channel
    this.channel = new Channel(this, CHANNEL);
  }
  connectedcallback() {
    this.channel.connected((data) => (this.textContent = JSON.stringify(data)));
  }
  disconnectedCallback() {
    this.channel.disconnect();
  }
}

// Connect the channel to the native DOM event system
parentChannel.connect();

parentChannel.cast("I'm your father");
```

## API

### Channel()

```js
const channel = new Channel(
  // Element
  host,
  // string
  "idString",
  // associates the composed option to the event
  // this allows bypassing the shadowDOM when connecting the channels
  true
);
```

### channel.connect()

```js
channel.connect(optionalCallback);
```

Where:

1. `optionalCallback`: optional callback that allows to read the transmissions of the parent.

### channel.disconect()

Remove subscriptions

### channel.cast()

Issues a new broadcast to the child channels

```js
channel.cast(10);
channel.cast({ data });
```

Executing this method prevents any transmission from the parent from spreading to the children of this channel.
