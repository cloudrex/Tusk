## Automata

Get dandy with an easy-to-use workflow automation library + task runner!

**Installation:** `npm install --save @atlas/automata`

## Usage

Automata comes in handy for pretty much any requirement for automation. Below are some examples which are designed help you get started using this library.

Although most examples use pre-defined operations, the real magic to using this library is when you make self-contained operations and implement them, allowing for a dynamic and flexible usage of tasks.

### TypeScript project build script:
```js
const automata = require("@atlas/automata");

const buildDir = "./dist";
const coordinator = new automata.Coordinator();

async function build() {
    const result = await coordinator
        .then(() => automata.FileSystemOperations.forceRemove(buildDir))
        .then(() => automata.ScriptOperations.execute("tsc"))

        .run();

    const state = result.state === automata.CoordinatorState.OK ? "OK" : "FAIL";

    console.log(`Build completed with state '${state}'`);
}

build();
```
