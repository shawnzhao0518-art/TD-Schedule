import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAyyrP8eLT174psGD9MJpZkK2iZ-_dbpS0",
  authDomain: "td-schedule-c010f.firebaseapp.com",
  databaseURL: "https://td-schedule-c010f-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "td-schedule-c010f",
  storageBucket: "td-schedule-c010f.firebasestorage.app",
  messagingSenderId: "747320547273",
  appId: "1:747320547273:web:15a251e4fbb45dd0557a18"
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

const auth = getAuth();
signInAnonymously(auth).then(()=>console.log("✅ 已匿名登录 Firebase")).catch(e=>console.error("登录失败",e));
