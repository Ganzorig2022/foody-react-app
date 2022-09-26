npm i react-router-dom
npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
npm install @mui/material @emotion/react @emotion/styled
npm i react-toastify
npm i chart.js react-chartjs-2
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
"build": "react-scripts build", 
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
    "deploy": "npm run build && firebase deploy",

=================================================================
=======================FIREBASE CLOUD FUNCTIONS===================================
npm install firebase-functions@latest firebase-admin@latest --save
npm install -g firebase-tools (check if installed => firebase tools --version)

firebase init

(_) Firestore: Configure security rules and indexes files for Firestore
(_) Functions: Configure a Cloud Functions directory and its files

> JavaScript coнгоно.
> Бусдыг нь ENTER, ENTER...

https://www.oracle.com/java/technologies/downloads/#jdk18-windows

firebase emulators:start

==================================================FIX JAVA PROBLEM FOR WINDOWS===============================================================
Click start and type in Environment Variables and click it when it pops up. You can also open the command line by pressing WIN + R and paste in this rundll32.exe sysdm.cpl,EditEnvironmentVariables.

Once the Environment variables window pops up, click on path and click on edit.

Check to see if the Java directory is there, if not, click on New and find the Java\jdk-<version>\bin folder and add it. Ok out of all the menu.

Restart powershell and run 'java -version' again.

=================================================================
View Emulator UI at http://localhost:4000


================================================================
import * as React from 'react';
import { Routes, Route, useParams } from 'react-router-dom';

function ProfilePage() {
  // Get the userId param from the URL.
  let { userId } = useParams();
  // ...
}

function App() {
  return (
    <Routes>
      <Route path="users">
        <Route path=":userId" element={<ProfilePage />} />
        <Route path="me" element={...} />
      </Route>
    </Routes>
  );
}


=================================================================
//===============GITHUB ACTIONS==============================
New workflow
Simple workflow search hiine.
Configure dr darna. 
Start commit dr darna.
Commit new file dr darna.