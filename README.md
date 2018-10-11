# gloomhaven-stacks
Tracker for your Gloomhaven Event and Quest cards

Sorry for the extremely horrible look! If you're good at CSS, send a Pull Request :)

[Gloomhaven TTS](https://github.com/saizai/gloomhaven_tts/)
[Assets](https://drive.google.com/drive/folders/1SiXb3u2mJbN-Dg2j3Rb-y5amnRJSXIDc)
[Scans](https://github.com/any2cards/gloomhaven)

# Developer Documentation

* [setup typescript project](https://medium.com/@mateuszsokola/configuring-react-16-jest-enzyme-typescript-7122e1a1e6e8)
* [typescript and react](https://levelup.gitconnected.com/ultimate-react-component-patterns-with-typescript-2-8-82990c516935)
  gives some good examples on how to setup your react components in typescript
* [react typescript cheat sheet](https://github.com/sw-yx/react-typescript-cheatsheet)

## Github pages

Github pages are generated from the `docs/` folder in the `master` branch.
When sending a PR, please don't add the `docs/` folder in the PR to avoid
merge conflicts (when merging multiple PRs). Instead, it needs to be manually
re-built _after_ each merge.

# Opportunities for improvement
## Features
* mark sold items in the shop
* show battle goal images

## Tech
* document component props with `prop-types`
* make it pretty (CSS)
* move components into own files
* [redux](https://redux.js.org/)?
* [jest-enzyme](https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme) for additional enzyme test matchers?

# Done
* Setup webpack build
* Enable absolute imports

