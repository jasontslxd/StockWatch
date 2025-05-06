# StockWatch

An app built with React + Typescript.

## Setting up the dev environment

```sh
npm install -g bun
bun install
```

## To start dev server

```sh
bun dev
```

## To commit

```sh
bun commit
```

## To deploy

```sh
# First time setup
bun install -g firebase-tools
firebase login

bun run build
firebase deploy
```

## To run on android
Requres Android Studio + Java 21 to build. Setup an emulator in Android Studio.

```sh
bun cap run android
```