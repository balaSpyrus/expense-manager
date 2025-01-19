import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_G_API_KEY,
    authDomain: "expense-manager-b6f35.firebaseapp.com",
    databaseURL: "https://expense-manager-b6f35-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "expense-manager-b6f35",
    storageBucket: "expense-manager-b6f35.firebasestorage.app",
    messagingSenderId: "654999969830",
    appId: "1:654999969830:web:c7ecfb1fa69f4ecf1c46e7",
    measurementId: "G-GRV90XR953"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth