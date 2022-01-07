# gumboard-reviews (MVP)

Web page for review a product

**Live DEMO**
MVP: https://gumroad-challenge-b8fe4.web.app
V2(React): https://mysite-v2.web.app/

**Start**

`npm i`
`npm run dev`
You need to use LiveServer or other plugin that will reload index.html on update(by webpack)

**Deploy**
For your own deployment, you have to create a firestore project first and follow the instructions here:
https://firebase.google.com/docs/firestore/quickstart

Run from root folder:
`npm run build`
`firebase login`
`firebase init`
`firebase deploy --only hosting:mvc`

# gumboard-reviews (V2)

React app located in /client folder

**Start**
`cd client`
`npm i`
`npm run start`

**Deploy**
For your own deployment, you have to create a firestore project first and follow the instructions here:
https://firebase.google.com/docs/firestore/quickstart

Run from client folder:
`npm run test`
`npm run build`

Run from root folder:
`firebase login`
`firebase init`
`firebase deploy --only hosting:v2`
