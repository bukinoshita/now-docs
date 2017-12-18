## Usage

### Architecture

Inside of your project create a `docs` folder.

```
project
├── docs
│   ├── 01-getting-started.md
│   ├── 02-installation.md
│   └── 03-examples.md
└── src
    ├── index.js
    └── etc...
```

### Naming

We recommend naming your files as `01-name.md`, `02-name.md`, `03-name.md`. Each
file should contain a `title (h2)`. We also recommend naming the title of the
section with the same name used on file name.

So if you have a `about.md` the title of this file should be `About`.

```
## About

Docs content goes here
```

### Customizing

To customize your `now-docs`, create a `.now-docs.json` at the root of your
project and if you already have a `package.json` file inside your project, you
can define all of the following properties inside the `nowDocs` property within
it instead:

#### name (string)

The prefix for all new deployment instances. The CLI usually generates this
field automatically based on your `package.json` name + `docs`. But if you'd
like to define it explicitly, this is the way to go.

```
"name": "my-docs"
```

### Deploying

After writing all the documentation, run:

```
$ now-docs
```
