# Review challenge for Gumroad

Page with a list of products where you can read and leave your review

According to a challenge task project have two front-end apps:
**MVP**: with Vanilla JS, stores in a root of the project
**V2(React)**: stores in a /client folder

**Backend**: Firebase

## DEMO

[`MVP`](https://gumroad-challenge-b8fe4.web.app/)
[`V2(React)`](https://mysite-v2.web.app/)

## Installation for MVP

```sh
npm install
npm run dev
```

You need to use LiveServer or other plugins that will reload public/index.html on file update

## Installation for V2(React)

```sh
cd client
npm install
npm run test
npm run start
```

## Deployment

If you want to deploy it with your Firebase:
[`Create firebase project`](https://firebase.google.com/docs/firestore/quickstart)

And place your **firebaseConfig** into _src/db.js_ (MVC) and _client/src/db.js_ (React)

For **MVC**: run from **Root** folder:

```sh
npm run build
firebase login
firebase init
firebase deploy --only hosting:mvc
```

For **V2(React)**: run from **Client** folder:

```sh
npm run test
npm run build
firebase login
firebase init
firebase deploy --only hosting:v2
```

### License

MIT
