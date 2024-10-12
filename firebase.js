import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, getReactNativePersistence, initializeAuth } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBa2xbuvQGcLwsOwPmq5Lv6nAW55R-Xqfk",
  authDomain: "vbtracker-53891.firebaseapp.com",
  databaseURL: "https://vbtracker-53891-default-rtdb.firebaseio.com",
  projectId: "vbtracker-53891",
};

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}
const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { db, auth };
