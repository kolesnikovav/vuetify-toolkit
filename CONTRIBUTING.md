# Contributing Guide

All contributing are welcome: star this project, let others know about it, report issues, submit pull requests!
If you are interest to improve and help this project, please read the following guidelines.

## Development

This project contains components, writen in same style as native vuetify.js components. Here uses @vue/cli as environment.

### Development Setup

You will need [Node.js](http://nodejs.org) **version 8.9+** along [Yarn](https://yarnpkg.com/) or [NPM](https://docs.npmjs.com/getting-started/installing-node).

After cloning this repo:

``` bash
$ cd vuetify-toolkit
$ yarn # or: npm install
```
All dependencies will be installed automaticly

### Scripts

All scripts is the same as ordinary vue project built with @vue/cli
``` bash
# Start dev server with a demo app. This app has source code vuetify-toolkit and looks like demo page. All changes will be applied directly by (Hot Module Reload) on the webpack dev server.
$ yarn serve
# Start unit tests.
$ yarn test:unit
# Lint and autofix linting errors.
$ yarn lint
# Build lib
$ yarn lib
# Build lib and prepare dist folder for publishing
$ yarn publish
```

### Progect folders
- **`src`**: contains the source code.

  - **`components`**: JS and TS files for components
  - **`utils`**: JS and TS files for commonly used functions and members.
  - **`plugins`**: Contains vuetify.ts file, according to [Vuetify.js & documentation](https://vuetifyjs.com/en/getting-started/quick-start)
  - **`views`**: VUE files that uses components and display in demo page.