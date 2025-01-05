import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDUQHokKpHSM4IgGOJ_noGHOHQSMpubmZM",
    authDomain: "expense-manager-b6f35.firebaseapp.com",
    databaseURL: "https://expense-manager-b6f35-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "expense-manager-b6f35",
    storageBucket: "expense-manager-b6f35.firebasestorage.app",
    messagingSenderId: "654999969830",
    appId: "1:654999969830:web:3de20e2bd9374e791c46e7",
    measurementId: "G-X4YKXZ2D1H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth