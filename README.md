Mario5 TS
=========

This repository contains the code for the TypeScript version of the Mario5 demo application.

* The original JavaScript code is available in `src/Original`.
* The description below hints, where features of TypeScript have been placed.
* An article describing the original code is available on [CodeProject](http://www.codeproject.com/Articles/396959/Mario).
* The system is built by using `gulp`.

Requirements
------------

For compiling the code you will need the following applications:

* TypeScript (tested with v1.0.3) for compilation
* node.js (tested with v0.10.31) for running gulp
* npm (tested with v1.4.9) for installation

Installation
------------

First you should clone the repository. Then in the directory of the repository run

    npm install

If you do not have `gulp` installed (globally), you should also run

    npm install gulp -g

Otherwise you are good to go. Now we only need to run

    gulp

And everything should compile / copy to a subfolder called `release`.