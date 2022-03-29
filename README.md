# Jason's CLP Game

This is a Typescript React [Vite](https://vitejs.dev/) app using Firebase for the backend. It is a demonstration of how to show real-time updates on a dashboard UI when a user somewhere else clicks orange and blue buttons to increase their respective values within 5 second after the first click is registered.

The dashboard is deployed at [clp-game.vercel.app](https://clp-game.vercel.app) and the client at [clp-game.vercel.app/client](https://clp-game.vercel.app/client).

The app was written using `eslint` standards, `prettier` for formatting the code, and [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

## Run the project locally

The project dependencies are managed by `yarn`.

1. Clone the project.
2. Install dependencies by simply running `yarn`.
3. Create a new Web Google Firebase project: [https://console.firebase.google.com/](https://console.firebase.google.com/).
4. Create and enable both the `Firestore Database`.
5. Under the Firebase project's settings, scroll down to find the `firebaseConfig` sample JS code with all the API key/config data. Looks like this:

```
const firebaseConfig = {
  apiKey: "xxx",
  authDomain: "xxx",
  projectId: "xxx",
  storageBucket: "xxx",
  messagingSenderId: "xxx",
  appId: "xxx",
  databaseURL: "xxx"
};
```

5. Create a `.env` environment variable file in the top level directory of the cloned project on your computer and copy/paste all the config data into it assigned to variables named as the following:

```
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
VITE_FIREBASE_DATABASE_URL=xxx
```

Then `src/firebaseConfig.ts` should be able to read them when you run the project.

7. Run `yarn dev` to launch the project locally in your web browser. If you get a Firebase error, check the `Rules` tab of the `Firestore Database` to make sure the project has the read/write permissions setup correctly.

## Contributing/setup for local development

1. Go through the steps above for running the project locally.
2. Enable `husky` pre-commit hooks: `npx husky install`

We use the pre-commit hooks to run `eslint` and require conventional commit formats. You can test that `husky` is working by trying to commit code using a message format unacceptable to conventional commits.

## Running the test cases

Run `yarn test` and then press `a` to run all test cases.
