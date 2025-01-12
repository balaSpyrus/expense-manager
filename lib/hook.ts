import auth from "@/auth";
import { GoogleAuthProvider, signInWithPopup, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";


const provider = new GoogleAuthProvider();

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true)
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            if (!localStorage.getItem("uid")) {
                localStorage.setItem('uid', user?.uid ?? '')
            }
            setLoading(false)
        });
        return () => unsubscribe();
    }, []);

    const login = async () => {
        setLoading(true)
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            return user;
        } catch (error) {
            console.error("Error signing in:", error);
        } finally {
            setLoading(false)
        }
    };

    const logout = () => signOut(auth);

    return { user, isLoading, login, logout };
};

