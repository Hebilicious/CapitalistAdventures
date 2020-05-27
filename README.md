[![Netlify Status](https://api.netlify.com/api/v1/badges/77a6a688-61bf-41d7-b8fe-00acdd5b29e0/deploy-status)](https://app.netlify.com/sites/capitalist-adventures/deploys)

An [Hosted Version](https://capitalist-adventures.netlify.app/) is available here.

# How to use :

(npm can be used instead of yarn)

Install dependencies (Make sure you have node 14+)

```
yarn
```

Start the dev server at localhost:3000

```
yarn dev
```

Build the project

```
yarn build
```

# Project dependencies :

-   vue 3 : Powerful and simple frontend framework. I went with vue instead of react because this challenge was the perfect opportunity to test the newest version, currently in beta.
    https://github.com/vuejs/vue-next

-   vite : web dev build tool that serves native ES Module to the browser directly. Typescript support out of the box, extremely fast and experimental. Support building with rollup for production
    https://github.com/vitejs/vite

-   localforage : Library built by Mozilla around web storage APIs, ideal to play with indexedDB. This is used to implement the offline functionalities. https://github.com/localForage/localForage

_No other dependencies/frameworks were used._

## Current features :

-   Buy businesses
-   Upgrade Items with the capacity mechanic
-   Make Money from a business
-   Hire manager
-   Offline feature
-   Track how many items have been sold
-   Handle multiple item type per business
-   You can easily modify the item/business list, prices and such by tweaking the businessList object (in useBusiness.ts)
-   The offline features work with indexedDB, so you can cheat out your money over there ...

## Potential Future features :

-   UI : Animations, Polish, Assets (music, pictures, icon)
-   Ux: Handle different screen sizes/devices
-   Gameplay : Business Upgrades, Items upgrades, Item Shop, Achievements ...
-   Performances : Queue system with batch write.
-   Server components : Authentication && Save logic
-   Server component : API based - Server side logic for money things, to avoid client side tampering
