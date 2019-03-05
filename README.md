### Tusk

Get dandy with an easy-to-use workflow automation library!

### Installation

If you're planning to use the workflow automation library:

```bash
$ npm install --save tusk
```

If you're planning to use the [CLI task runner](https://npmjs.com/package/tusk-cli):

```bash
$ npm install --global tusk-cli
```

### Usage

Tusk comes in handy for pretty much any requirement for automation. Below are some examples which are designed help you get started using this library.

Although most examples use pre-defined operations, the real magic to using this library is when you make self-contained operations and implement them, allowing for a dynamic and flexible usage of tasks.

#### TypeScript project build script

```js
const tusk = require("tusk");

const buildDir = "./dist";
const coordinator = new tusk.Coordinator();

async function build() {
    const result = await coordinator
        .queue(() => tusk.FileOps.forceRemove(buildDir))
        .queue(() => tusk.ScriptOps.execute("tsc"))

        .run();

    console.log("Build completed with state %s", result.state === tusk.RunState.OK ? "OK" : "FAIL");
}

build();
```
