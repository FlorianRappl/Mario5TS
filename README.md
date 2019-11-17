# Mario5 TS

This repository contains the code for the TypeScript version of the Mario5 demo application.

## Requirements

For compiling the code you will need the following applications:

* Node.js (tested with v10) for running gulp
* NPM (tested with v6) for installation

The rest will be installed upon local installation.

# Installation

First you should clone the repository. Then in the directory of the repository run

```sh
npm install
```

If you want to run the game just type in

```sh
npm start
```

Otherwise if you want to build it for deployment, run

```sh
npm run build
```

## Releases

### Current

(branch: `master`)

* Refined use of modern module system
* Use Parcel for bundling
* Generate repetitive code
* Use SASS for the style

### Fusebox

(tag: `fuse`)

* Use modern module system
* Apply FuseBox for bundling
* Standard CSS for the style
* Removed jQuery (completely DOM standard rendering)

### Legacy

(tag: `legacy`)

* The original JavaScript code is available in `src/Original`.
* The description below hints, where features of TypeScript have been placed.
* An article describing the original code is available on [CodeProject](http://www.codeproject.com/Articles/396959/Mario).
* The system is built by using `gulp`.

The legacy branch README also contains some more background information.
