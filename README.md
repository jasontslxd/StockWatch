# StockWatch

An stock market tracker app built with React + Typescript, integrated with Firebase, Alpha Vantage and Finnhub.
Tested using node v22.14.0.

## Showcase

Alpha Vantage has a rate limit of 25 requests per day for the free api key, so we have to switch to the demo api after the rate limit is up.
The webapp can be found here https://stockwatch-5077f.web.app/, and you can login with the demo account 12345678, OTP 123456.
If you have a HK number you can also enter your mobile number and verify your OTP that way.

### Web app demo with real endpoints

https://github.com/user-attachments/assets/b6923683-7159-440e-bc4b-e4367fb782a6

### Android demo with demo endpoints

https://github.com/user-attachments/assets/b3e30c57-c227-45b2-a755-40b8de650fb0

## Features and Technologies used

| Category | Technologies/Features |
|----------|----------------------|
| Frontend | React + TypeScript |
| Database | Firebase |
| APIs | Alpha Vantage, Finnhub |
| Authentication | Firebase Authentication (Phone OTP) |
| Platforms | Web, Android (with Capacitor) |
| Build Tools | Bun, Firebase Tools |
| Testing | Vitest (Partial Coverage) |

## Tests implemented so far

Unfortunately I did not have enough time to write tests for all functionalities implemented in 2 weeks, so I have written tests
for a file in each folder in src. I will continue to add tests for other components when I have time in the future.

| Folder | Test |
| ------ | ---- |
| src | App.test.tsx |
| src/pages/Dashboard | Dashboard.test.tsx |
| src/hooks/useTickerGlobalQuote | useTickerGlobalQuote.test.tsx, useTickerGlobalQuote.service.test.ts |
| src/components/TickerNewsSummary | TickerNewsSummary.test.tsx |

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

## To run unit tests

```sh
bun run test 
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
