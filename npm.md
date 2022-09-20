npm i react-router-dom
npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
npm install @mui/material @emotion/react @emotion/styled
npm i react-toastify

=====================================================================================

//==============GITHUB DEPLOY==============
//1. npm install gh-pages --save-dev

//2. Package.json dr tohirgoo hiine
{
"name": "snake-react",
"version": "0.1.0",
"private": true,
"homepage": "https://ganzorig2022.github.io/snake-react", (eniig nemne!!!)
"dependencies": {
"react-dom": "^18.2.0",
"react-scripts": "5.0.1",
"web-vitals": "^2.1.4"

},
"scripts": {
"start": "react-scripts start",
"build": "react-scripts build", (eniig nemne!!!)
"predeploy": "npm run build", (eniig nemne!!!)
"test": "react-scripts test",
"eject": "react-scripts eject",
"deploy": "gh-pages -d build" (eniig nemne!!!)
},

//3. npm run deploy
//4. remote dotor settings->pages->
deploy from branch
gh-pages->/root->SAVE hiine.

=================================================================
==================FIREBASE DEPLOY===================

1. npm i firebase
2. npm i firebase-tools
3. firebase login
4. firebase init
5. npm run build
6. firebase deploy
