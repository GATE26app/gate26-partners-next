// firebase.js
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDLN1qbVnvyBxf9TBM4QypXO7UTSw-UhhI',
  authDomain: 'gate26-939fc.firebaseapp.com',
  databaseURL: 'https://gate26-939fc-default-rtdb.firebaseio.com',
  projectId: 'gate26-939fc',
  storageBucket: 'gate26-939fc.appspot.com',
  messagingSenderId: '575249285810',
  appId: '1:575249285810:web:4568d313b0574c07a83fab',
  measurementId: 'G-CEBPHDX6Z5',
  // measurementId: process.env.NEXT_PUBLIC_MEASUREMENTID,
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

let messaging: any;
if (typeof window !== 'undefined') {
  messaging = getMessaging(app);
}
// const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// // const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

export const getFcmToken = async () => {
  try {
    if (messaging) {
      const currentToken = await getToken(messaging, {
        vapidKey:
          'BMEpe2a9H3kQ1tm5ezhqVcFt2Caw8QqNQFlsDDO-TO_ANaz6GGVzgVaCwtio-Rcqm94xCJpbbtTsIrVcuvmacFE',
      });
      if (currentToken) {
        console.log('FCM Token:', currentToken);
        return currentToken;
      } else {
        console.warn(
          'No registration token available. Request permission to generate one.',
        );
      }
    }
  } catch (err) {
    console.error('An error occurred while retrieving token. ', err);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    if (messaging) {
      onMessage(messaging, (payload) => {
        resolve(payload);
      });
    }
  });
