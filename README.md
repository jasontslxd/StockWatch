# StockWatch

An stock market tracker app built with React + Typescript, integrated with Firebase, Alpha Vantage and Finnhub.

## Setting up the dev environment

```sh
npm install -g bun
bun install
```
Then add `.env` file and add `VITE_FINNHUB_API_KEY` from [Finnhub](https://finnhub.io/) 
and `VITE_ALPHAVANTAGE_API_KEY` from [Alpha Vantage](https://www.alphavantage.co/).

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
# First time setup only
bun install -g firebase-tools
firebase login

bun run build
firebase deploy
```

## To run on android
Requres Android Studio + Java 21 to build. Setup an emulator in Android Studio.
No iOS build as I dont have a mac.

```sh
bun run build
bun cap run android
```