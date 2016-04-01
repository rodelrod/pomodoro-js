Pomodoro-JS
===========

Electron version of [Pomodairo](https://github.com/trunglv/pomodairo).

The original app is better in just about everything.


Motivation
----------

The original Pomodairo app was developed in Adobe Air, which seems to be abandoned and unsupported. I have grown tired of going through the motions of installing it on Ubuntu. 

It was also an opportunity to learn a bit about Electron and try to clear up the confuse Javascript tooling landscape in my head. I went through many of the tools and libraries out there trying to figure out a minimal build system that works. NPM, Webpack, Watchman and old Make seem to fit the bill. In the process, I've eliminated Bower, Browserify, Grunt and Gulp, for several reasons. I've also had a cursory look at a myriad of other libraries and tools that just didn't seem that useful.

Install
-------

Install the dependencies:

    make install


Build for the browser (static version with an entry under public/index.html):

    make html


Build for electron (desktop app built under electron-build/):

    make electron


Currently it builds for 64-bit Linux. Change the electron-package options in the Makefile to build for other architectures.
