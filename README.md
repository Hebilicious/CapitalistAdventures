[![Netlify Status](https://api.netlify.com/api/v1/badges/77a6a688-61bf-41d7-b8fe-00acdd5b29e0/deploy-status)](https://app.netlify.com/sites/capitalist-adventures/deploys)

https://capitalist-adventures.netlify.app/

How to use :
(npm can be used instead of yarn)

Install dependencies (Make sure you have node 14+)
yarn

Start the dev server at localhost:3000
yarn dev

Build the project
yarn build

Project dependencies :

vue 3 : Powerful and simple frontend framework. I went with vue instead of react because this challenge was the perfect opportunity to test the newest version, currently in beta.
https://github.com/vuejs/vue-next
w
vite : web dev build tool that serves native ES Module to the browser directly. Typescript support out of the box, extremely fast and experimental. Support building with rollup for production
https://github.com/vitejs/vite
localforage : Library built around web storage APIs, ideal to play with indexedDB

No other dependencies/frameworks were used.

Todo :

-   Css 1h
-   "Offline" functionality (seamless save and restore gamestate) 2h
-   Pipeline (Netlify + GitLab/GitHub) 1h ok
-   Clean-up code 30min

Future features :

-   UI : Animations, Polish, Assets
-   Gameplay : Business Upgrades, Items upgrades, Item Shop, Achievements
-   Server components : Authentication && Save logic
-   Server component : Server side logic (prevent cheating)
