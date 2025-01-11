import auth from "@/auth";
import { GoogleAuthProvider, signInWithPopup, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";


export const useUserDetails = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        auth.onAuthStateChanged((user) => {
            setUser(user);
            if (!localStorage.getItem("uid")) {
                localStorage.setItem('uid', user?.uid ?? '')
            }
            setLoading(false)
        });
    }, []);

    return { user, isLoading }

}


const provider = new GoogleAuthProvider();

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser);
        return () => unsubscribe();
    }, []);

    const login = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            return user;
        } catch (error) {
            console.error("Error signing in:", error);
        }
    };

    const logout = () => signOut(auth);

    return { user, login, logout };
};

