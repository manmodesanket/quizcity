import * as FIREBASE_CONSTANTS from "./constants/firebase";

const firebaseConfig = {
  apiKey: FIREBASE_CONSTANTS.FIREBASE_API_KEY,
  authDomain: FIREBASE_CONSTANTS.FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_CONSTANTS.FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_CONSTANTS.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_CONSTANTS.FIREBASE_MESSAGING_ID,
  appId: FIREBASE_CONSTANTS.FIREBASE_API_ID,
};

declare global {
  interface Window {
    firebase: any;
  }
}

window.firebase = window.firebase || {};

let app;

export function initFirebase() {
  app = window.firebase.initializeApp(firebaseConfig);
}

export default app;
